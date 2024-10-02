"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const DynamicImageProcessor = dynamic(
  () => import('../components/ImageProcessor').then(module => module.default), 
  { ssr: false }
);

const Home: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Eliminador de fondo de imágenes</h2>
      <DynamicImageProcessor />
    </div>
  );
};

export default Home;
