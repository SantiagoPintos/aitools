"use client";
import React, { useEffect } from 'react';
import Landing from '../components/Landing';


const Home: React.FC = () => {
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  return (
    <div>
      <Landing />
    </div>
  );
};

export default Home;
