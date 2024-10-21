"use client"

import { AudioManager } from "@/app/products/audio-transcriber/components/AudioManager";
import Transcript from "@/app/products/audio-transcriber/components/Transcript";
import { useTranscriber } from "@/app/products/audio-transcriber/hooks/useTranscriber";

function App() {
    const transcriber = useTranscriber();

    return (
        <div className='flex flex-col justify-center items-center dark:bg-gray-900'>
          <div className='container max-w-4xl px-4 py-8 space-y-8'>
            <div className='text-center space-y-4 mt-10'>
              <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 pb-5'>
                Audio Transcriber
              </h1>
              <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
                Transcribe your audio with complete privacy. Our tool processes your audio directly on your device,
                ensuring that your data never leaves your browser or gets sent to any external servers.
              </p>
            </div>
            <div className="text-center pt-5">
              <AudioManager transcriber={transcriber} />
              <Transcript transcribedData={transcriber.output} />
            </div>
          </div>
        </div>
    );
}

export default App;
