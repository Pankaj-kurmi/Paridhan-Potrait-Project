
import React from 'react';
import type { Tribe } from '../types';

interface SelectionPreviewProps {
  selectedTribe: Tribe | null;
}

const SelectionPreview: React.FC<SelectionPreviewProps> = ({ selectedTribe }) => {
  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-2xl shadow-xl mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Selected Tribal Attire</h2>
      <div className="mt-4 flex justify-center items-center w-full h-64 bg-gray-50 rounded-lg p-4">
        {selectedTribe ? (
          <div className="text-center">
            <img 
              src={selectedTribe.dressImage} 
              alt={`${selectedTribe.name} dress`} 
              className="max-w-full max-h-[170px] object-contain rounded-lg" 
            />
            <p className="mt-4 font-semibold text-lg text-gray-800">{selectedTribe.name}</p>
          </div>
        ) : (
          <div className="text-center text-gray-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="mt-2">Select a tribal style from above</p>
            <p className="text-xs">Your choice will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionPreview;
