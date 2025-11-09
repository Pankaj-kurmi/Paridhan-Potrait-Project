
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import TribeSelector from './components/TribeSelector';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import SelectionPreview from './components/SelectionPreview';
import { TRIBES } from './constants';
import type { Tribe } from './types';
import { changeClothes } from './services/geminiService';

const App: React.FC = () => {
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ base64: string; mimeType: string; dataUrl: string; } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (base64: string, mimeType: string) => {
    setUploadedImage({ base64, mimeType, dataUrl: `data:${mimeType};base64,${base64}` });
    setGeneratedImage(null);
    setError(null);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!selectedTribe || !uploadedImage) {
      setError("Please select a tribe and upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const resultBase64 = await changeClothes(uploadedImage.base64, uploadedImage.mimeType, selectedTribe);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedTribe, uploadedImage]);
  
  const isGenerateDisabled = !selectedTribe || !uploadedImage || isLoading;

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="space-y-12">
          <TribeSelector 
            tribes={TRIBES} 
            selectedTribe={selectedTribe}
            onSelectTribe={setSelectedTribe}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              uploadedImage={uploadedImage?.dataUrl ?? null}
            />
            <SelectionPreview selectedTribe={selectedTribe} />
          </div>

          <div className="flex flex-col items-center justify-center -mt-4">
             <button
                onClick={handleGenerateClick}
                disabled={isGenerateDisabled}
                className="w-full max-w-md bg-teal-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isLoading ? 'Generating...' : 'Create My Paridhan Portrait'}
              </button>
              {isGenerateDisabled && !isLoading && (!selectedTribe || !uploadedImage) && (
                  <p className="text-center text-sm text-yellow-700 mt-3">
                      Please select a style and upload your photo to begin.
                  </p>
              )}
          </div>

          <ResultDisplay
            isLoading={isLoading}
            generatedImage={generatedImage}
            error={error}
          />
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Paridhan Portrait. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
