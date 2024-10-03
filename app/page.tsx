"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';

const DynamicImageProcessor = dynamic(
  () => import('../components/ImageProcessor').then(module => module.default), 
  { ssr: false }
);

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <DynamicImageProcessor />
    </div>
  );
};

export default Home;
