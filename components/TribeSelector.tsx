import React from 'react';
import type { Tribe } from '../types';

interface TribeSelectorProps {
  tribes: Tribe[];
  selectedTribe: Tribe | null;
  onSelectTribe: (tribe: Tribe) => void;
}

const TribeCard: React.FC<{ tribe: Tribe; isSelected: boolean; onSelect: () => void; }> = ({ tribe, isSelected, onSelect }) => (
    <div
        onClick={onSelect}
        className={`relative cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${isSelected ? 'ring-2 ring-orange-800' : 'ring-1 ring-gray-200'}`}
    >
        {isSelected && (
            <div className="absolute top-3 right-3 bg-orange-800 text-white rounded-full h-7 w-7 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>
        )}
        <img src={tribe.dressImage} alt={`${tribe.name} dress`} className="w-full h-64 object-cover" />
        <div className="p-5">
            <h3 className="text-xl font-bold text-gray-900">{tribe.name}</h3>
            <p className="text-sm text-gray-600 mt-2 h-16">{tribe.dressDescription}</p>
            <div className="flex items-center mt-3">
                <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                <p className="text-sm text-gray-500 font-medium">{tribe.region}</p>
            </div>
        </div>
    </div>
);

const TribeSelector: React.FC<TribeSelectorProps> = ({ tribes, selectedTribe, onSelectTribe }) => {
  return (
    <section className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">Choose Your Tribal Style</h2>
        <p className="text-gray-500 mt-3 text-lg">Select from the traditional attires of Madhya Pradesh's indigenous communities</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tribes.map((tribe) => (
          <TribeCard 
            key={tribe.id} 
            tribe={tribe} 
            isSelected={selectedTribe?.id === tribe.id} 
            onSelect={() => onSelectTribe(tribe)} 
          />
        ))}
      </div>
    </section>
  );
};

export default TribeSelector;