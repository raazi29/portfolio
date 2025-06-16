import React, { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Editor } from '@monaco-editor/react';
import { Copy, Edit, Save, Undo, ChevronDown, ChevronRight, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/util';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

interface CodeFile {
  name: string;
  language: string;
  content: string;
  path?: string;
}

interface CodeBlockProps {
  files: CodeFile[];
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ files, className }) => {
  const { isDark } = useTheme();
  const { toast } = useToast();
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [copiedStates, setCopiedStates] = useState<Record<number, boolean>>({});
  const [isExpanded, setIsExpanded] = useState(true);
  const editorRef = useRef<any>(null);

  const activeFile = files[activeFileIndex];

  const handleCopy = async (content: string, fileIndex: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedStates(prev => ({ ...prev, [fileIndex]: true }));
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [fileIndex]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleEdit = () => {
    setOriginalContent(activeFile.content);
    setEditedContent(activeFile.content);
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real implementation, this would save to the actual file
    activeFile.content = editedContent;
    setIsEditing(false);
    toast({
      title: "Saved!",
      description: `Changes saved to ${activeFile.name}`,
    });
  };

  const handleRevert = () => {
    setEditedContent(originalContent);
    activeFile.content = originalContent;
    setIsEditing(false);
    toast({
      title: "Reverted",
      description: "Changes reverted to original",
    });
  };

  const getLanguageFromFilename = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'jsx',
      'ts': 'typescript',
      'tsx': 'tsx',
      'py': 'python',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'md': 'markdown',
      'yml': 'yaml',
      'yaml': 'yaml',
      'sh': 'bash',
      'sql': 'sql',
      'php': 'php',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'go': 'go',
      'rs': 'rust',
      'rb': 'ruby',
      'swift': 'swift',
      'kt': 'kotlin',
      'dart': 'dart',
    };
    return languageMap[ext || ''] || 'text';
  };

  return (
    <div className={cn(
      "bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden",
      "backdrop-blur-sm shadow-lg",
      className
    )}>
      {/* File Structure Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80">
        <div className="flex items-center justify-between p-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <FileText size={16} />
            <span>Code Files ({files.length})</span>
          </button>
          
          <div className="flex items-center space-x-2">
            {isEditing && (
              <>
                <button
                  onClick={handleSave}
                  className={cn(
                    "relative group flex items-center justify-center px-3 py-1.5 rounded-lg transition-all duration-300",
                    "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800",
                    "shadow-[0_4px_20px_rgba(75,85,99,0.4)] hover:shadow-[0_6px_30px_rgba(75,85,99,0.6)]",
                    "border border-gray-500/50",
                    "text-white text-sm font-medium",
                    "hover:scale-105"
                  )}
                >
                  <Save size={14} className="mr-1.5" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleRevert}
                  className={cn(
                    "relative group flex items-center justify-center px-3 py-1.5 rounded-lg transition-all duration-300",
                    "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800",
                    "shadow-[0_4px_20px_rgba(75,85,99,0.4)] hover:shadow-[0_6px_30px_rgba(75,85,99,0.6)]",
                    "border border-gray-500/50",
                    "text-white text-sm font-medium",
                    "hover:scale-105"
                  )}
                >
                  <Undo size={14} className="mr-1.5" />
                  <span>Revert</span>
                </button>
              </>
            )}
            
            {!isEditing && (
              <>
                <button
                  onClick={handleEdit}
                  className={cn(
                    "relative group flex items-center justify-center px-3 py-1.5 rounded-lg transition-all duration-300",
                    "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800",
                    "shadow-[0_4px_20px_rgba(75,85,99,0.4)] hover:shadow-[0_6px_30px_rgba(75,85,99,0.6)]",
                    "border border-gray-500/50",
                    "text-white text-sm font-medium",
                    "hover:scale-105"
                  )}
                >
                  <Edit size={14} className="mr-1.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleCopy(activeFile.content, activeFileIndex)}
                  className={cn(
                    "relative group flex items-center justify-center px-3 py-1.5 rounded-lg transition-all duration-300",
                    "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800",
                    "shadow-[0_4px_20px_rgba(75,85,99,0.4)] hover:shadow-[0_6px_30px_rgba(75,85,99,0.6)]",
                    "border border-gray-500/50",
                    "text-white text-sm font-medium",
                    "hover:scale-105"
                  )}
                >
                  {copiedStates[activeFileIndex] ? <Check size={14} className="mr-1.5" /> : <Copy size={14} className="mr-1.5" />}
                  <span>{copiedStates[activeFileIndex] ? 'Copied!' : 'Copy'}</span>
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* File Tabs */}
        {isExpanded && files.length > 1 && (
          <div className="flex overflow-x-auto bg-gray-100/80 dark:bg-gray-700/80">
            {files.map((file, index) => (
              <button
                key={index}
                onClick={() => setActiveFileIndex(index)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  index === activeFileIndex
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-white/60 dark:bg-gray-800/60"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-gray-800/40"
                )}
              >
                <span className="flex items-center space-x-2">
                  <FileText size={14} />
                  <span>{file.name}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Code Content */}
      {isExpanded && (
        <div className="relative">
          {/* Language Label */}
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-1 text-xs font-medium bg-gray-200/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-md backdrop-blur-sm">
              {getLanguageFromFilename(activeFile.name)}
            </span>
          </div>

          {/* Code Display */}
          {isEditing ? (
            <div className="h-96">
              <Editor
                height="100%"
                defaultLanguage={getLanguageFromFilename(activeFile.name)}
                value={editedContent}
                onChange={(value) => setEditedContent(value || '')}
                theme={isDark ? 'vs-dark' : 'light'}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true,
                  wordWrap: 'on',
                  renderLineHighlight: 'all',
                  selectOnLineNumbers: true,
                  roundedSelection: false,
                  readOnly: false,
                  cursorStyle: 'line',
                }}
              />
            </div>
          ) : (
            <div className="relative">
              <SyntaxHighlighter
                language={getLanguageFromFilename(activeFile.name)}
                style={isDark ? oneDark : oneLight}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  paddingTop: '2.5rem',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  background: 'transparent',
                }}
                showLineNumbers={true}
                lineNumberStyle={{
                  minWidth: '3em',
                  paddingRight: '1em',
                  textAlign: 'right',
                  userSelect: 'none',
                  opacity: 0.6,
                }}
                wrapLines={true}
                wrapLongLines={true}
              >
                {activeFile.content}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
