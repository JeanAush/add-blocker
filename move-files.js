const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'build', 'static', 'js');
const destDir = path.join(__dirname, 'public');
const filePattern = /\.js$/;

// Find the built JavaScript file
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    return console.error('Failed to read source directory:', err);
  }

  const jsFile = files.find(file => filePattern.test(file));
  if (!jsFile) {
    return console.error('No JavaScript file found in source directory');
  }

  const sourcePath = path.join(sourceDir, jsFile);
  const destPath = path.join(destDir, 'popup.bundle.js');

  // Move the file
  fs.rename(sourcePath, destPath, err => {
    if (err) {
      return console.error('Failed to move file:', err);
    }
    console.log(`Moved ${sourcePath} to ${destPath}`);
  });
});
