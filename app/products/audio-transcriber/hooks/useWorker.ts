"use client"

import { useState, useEffect } from "react";

export interface MessageEventHandler {
    (event: MessageEvent): void;
}

export function useWorker(messageEventHandler: MessageEventHandler) {
    const [worker, setWorker] = useState<Worker | null>(null);

    useEffect(() => {
      // Crear un Worker solo cuando el componente está montado
      const newWorker = createWorker(messageEventHandler);
      setWorker(newWorker); 

      // Limpiar el worker cuando el componente se desmonta
      return () => {
        newWorker.terminate();
      };
    }, []);  

    return worker;
}

function createWorker(messageEventHandler: MessageEventHandler): Worker {
    const worker = new Worker(new URL("../worker.js", import.meta.url), {
        type: "module",
    });
    // Listen for messages from the Web Worker
    worker.addEventListener("message", messageEventHandler);
    return worker;
}
