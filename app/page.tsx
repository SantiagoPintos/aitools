"use client";
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Landing from '../components/Landing';


const Home: React.FC = () => {
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  return (
    <div>
      <Navbar />
      <Landing />
    </div>
  );
};

export default Home;
