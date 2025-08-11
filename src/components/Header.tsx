import React from 'react';
import { ScanText, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
          <ScanText size={24} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">TextExtractor</h1>
        <Sparkles size={20} className="text-yellow-500" />
      </div>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Extract text from any image using advanced OCR technology. 
        Simply upload an image and get readable text in seconds.
      </p>
    </header>
  );
};