"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Landing from '../components/Landing';

const DynamicImageProcessor = dynamic(
  () => import('../components/ImageProcessor').then(module => module.default), 
  { ssr: false }
);

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Landing />
    </div>
  );
};

export default Home;
