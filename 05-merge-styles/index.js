const fs = require('fs');
const path = require('path');
const stylesDirPath = path.join(__dirname, 'styles');
const output = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);

fs.readdir(
  stylesDirPath,
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.css') {
          const input = fs.createReadStream(
            path.join(stylesDirPath, file.name),
            'utf-8',
          );
          input.pipe(output);
        }
      });
    }
  },
);
