"use client";

import React, { useState, useEffect, useRef } from 'react';
import { AutoModel, AutoProcessor, env, RawImage } from '@xenova/transformers';

const EXAMPLE_URL = 'https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=1024';

env.allowLocalModels = false;
// Proxy the WASM backend to prevent the UI from freezing
env.backends.onnx.wasm.proxy = true;

const ImageProcessor: React.FC = () => {
  const [status, setStatus] = useState<string>('Loading model...');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const modelRef = useRef<any>(null);
  const processorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadModelAndProcessor = async () => {
      modelRef.current = await AutoModel.from_pretrained('briaai/RMBG-1.4', {
        config: { model_type: 'custom' },
      });

      processorRef.current = await AutoProcessor.from_pretrained('briaai/RMBG-1.4', {
        config: {
          do_normalize: true,
          do_pad: false,
          do_rescale: true,
          do_resize: true,
          image_mean: [0.5, 0.5, 0.5],
          feature_extractor_type: "ImageFeatureExtractor",
          image_std: [1, 1, 1],
          resample: 2,
          rescale_factor: 0.00392156862745098,
          size: { width: 1024, height: 1024 },
        }
      });

      setStatus('Ready');
    };

    loadModelAndProcessor();
  }, []);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e2) => predict(e2.target?.result as string);
    reader.readAsDataURL(file);
  };

  const predict = async (url: string) => {
    setImageUrl(url);
    setStatus('Analysing...');

    const image = await RawImage.fromURL(url);

    const ar = image.width / image.height;
    const [cw, ch] = (ar > 720 / 480) ? [720, 720 / ar] : [480 * ar, 480];
    setContainerSize({ width: cw, height: ch });

    const { pixel_values } = await processorRef.current(image);
    const { output } = await modelRef.current({ input: pixel_values });
    const mask = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(image.width, image.height);

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(image.toCanvas(), 0, 0);
      const pixelData = ctx.getImageData(0, 0, image.width, image.height);
      for (let i = 0; i < mask.data.length; ++i) {
        pixelData.data[4 * i + 3] = mask.data[i];
      }
      ctx.putImageData(pixelData, 0, 0);
    }

    setProcessedImageUrl(canvas.toDataURL());
    setStatus('Done!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <p className="text-center mb-4 text-gray-600">{status}</p>
      <div className="flex justify-center mb-4 space-x-4">
        <label className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300">
          Cargar imagen
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>
      {imageUrl && (
        <div className="relative" style={{
          width: `${containerSize.width}px`,
          height: `${containerSize.height}px`,
          maxWidth: '100%',
          margin: '0 auto',
        }}>
          <div
            className="absolute inset-0 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: processedImageUrl ? undefined : `url(${imageUrl})`,
            }}
          >
            {processedImageUrl && (
              <img 
                src={processedImageUrl} 
                alt="Processed" 
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageProcessor;