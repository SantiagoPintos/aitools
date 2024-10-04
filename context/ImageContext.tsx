"use client";

import { createContext, useContext, ReactNode, Dispatch, SetStateAction, useState } from 'react';

interface AppContextProps {
  originalImage: string | null;
  setOriginalImage: Dispatch<SetStateAction<string | null>>;
  processedImage: string | null;
  setProcessedImage: Dispatch<SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextProps>({
  originalImage: null,
  setOriginalImage: () => {},
  processedImage: null,
  setProcessedImage: () => {},
});

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ originalImage, setOriginalImage, processedImage, setProcessedImage }}>
      {children}
    </AppContext.Provider>
  );
};
