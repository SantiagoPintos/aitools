import Image from 'next/image'

interface ImageOverlayProps {
  originalSrc: string;
  processedSrc: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function ImageOverlay({ 
    originalSrc, 
    processedSrc, 
    alt,
    width = 300, 
    height = 300, 
    }: ImageOverlayProps) {
    return (
        <div 
            className={`relative mb-6`} 
            style={{ width: `${width}px`, height: `${height}px` }}
        >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={originalSrc}
            alt={`Original ${alt}`}
            height={height}
            width={width}
            priority={true}
            unoptimized={true}
          />
        </div>
        <div 
          className="absolute inset-0 overflow-hidden" 
          style={{ clipPath: 'inset(0 50% 0 0)' }}
        >
          <Image
            src={processedSrc}
            alt={`Processed ${alt}`}
            height={height}
            width={width}
            priority={true}
            unoptimized={true}
          />
        </div>
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white"></div>
      </div>
    )
}