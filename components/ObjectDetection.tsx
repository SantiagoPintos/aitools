"use client"

import { useEffect, useRef, useState, FC } from 'react';
import { env, AutoModel, AutoProcessor, RawImage } from '@xenova/transformers';
import { COLOURS } from '@/constants/colours';
import { Control } from '@/components/Control';
import { Loading } from '@/components/Loading';
import { Error } from '@/components/Error';
import './ObjectDetectionStyles.css'

type ModelStatus = 'Loading model' | 'Ready' | 'Error';

env.allowLocalModels = false;
env.backends.onnx.wasm.proxy = true;

const ObjectDetection: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<ModelStatus>('Loading model');
  const [scale, setScale] = useState(0.5);
  //threshold is the minimum confidence score for a bounding box to be displayed
  const [threshold, setThreshold] = useState(0.25);
  const [size, setSize] = useState(128);
  const [fps, setFps] = useState<number>(0);
  const fpsBufferRef = useRef<number[]>([]);
  // Average over 30 frames
  const FPS_BUFFER_SIZE = 30; 
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processorRef = useRef<any>(null);
  const isProcessing = useRef(false);
  const previousTime = useRef<number | undefined>(undefined);

  useEffect(() => {
    const initializeModel = async () => {
      try {
        const model_id = 'Xenova/gelan-c_all';
        modelRef.current = await AutoModel.from_pretrained(model_id);
        processorRef.current = await AutoProcessor.from_pretrained(model_id);
        setStatus('Ready');
      } catch (error) {
        console.error(error);
        setStatus('Error');
      }
    };
    initializeModel();
  }, []);

  const setStreamSize = (width: number, height: number) => {
    if (!videoRef.current || !canvasRef.current) return;
    videoRef.current.width = canvasRef.current.width = Math.round(width);
    videoRef.current.height = canvasRef.current.height = Math.round(height);
  };

  const renderBox = ([xmin, ymin, xmax, ymax, score, id]: number[], [w, h]: number[]) => {
    if (!overlayRef.current || score < threshold) return;

    const color = COLOURS[id % COLOURS.length];
    const box = document.createElement('div');
    box.className = 'bounding-box';
    Object.assign(box.style, {
      borderColor: color,
      left: `${(100 * xmin) / w}%`,
      top: `${(100 * ymin) / h}%`,
      width: `${(100 * (xmax - xmin)) / w}%`,
      height: `${(100 * (ymax - ymin)) / h}%`,
    });

    const label = document.createElement('span');
    label.textContent = `${modelRef.current.config.id2label[id]} (${(100 * score).toFixed(2)}%)`;
    label.className = 'bounding-box-label';
    label.style.backgroundColor = color;
    
    box.appendChild(label);
    overlayRef.current.appendChild(box);
  };

  const updateCanvas = () => {
    if (!canvasRef.current || !videoRef.current || !modelRef.current || !processorRef.current) return;

    const context = canvasRef.current.getContext('2d', { willReadFrequently: true });
    if (!context) return;

    const { width, height } = canvasRef.current;
    context.drawImage(videoRef.current, 0, 0, width, height);

    if (!isProcessing.current) {
      isProcessing.current = true;
      (async () => {
        const pixelData = context.getImageData(0, 0, width, height).data;
        const image = new RawImage(pixelData, width, height, 4);

        const inputs = await processorRef.current(image);
        const { outputs } = await modelRef.current(inputs);

        if (overlayRef.current) overlayRef.current.innerHTML = '';
        const sizes = inputs.reshaped_input_sizes[0].reverse();
        outputs.tolist().forEach((x: number[]) => renderBox(x, sizes));

        if (previousTime.current !== undefined) {
          const currentFps = 1000 / (performance.now() - previousTime.current);
          fpsBufferRef.current.push(currentFps);
          if (fpsBufferRef.current.length > FPS_BUFFER_SIZE) {
            fpsBufferRef.current.shift();
          }
          const averageFps = fpsBufferRef.current.reduce((a, b) => a + b, 0) / fpsBufferRef.current.length;
          setFps(averageFps);
        }
        previousTime.current = performance.now();
        isProcessing.current = false;
      })();
    }
    requestAnimationFrame(updateCanvas);
  };

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startVideoStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const videoTrack = stream.getVideoTracks()[0];
        const { width, height } = videoTrack.getSettings();
        setStreamSize(width! * scale, height! * scale);

        if (containerRef.current) {
          const ar = width! / height!;
          const [cw, ch] = ar > 720 / 405 ? [720, 720 / ar] : [405 * ar, 405];
          containerRef.current.style.width = `${cw}px`;
          containerRef.current.style.height = `${ch}px`;
        }
        requestAnimationFrame(updateCanvas);
      } catch (error) {
        console.error(error);
        setStatus('Error');
      }
    };

    if (status === 'Ready') startVideoStream();

    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        if (videoRef.current) videoRef.current.srcObject = null;
      }
    };
  }, [status, scale]);

  return (
    <div className="h-full flex flex-col items-center justify-center py-4 px-8">
      { status == 'Loading model' 
      ? <Loading /> 
      : status == 'Error'
        ? <Error />
        : <div>
           <h1 className="text-center mb-4">
             In-browser real time object detection using the <a href="https://huggingface.co/Xenova/gelan-c_all" target="_blank" rel="noreferrer" className="text-blue-500">Gelan-C</a> model
           </h1>

           <div
             ref={containerRef}
             className="relative w-[720px] h-[405px] max-w-full max-h-full border-2 border-dashed border-gray-300 rounded-xl overflow-hidden mt-4 flex items-center justify-center bg-cover bg-center"
           >
             <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
             <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
             <div ref={overlayRef} className="absolute inset-0 w-full h-full" />
           </div>

           <div className="flex p-4 gap-4 mt-4">
             <Control
               value={size}
               min={64}
               max={256}
               step={32}
               label="Image size"
               onChange={(v) => {
                 setSize(v);
                 processorRef.current.feature_extractor.size = { shortest_edge: v };
               }}
             />
             <Control
               value={threshold}
               min={0.01}
               max={1}
               step={0.01}
               label="Threshold"
               onChange={setThreshold}
             />
             <Control
               value={scale}
               min={0}
               max={1}
               step={0.01}
               label="Image scale"
               onChange={(v) => {
                 setScale(v);
                 if (videoRef.current?.videoWidth && videoRef.current?.videoHeight) {
                   setStreamSize(videoRef.current.videoWidth * v, videoRef.current.videoHeight * v);
                 }
               }}
             />
           </div>
             
           <label className="text-sm min-h-4 my-2">Average FPS: {fps.toFixed(1)}</label>
          </div>
      }
    </div>
  );
};

export default ObjectDetection;