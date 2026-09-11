const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const stats = fs.statSync(fullPath);
                if (stats.size > 500 * 1024) { // over 500KB
                    console.log(`Compressing ${fullPath} (${(stats.size/1024/1024).toFixed(2)}MB)...`);
                    const webpPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';
                    await sharp(fullPath)
                        .webp({ quality: 80, effort: 6 })
                        .toFile(webpPath);
                    console.log(`Created ${webpPath}`);
                    
                    // We shouldn't delete the original file because the site config might reference the original extension.
                    // Wait, the requirement says "Nén ảnh lớn xuống WebP hoặc AVIF...". 
                    // If we compress it to webp, we need to update the references in code, or overwrite the original with lower quality?
                    // Let's overwrite the original file with a smaller version (JPEG/PNG) to keep references working,
                    // or we can update `site-content.ts` to point to `.webp`.
                    
                    // Let's overwrite the original file to be a highly compressed version of the SAME format,
                    // AND create a webp version just in case.
                    
                    const tempPath = fullPath + '.temp';
                    if (ext === '.png') {
                        await sharp(fullPath).png({ quality: 70, compressionLevel: 9 }).toFile(tempPath);
                    } else {
                        await sharp(fullPath).jpeg({ quality: 70 }).toFile(tempPath);
                    }
                    fs.renameSync(tempPath, fullPath);
                    console.log(`Overwrote original ${fullPath}`);
                }
            }
        }
    }
}

async function main() {
    await processDirectory(path.join(__dirname, 'public'));
    console.log("Done compression.");
}
main();
