import React from 'react';
import fatd from '../../../public/images/2.png';
import graduation from '../../../public/images/5.png';
import simple from '../../../public/images/15.png';
import gemini from '../../../public/images/4.png';

const AlbumBar = () => {
  return (
    <div className="flex flex-col justify-center h-screen  p-6 pl-64">
      <img src={fatd} alt="FatD Album" className="max-w-full mb-4" />
      <img src={graduation} alt="Graduation" className="max-w-full mb-4" />
      <img src={simple} alt="Simple" className="max-w-full mb-4" />
      <img src={gemini} alt="Gemini" className="max-w-full mb-4" />
    </div>
  );
};

export default AlbumBar;
