
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md p-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-teal-700 tracking-tight">
        Paridhan Portrait
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        Celebrate the rich cultural heritage of Madhya Pradesh's tribes.
      </p>
    </header>
  );
};

export default Header;
