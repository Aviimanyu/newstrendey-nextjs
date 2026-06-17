const fs = require('fs');
const path = require('path');

// We load sharp inside the function to avoid errors if it is still installing
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  // Will load dynamically when running
}

const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'wp-content', 'uploads');

// Helper to recursively get all files in directory
function getFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function optimize() {
  if (!sharp) {
    sharp = require('sharp');
  }

  console.log('Starting image optimization recursively in:', UPLOADS_DIR);
  if (!fs.existsSync(UPLOADS_DIR)) {
    console.log('Uploads directory does not exist.');
    return;
  }

  const allFiles = getFilesRecursively(UPLOADS_DIR);
  const imageFiles = allFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
  });

  console.log(`Found ${imageFiles.length} images to optimize.`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let optimizedCount = 0;
  let skipCount = 0;

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const webpPath = file.substring(0, file.length - ext.length) + '.webp';
    
    const originalSize = fs.statSync(file).size;
    totalOriginalSize += originalSize;

    // Check if webp sibling already exists
    let webpExists = fs.existsSync(webpPath);
    let webpSize = 0;

    if (!webpExists) {
      try {
        await sharp(file)
          .webp({ quality: 80 })
          .toFile(webpPath);
        webpSize = fs.statSync(webpPath).size;
        optimizedCount++;
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
        continue;
      }
    } else {
      webpSize = fs.statSync(webpPath).size;
      skipCount++;
    }
    
    totalOptimizedSize += webpSize;
  }

  const savingsBytes = totalOriginalSize - totalOptimizedSize;
  const savingsPct = totalOriginalSize > 0 ? (savingsBytes / totalOriginalSize * 100).toFixed(1) : 0;
  console.log(`\nOptimization Complete!`);
  console.log(`Optimized ${optimizedCount} new WebP images. Skipped ${skipCount} already optimized images.`);
  console.log(`Original size of images: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized size of images (WebP): ${(totalOptimizedSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total savings: ${(savingsBytes / (1024 * 1024)).toFixed(2)} MB (${savingsPct}% size reduction)`);
}

optimize().catch(err => {
  console.error('Optimization failed:', err);
});
