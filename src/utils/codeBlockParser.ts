
interface CodeFile {
    name: string;
    language: string;
    content: string;
    path?: string;
  }
  
  export const parseCodeBlocks = (content: string): { hasCode: boolean; files: CodeFile[]; textContent: string } => {
    const codeBlockRegex = /```(\w+)?\s*(?:file_path="([^"]+)")?\s*\n([\s\S]*?)```/g;
    const files: CodeFile[] = [];
    let match;
    let textContent = content;
  
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const [fullMatch, language = 'text', filePath, code] = match;
      
      let fileName = 'code';
      if (filePath) {
        fileName = filePath.split('/').pop() || filePath;
      } else if (language) {
        const extensions: Record<string, string> = {
          javascript: 'js',
          typescript: 'ts',
          jsx: 'jsx',
          tsx: 'tsx',
          python: 'py',
          html: 'html',
          css: 'css',
          json: 'json',
          markdown: 'md',
          yaml: 'yml',
          bash: 'sh',
          sql: 'sql',
          php: 'php',
          java: 'java',
          cpp: 'cpp',
          c: 'c',
          go: 'go',
          rust: 'rs',
          ruby: 'rb',
          swift: 'swift',
          kotlin: 'kt',
          dart: 'dart',
        };
        const ext = extensions[language] || 'txt';
        fileName = `code.${ext}`;
      }
  
      files.push({
        name: fileName,
        language: language || 'text',
        content: code.trim(),
        path: filePath,
      });
  
      // Replace the code block with a placeholder in text content
      textContent = textContent.replace(fullMatch, `[CODE_BLOCK_${files.length - 1}]`);
    }
  
    return {
      hasCode: files.length > 0,
      files,
      textContent,
    };
  };
  
  export const renderMessageWithCodeBlocks = (content: string, files: CodeFile[]): { textParts: string[]; codeBlockIndices: number[] } => {
    const parts = content.split(/\[CODE_BLOCK_(\d+)\]/);
    const textParts: string[] = [];
    const codeBlockIndices: number[] = [];
  
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Text part
        if (parts[i].trim()) {
          textParts.push(parts[i]);
        }
      } else {
        // Code block index
        const index = parseInt(parts[i]);
        if (!isNaN(index) && index < files.length) {
          codeBlockIndices.push(index);
          textParts.push(''); // Placeholder for code block
        }
      }
    }
  
    return { textParts, codeBlockIndices };
  };
  
