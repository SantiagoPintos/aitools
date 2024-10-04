"use client"

import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";


const DynamicImageProcessor = dynamic(
    () => import('@/components/ImageProcessor').then(module => module.default), 
    { ssr: false }
);

export default function Page() {
    return (
        <>
            <Navbar />
            <DynamicImageProcessor/>
        </>
    );
}