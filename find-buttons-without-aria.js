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

        // Simple regex to find button elements without aria-label
        // This is a basic check and might have false positives/negatives
        const buttonRegex = /<button(?![^>]*aria-label)[^>]*>/g;
        const matches = content.match(buttonRegex);

        if (matches && matches.length > 0) {
            console.log(`\nFile: ${filePath}`);
            console.log(`Found ${matches.length} button(s) that might need aria-label:`);

            // Get line numbers for context
            const lines = content.split('\n');
            matches.forEach(match => {
                const index = content.indexOf(match);
                const lineNumber = content.substring(0, index).split('\n').length;

                // Get some context around the button
                const startLine = Math.max(0, lineNumber - 1);
                const endLine = Math.min(lines.length, lineNumber + 1);

                console.log(`Line ${lineNumber}:`);
                for (let i = startLine; i <= endLine; i++) {
                    console.log(`${i === lineNumber ? '>' : ' '} ${lines[i - 1]}`);
                }
            });
        }
    }
});

console.log('\nFinished checking for buttons without aria-label attributes.');