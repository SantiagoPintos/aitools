"use client"

import { AudioManager } from "@/app/products/audio-transcriber/components/AudioManager";
import Transcript from "@/app/products/audio-transcriber/components/Transcript";
import { useTranscriber } from "@/app/products/audio-transcriber/hooks/useTranscriber";

function App() {
    const transcriber = useTranscriber();

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='container flex flex-col justify-center items-center'>
                <AudioManager transcriber={transcriber} />
                <Transcript transcribedData={transcriber.output} />
            </div>
        </div>
    );
}

export default App;
