import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AutoModel, AutoProcessor } from '@xenova/transformers';

interface ModelContextType {
  modelRef: React.MutableRefObject<any>;
  processorRef: React.MutableRefObject<any>;
  isModelLoaded: boolean;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return context;
};

interface ModelProviderProps {
  children: React.ReactNode;
}

export const ModelProvider: React.FC<ModelProviderProps> = ({ children }) => {
  const modelRef = useRef<any>(null);
  const processorRef = useRef<any>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

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

      setIsModelLoaded(true);
    };

    loadModelAndProcessor();
  }, []);

  return (
    <ModelContext.Provider value={{ modelRef, processorRef, isModelLoaded }}>
      {children}
    </ModelContext.Provider>
  );
};