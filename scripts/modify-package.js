const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, '..', 'dist', 'server', 'package.json');

try {
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.scripts.start = 'node main';
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log('Successfully modified package.json');
  } else {
    console.error('Error: package.json not found in dist\\server');
    process.exit(1);
  }
} catch (error) {
  console.error('Error modifying package.json:', error);
  process.exit(1);
}