import React from 'react';

interface ProgressBarProps {
  progress: number;
  status: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-700">Processing Image</h3>
        <span className="text-sm font-medium text-blue-600">{Math.round(progress * 100)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      
      <p className="text-sm text-gray-600 text-center">{status}</p>
    </div>
  );
};