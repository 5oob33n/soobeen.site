import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'images');

const MAX_WIDTH = 1920;  // Maximum width
const MAX_HEIGHT = 1440; // Maximum height
const JPEG_QUALITY = 80; // JPEG quality (0-100)
const PNG_QUALITY = 80;  // PNG quality

async function getAllFiles(dir) {
  const files = [];
  const items = await readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await getAllFiles(fullPath));
    } else {
      const ext = extname(item.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const stats = await stat(filePath);
  const sizeBefore = stats.size;
  
  try {
    let image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize if too large
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      image = image.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    let buffer;
    if (ext === '.png') {
      buffer = await image
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toBuffer();
    } else {
      buffer = await image
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer();
    }
    
    // Only save if smaller
    if (buffer.length < sizeBefore) {
      await sharp(buffer).toFile(filePath);
      const sizeAfter = buffer.length;
      const saved = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
      console.log(`✓ ${filePath.replace(publicDir, '')}: ${(sizeBefore/1024/1024).toFixed(2)}MB → ${(sizeAfter/1024/1024).toFixed(2)}MB (-${saved}%)`);
      return sizeBefore - sizeAfter;
    } else {
      console.log(`- ${filePath.replace(publicDir, '')}: already optimized`);
      return 0;
    }
  } catch (err) {
    console.error(`✗ Error processing ${filePath}:`, err.message);
    return 0;
  }
}

async function main() {
  console.log('🖼️  Finding images...\n');
  const files = await getAllFiles(publicDir);
  console.log(`Found ${files.length} images\n`);
  
  let totalSaved = 0;
  for (const file of files) {
    totalSaved += await compressImage(file);
  }
  
  console.log(`\n✅ Done! Total saved: ${(totalSaved/1024/1024).toFixed(2)}MB`);
}

main().catch(console.error);
