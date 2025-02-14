import dynamic from "next/dynamic";

function App() {

  const AudioTranscriberLandingPage = dynamic(() => import('@/components/AudioTranscriberLanding'), {ssr: false });
  
  return (
    <AudioTranscriberLandingPage />
  );
}

export default App;
