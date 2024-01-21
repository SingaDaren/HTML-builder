const fs = require('fs');
const path = require('path');
const originalDirPath = path.join(__dirname, 'files');
const copyDirPath = path.join(__dirname, 'files-copy');

fs.rm(copyDirPath, { force: true, recursive: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    fs.mkdir(copyDirPath, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      }
    });

    fs.readdir(
      originalDirPath,
      {
        withFileTypes: true,
      },
      (err, files) => {
        if (err) console.log(err);
        else {
          files.forEach((file) => {
            if (file.isFile()) {
              fs.copyFile(
                path.join(originalDirPath, file.name),
                path.join(copyDirPath, file.name),
                (err) => {
                  if (err) {
                    console.log('Error Found:', err);
                  }
                },
              );
            }
          });
        }
      },
    );
  }
});
