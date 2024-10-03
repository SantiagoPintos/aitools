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
      <h1 className="text-3xl font-bold text-center my-8 ">Image Background Remover</h1>
      <DynamicImageProcessor />
    </div>
  );
};

export default Home;
