import React, { useState } from 'react';
import { Copy, Check, FileText, Download } from 'lucide-react';

interface TextOutputProps {
  extractedText: string;
  onClear: () => void;
}

export const TextOutput: React.FC<TextOutputProps> = ({ extractedText, onClear }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!extractedText) return null;

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Extracted Text</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span className="text-sm font-medium">
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
            
            <button
              onClick={downloadText}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Download size={16} />
              <span className="text-sm font-medium">Download</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
            {extractedText}
          </pre>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {extractedText.length} characters • {extractedText.split('\n').length} lines
          </p>
          
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            Clear Results
          </button>
        </div>
      </div>
    </div>
  );
};