
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/util';

interface ImagePreviewProps {
  images: string[];
  onRemove: (index: number) => void;
}

const ImagePreview = ({ images, onRemove }: ImagePreviewProps) => {
  if (images.length === 0) return null;

  return (
    <div className={cn(
      "p-3 rounded-xl",
      "bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80",
      "border border-gray-200/50 dark:border-gray-700/50",
      "backdrop-blur-sm shadow-lg"
    )}>
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative group rounded-lg overflow-hidden",
              "border border-gray-300/50 dark:border-gray-600/50",
              "shadow-md hover:shadow-lg transition-all duration-200",
              "bg-white/50 dark:bg-black/50"
            )}
          >
            <img
              src={image}
              alt={`Preview ${index + 1}`}
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
            />
            <button
              onClick={() => onRemove(index)}
              className={cn(
                "absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full",
                "bg-red-500 text-white shadow-md",
                "hover:bg-red-600 transition-colors duration-200",
                "flex items-center justify-center text-xs",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              )}
            >
              <X size={10} className="sm:w-3 sm:h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
