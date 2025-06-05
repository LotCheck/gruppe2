
import React, { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface AccidentSequenceSlideshowProps {
  images: string[];
  onComplete?: () => void;
}

const AccidentSequenceSlideshow = ({ images, onComplete }: AccidentSequenceSlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (isPlaying && hasStarted) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= images.length) {
            setIsPlaying(false);
            setHasCompleted(true);
            onComplete?.();
            return images.length - 1; // Stay on last image
          }
          return nextIndex;
        });
      }, 400); // Changed from 200ms to 400ms (doubled the time)

      return () => clearInterval(interval);
    }
  }, [isPlaying, hasStarted, images.length, onComplete]);

  const handlePlay = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setHasCompleted(false);
    setCurrentImageIndex(0);
  };

  const handleReplay = () => {
    setIsPlaying(true);
    setHasCompleted(false);
    setCurrentImageIndex(0);
  };

  if (!hasStarted) {
    return (
      <div className="relative rounded-lg aspect-video overflow-hidden cursor-pointer group" onClick={handlePlay}>
        {/* Preview Image */}
        <img
          src="/lovable-uploads/a4d0969f-8c78-4ff8-8362-98c23f83c354.png"
          alt="Unfallsequenz Vorschau"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          {/* Modern Play Button */}
          <div className="relative">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-700">
              <Play className="h-7 w-7 text-white ml-1" fill="white" />
            </div>
            {/* Pulse animation ring */}
            <div className="absolute inset-0 w-16 h-16 bg-blue-600 rounded-full animate-ping opacity-30"></div>
          </div>
        </div>
        
        {/* Video Label */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
          Unfallsequenz abspielen
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-md aspect-video overflow-hidden">
      <img
        src={images[currentImageIndex]}
        alt={`Unfallsequenz Bild ${currentImageIndex + 1}`}
        className="w-full h-full object-cover"
      />
      
      {isPlaying && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {currentImageIndex + 1} / {images.length}
        </div>
      )}

      {hasCompleted && !isPlaying && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <button
            onClick={handleReplay}
            className="flex flex-col items-center space-y-2 bg-white bg-opacity-90 p-4 rounded-lg hover:bg-opacity-100 transition-all"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <RotateCcw className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm text-gray-800 font-medium">Erneut abspielen</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccidentSequenceSlideshow;
