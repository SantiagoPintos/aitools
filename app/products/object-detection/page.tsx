import React from "react";
import dynamic from "next/dynamic";

const ObjectDetection = dynamic(() => import("@/components/ObjectDetection"), { ssr: false });

const Home : React.FC = () => {
    return (
        <div>
            <ObjectDetection />
        </div>
    );
}

export default Home;