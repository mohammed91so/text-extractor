import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <AlertCircle size={16} className="text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-red-800">Error</h4>
          <p className="text-sm text-red-600">{message}</p>
        </div>
      </div>
      
      <button
        onClick={onDismiss}
        className="p-1 hover:bg-red-100 rounded-full transition-colors"
      >
        <X size={16} className="text-red-500" />
      </button>
    </div>
  );
};