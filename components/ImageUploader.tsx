import React, { useState, useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  originalImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        fileInputRef.current.files = dataTransfer.files;
        
        const event = {
          target: fileInputRef.current
        } as React.ChangeEvent<HTMLInputElement>;
        
        onImageUpload(event);
      }
    }
  }, [onImageUpload]);

  return (
    <div
      className={`aspect-square w-full overflow-hidden rounded-lg ${
        isDragging ? 'border-2 border-dashed border-blue-500' : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {originalImage ? (
        <img
          src={originalImage}
          alt="Original"
          className="object-contain w-full h-full"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
            id="image-upload"
            ref={fileInputRef}
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-12 w-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              {isDragging ? 'Drop the image here' : 'Upload an image or drag and drop'}
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
