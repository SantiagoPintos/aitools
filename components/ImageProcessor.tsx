"use client";

import React, { useState, useEffect, useRef } from 'react';
import { AutoModel, AutoProcessor, env, RawImage } from '@xenova/transformers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ImageIcon, Loader2, RefreshCw, UploadCloud, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ImageUploader from './ImageUploader';
import { useAppContext } from '@/context/ImageContext';


const ImageProcessor: React.FC = () => {
  const { originalImage, processedImage, setProcessedImage, setOriginalImage } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  
  const modelRef = useRef<any>(null);
  const processorRef = useRef<any>(null);
  
  useEffect(() => {
    init();
    return () => {
      setOriginalImage(null);
      setProcessedImage(null);
      sessionStorage.clear();
    };
  }, []);
  
  const init = async () => {
    await loadModelAndProcessor();
    await checkForStoredImage();
  }
  
  const loadModelAndProcessor = async () => {
    try{
      // WASM settings
      env.allowLocalModels = false;
      // Proxy the WASM backend to prevent the UI from freezing
      env.backends.onnx.wasm.proxy = true;
      // Enable WASM simd and multi-threading to speed up the inference
      env.backends.onnx.wasm.simd = true;
      env.backends.onnx.wasm.numThreads = 4;
  
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
    } catch (error) {
      setShowErrorAlert(true);
      console.error('Error loading model and processor:', error);
    }
  };
  const checkForStoredImage = async () => {
    if (originalImage) {
      removeBackground();
    }
  }
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e2) => setOriginalImage(e2.target?.result as string);
    reader.readAsDataURL(file);
  };

  // Remove background automatically when an image is uploaded
  useEffect(() => {
    if (originalImage) {
      removeBackground();
    }
  }, [originalImage]);

  const removeBackground = async () => {
    try {
      setIsProcessing(true);

      if (!originalImage) {
        throw new Error('No image to process');
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
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false)
    }
  };

  const resetImages = () => {
    setOriginalImage(null)
    setProcessedImage(null)
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    if (processedImage) {
      link.href = processedImage;
    }
    link.download = 'image.png';
    link.click();
    document.removeChild(link);
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
          {showErrorAlert ? (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="mr-2 h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was an error loading the model and processor. Please try again later.
              </AlertDescription>
            </Alert>
          ) :
            <Card className="flex-1">
              <CardContent className="p-6">
                {originalImage ? (
                  <h2 className="text-xl font-semibold mb-4 text-center">Processed image</h2>
                ) : (
                    <div className="flex items-center justify-center mb-4">
                      <ImageIcon className="h-8 w-8 mr-2" />
                      <span className="text-lg font-semibold">Upload an Image</span>
                    </div>
                    )
                }
                <div className="aspect-square w-full overflow-hidden rounded-lg">
                  {processedImage ? (
                    <img
                      src={processedImage}
                      alt="Processed"
                      className="object-contain w-full h-full"
                    />
                  ) : originalImage ? (
                    <img
                      src={originalImage}
                      alt="Original"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <ImageUploader onImageUpload={handleImageUpload} originalImage={originalImage} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          }

        <div className="flex flex-col gap-4 justify-center md:w-64">
          <Button
            onClick={removeBackground}
            disabled={!originalImage || isProcessing}
            className="w-full"
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
            <>
              <Button
                onClick={downloadImage}
                variant="outline"
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Download image
              </Button>
              <Button
                onClick={resetImages}
                variant="outline"
                className="w-full"
              >
                <UploadCloud className="mr-2 h-4 w-4" />
                Load new image
              </Button>
            </>
          )}

          {originalImage && !processedImage && (
            <Button
              onClick={resetImages}
              variant="outline"
              className="w-full"
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              Choose a different image
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageProcessor;