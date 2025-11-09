
import React from 'react';

interface ResultDisplayProps {
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, error }) => {
  
  const handleDownload = () => {
    if (!generatedImage) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = generatedImage;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Add watermark
      const fontSize = Math.max(16, Math.min(img.width * 0.03, 40));
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('Made with Paridhan Portrait', canvas.width - 15, canvas.height - 15);

      const link = document.createElement('a');
      link.download = 'paridhan-portrait.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
          <p className="mt-4 text-gray-600">Generating your portrait...</p>
          <p className="text-sm text-gray-500">This may take a moment.</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-600">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          <p className="font-semibold">An error occurred</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }
    if (generatedImage) {
      return (
        <div className="flex flex-col items-center">
          <img src={generatedImage} alt="Generated portrait" className="max-w-full max-h-[450px] object-contain rounded-lg shadow-lg" />
          <button
            onClick={handleDownload}
            className="mt-6 flex items-center justify-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
          >
            <DownloadIcon />
            Download Portrait
          </button>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
        </svg>
        <p>Your generated portrait will appear here.</p>
      </div>
    );
  };

  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-2xl shadow-xl mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Your Portrait</h2>
      <div className="mt-4 flex justify-center items-center w-full h-96 min-h-[24rem] bg-gray-50 rounded-lg p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default ResultDisplay;