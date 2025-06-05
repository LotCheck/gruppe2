
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface AccidentSequenceSlideshowProps {
  images: string[];
  onComplete?: () => void;
}

const AccidentSequenceSlideshow = ({ images, onComplete }: AccidentSequenceSlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isPlaying && hasStarted) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= images.length) {
            setIsPlaying(false);
            onComplete?.();
            return 0;
          }
          return nextIndex;
        });
      }, 200); // 0.2 seconds interval

      return () => clearInterval(interval);
    }
  }, [isPlaying, hasStarted, images.length, onComplete]);

  const handlePlay = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setCurrentImageIndex(0);
  };

  if (!hasStarted) {
    return (
      <div className="relative bg-gray-300 rounded-md aspect-video flex items-center justify-center cursor-pointer" onClick={handlePlay}>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
            <Play className="h-6 w-6 text-white ml-1" />
          </div>
          <span className="text-xs text-gray-600">Unfallsequenz abspielen</span>
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
    </div>
  );
};

export default AccidentSequenceSlideshow;
