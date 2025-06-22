
import React, { useState, useRef } from 'react';
import { Upload, Image, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DragDropZoneProps {
  onFileDrop: (files: File[]) => void;
  children: React.ReactNode;
}

const DragDropZone = ({ onFileDrop, children }: DragDropZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter - 1 === 0) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileDrop(files);
    }
  };

  return (
    <div
      ref={dragRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative"
    >
      {children}
      
      {isDragOver && (
        <div className={cn(
          "absolute inset-0 z-50 flex items-center justify-center",
          "bg-blue-500/20 backdrop-blur-sm rounded-2xl",
          "border-2 border-dashed border-blue-400 dark:border-blue-300",
          "transition-all duration-200"
        )}>
          <div className="text-center p-6">
            <div className="flex justify-center mb-3">
              <div className={cn(
                "w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center",
                "border border-blue-400/50"
              )}>
                <Upload size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-blue-700 dark:text-blue-300 font-medium">
              Drop files here to upload
            </p>
            <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
              Images and text files supported
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropZone;
