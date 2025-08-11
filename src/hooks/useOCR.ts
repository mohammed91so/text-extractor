import { useState, useCallback } from 'react';
import { createWorker } from 'tesseract.js';

interface OCRProgress {
  progress: number;
  status: string;
}

export const useOCR = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<OCRProgress>({ progress: 0, status: '' });
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const extractText = useCallback(async (imageFile: File) => {
    setIsProcessing(true);
    setProgress({ progress: 0, status: 'Initializing OCR engine...' });
    setError(null);
    setExtractedText('');

    try {
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress({
              progress: m.progress,
              status: `Processing image... ${Math.round(m.progress * 100)}%`
            });
          } else {
            setProgress({
              progress: m.progress || 0,
              status: m.status || 'Processing...'
            });
          }
        }
      });

      const { data: { text } } = await worker.recognize(imageFile);
      
      setExtractedText(text.trim());
      setProgress({ progress: 1, status: 'Text extraction completed!' });
      
      await worker.terminate();
    } catch (err) {
      console.error('OCR Error:', err);
      setError('Failed to extract text from image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setExtractedText('');
    setError(null);
    setProgress({ progress: 0, status: '' });
  }, []);

  return {
    extractText,
    clearResults,
    isProcessing,
    progress,
    extractedText,
    error
  };
};