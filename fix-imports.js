import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

// Find all .tsx files
walkDir('src', function(filePath) {
    if (filePath.endsWith('.tsx')) {
        // Read the file content
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace the import statement
        let newContent = content.replace(/from ['"]@\/lib\/utils['"]/g, 'from \'@/lib/util\'');

        // If content was changed, write it back
        if (newContent !== content) {
            console.log(`Fixing import in: ${filePath}`);
            fs.writeFileSync(filePath, newContent, 'utf8');
        }
    }
});

console.log('All imports fixed!');