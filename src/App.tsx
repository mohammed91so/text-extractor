import React, { useState } from 'react';
import { ScanText } from 'lucide-react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ProgressBar } from './components/ProgressBar';
import { TextOutput } from './components/TextOutput';
import { ErrorMessage } from './components/ErrorMessage';
import { useOCR } from './hooks/useOCR';

function App() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { extractText, clearResults, isProcessing, progress, extractedText, error } = useOCR();

  const handleImageUpload = async (file: File) => {
    setUploadedImage(file);
    await extractText(file);
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    clearResults();
  };

  const handleClearResults = () => {
    clearResults();
  };

  const handleDismissError = () => {
    clearResults();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Header />
        
        <div className="space-y-8">
          <ImageUploader
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
            onClearImage={handleClearImage}
            isProcessing={isProcessing}
          />
          
          {error && (
            <ErrorMessage 
              message={error} 
              onDismiss={handleDismissError}
            />
          )}
          
          {isProcessing && (
            <ProgressBar 
              progress={progress.progress} 
              status={progress.status}
            />
          )}
          
          {extractedText && !isProcessing && (
            <TextOutput 
              extractedText={extractedText}
              onClear={handleClearResults}
            />
          )}
          
          {!uploadedImage && !isProcessing && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ScanText size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Ready to Extract Text
              </h3>
              <p className="text-gray-500">
                Upload an image to get started with text extraction
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;