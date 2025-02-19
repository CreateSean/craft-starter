// src/js/generate-manifest.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex').slice(0, 8);
}

function generateManifest() {
  const publicDir = path.join(__dirname, '../../public/assets');
  const manifest = {};

  // Process JS files
  const jsFiles = fs.readdirSync(path.join(publicDir, 'js'))
    .filter(file => file.endsWith('.js'));

  jsFiles.forEach(file => {
    const filePath = path.join(publicDir, 'js', file);
    const hash = generateHash(filePath);
    manifest[`js/${file}`] = `js/${file}?v=${hash}`;
  });

  // Process CSS files
  const cssFiles = fs.readdirSync(path.join(publicDir, 'css'))
    .filter(file => file.endsWith('.css'));

  cssFiles.forEach(file => {
    const filePath = path.join(publicDir, 'css', file);
    const hash = generateHash(filePath);
    manifest[`css/${file}`] = `css/${file}?v=${hash}`;
  });

  // Write manifest file
  fs.writeFileSync(
    path.join(publicDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}

generateManifest();