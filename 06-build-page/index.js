const fs = require('fs');
const path = require('path');
const assetsDirPath = path.join(__dirname, 'assets');
const componentsDirPath = path.join(__dirname, 'components');
const stylesDirPath = path.join(__dirname, 'styles');
const projectDirPath = path.join(__dirname, 'project-dist');
const copyAssetsDirPath = path.join(projectDirPath, 'assets');
const templatePath = path.join(__dirname, 'template.html');
const outputStylesStream = fs.createWriteStream(
  path.join(projectDirPath, 'style.css'),
);

let htmlContent = '';

fs.mkdir(projectDirPath, { recursive: true }, (err) => {
  if (err) console.error(err);
});

fs.readFile(templatePath, 'utf-8', (err, data) => {
  if (err) console.log(err);
  else {
    htmlContent = data;
    fs.readdir(
      componentsDirPath,
      {
        withFileTypes: true,
      },
      (err, files) => {
        if (err) console.log(err);
        else {
          files.forEach((file) => {
            if (file.isFile() && path.extname(file.name) === '.html') {
              const filePath = path.join(componentsDirPath, file.name);
              fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) console.log(err);
                else {
                  htmlContent = htmlContent.replaceAll(
                    `{{${path.parse(filePath).name}}}`,
                    data,
                  );
                  fs.writeFile(
                    path.join(projectDirPath, 'index.html'),
                    htmlContent,
                    (err) => {
                      if (err) console.log(err);
                    },
                  );
                }
              });
            }
          });
        }
      },
    );
  }
});

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
          const inputStyleStream = fs.createReadStream(
            path.join(stylesDirPath, file.name),
            'utf-8',
          );
          inputStyleStream.pipe(outputStylesStream);
        }
      });
    }
  },
);

fs.rm(copyAssetsDirPath, { force: true, recursive: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    copyDirectory(assetsDirPath, copyAssetsDirPath);
  }
});

const copyDirectory = (copyFromDir, copyToDir) => {
  fs.mkdir(copyToDir, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });

  fs.readdir(
    copyFromDir,
    {
      withFileTypes: true,
    },
    (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          if (file.isFile()) {
            fs.copyFile(
              path.join(copyFromDir, file.name),
              path.join(copyToDir, file.name),
              (err) => {
                if (err) console.log(err);
              },
            );
          } else if (file.isDirectory())
            copyDirectory(
              path.join(copyFromDir, file.name),
              path.join(copyToDir, file.name),
            );
        });
      }
    },
  );
};
