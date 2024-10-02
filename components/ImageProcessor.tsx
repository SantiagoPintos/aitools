"use client";

import React, { useState, useEffect, useRef } from 'react';
import { AutoModel, AutoProcessor, env, RawImage } from '@xenova/transformers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon, Loader2, RefreshCw, Upload, UploadCloud } from 'lucide-react';

const EXAMPLE_URL = 'https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=1024';

env.allowLocalModels = false;
// Proxy the WASM backend to prevent the UI from freezing
env.backends.onnx.wasm.proxy = true;

const ImageProcessor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const modelRef = useRef<any>(null);
  const processorRef = useRef<any>(null);

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
    };

    loadModelAndProcessor();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e2) => setOriginalImage(e2.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeBackground = async () => {
    setIsProcessing(true);

    if (!originalImage) {
      setIsProcessing(false);
      return;
    }
    const image = await RawImage.fromURL(originalImage);

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

    setProcessedImage(canvas.toDataURL());
    setIsProcessing(false)
  };

  const resetImages = () => {
    setOriginalImage(null)
    setProcessedImage(null)
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Image Background Remover</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Original Image</h2>
            {originalImage ? (
              <div className="relative aspect-square">
                <img
                  src={originalImage}
                  alt="Original"
                  className="object-contain w-full h-full"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="h-12 w-12 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Upload an image</span>
                </label>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Processed Image</h2>
            {processedImage ? (
              <div className="relative aspect-square">
                <img
                  src={processedImage}
                  alt="Processed"
                  className="object-contain w-full h-full"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button
          onClick={removeBackground}
          disabled={!originalImage || isProcessing}
          className="w-full sm:w-auto"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              {processedImage ? 'Try Again' : 'Remove Background'}
            </>
          )}
        </Button>

        {processedImage && (
          <Button
            onClick={resetImages}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            Load New Image
          </Button>
        )}

        {originalImage && !processedImage && (
          <Button
            onClick={resetImages}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            Choose Different Image
          </Button>
        )}
      </div>
    </div>
  );
}

export default ImageProcessor;