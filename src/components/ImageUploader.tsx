import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
  onClearImage: () => void;
  isProcessing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  uploadedImage,
  onClearImage,
  isProcessing
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
        createImagePreview(file);
      }
    }
  }, [onImageUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
      createImagePreview(file);
    }
  }, [onImageUpload]);

  const createImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    onClearImage();
    setImagePreview(null);
  };

  React.useEffect(() => {
    if (uploadedImage) {
      createImagePreview(uploadedImage);
    } else {
      setImagePreview(null);
    }
  }, [uploadedImage]);

  return (
    <div className="w-full">
      {!uploadedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            isDragOver
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isProcessing}
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isDragOver ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <Upload size={32} />
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Drop your image here or click to upload
              </p>
              <p className="text-sm text-gray-500">
                Supports PNG, JPG, JPEG, WEBP formats
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Uploaded"
                className="w-full max-h-96 object-contain bg-gray-50"
              />
            )}
            
            <button
              onClick={clearImage}
              disabled={isProcessing}
              className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ImageIcon size={16} />
              <span className="font-medium">{uploadedImage.name}</span>
              <span>({Math.round(uploadedImage.size / 1024)} KB)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};