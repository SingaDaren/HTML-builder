const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(
  dirPath,
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (file.isFile()) {
          const filePath = path.join(dirPath, file.name);
          const name = path.parse(filePath).name;
          const extension = path.extname(filePath).slice(1);
          fs.stat(filePath, (err, stats) => {
            err
              ? console.log(err)
              : console.log(`${name} - ${extension} - ${stats.size / 1000}kb`);
          });
        }
      });
    }
  },
);
