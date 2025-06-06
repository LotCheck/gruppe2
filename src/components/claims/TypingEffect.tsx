
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  typingSpeed?: number;
  delay?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  typingSpeed = 30, 
  delay = 0 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    
    // Delay before starting to type
    const delayTimer = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!startTyping) return;

    if (currentIndex < text.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
      
      return () => clearTimeout(typingTimer);
    }
  }, [currentIndex, text, typingSpeed, startTyping]);

  return <>{displayedText}</>;
};

export default TypingEffect;
