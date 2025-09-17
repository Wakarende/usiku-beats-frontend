import React, { useEffect, useState } from 'react';
import AnimationSongCard from './AnimationSongCard';

const MoveTransitionAnimation = ({ 
  song, 
  onComplete,
  isActive,
  targetContainerRef,
  isFirstSong = false,
  showBackgroundOverlay = true
}) => {
  const [animationPhase, setAnimationPhase] = useState('hidden');
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [dataUpdated, setDataUpdated] = useState(false);

  const calculateTargetPosition = () => {
    if (!targetContainerRef?.current) return;

    const container = targetContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    
    let firstCardX, firstCardY;
  
    if (isFirstSong) {
      firstCardX = containerRect.left + (containerRect.width / 2) - 80; 
      firstCardY = containerRect.top;
    } else { 
      firstCardX = containerRect.left + 8;
      firstCardY = containerRect.top;
    }
  
    setTargetPosition({
      x: firstCardX,
      y: firstCardY
    });
  };

  const getTargetScale = () => {
  const screenWidth = window.innerWidth;
  let targetWidth, targetHeight;
  
  if (screenWidth >= 1024) { 
    targetWidth = 160;
    targetHeight = 266;
  } else if (screenWidth >= 641 && screenWidth <= 1023) { 
    targetWidth = 180;
    targetHeight = 266;
  } else if (screenWidth >= 400 && screenWidth <= 640) { 
    targetWidth = 160;
    targetHeight = 256;
  } else if (screenWidth <= 395) { 
    targetWidth = 140;
    targetHeight = 200;
  } else { 
    targetWidth = 160;
    targetHeight = 256;
  }
  // Calculate both width and height scales
  const widthScale = targetWidth / 200;   
  const heightScale = targetHeight / 280;  
  
  
  return Math.min(widthScale, heightScale);
};

const shiftExistingCards = (shift = true) => {
  if (!targetContainerRef?.current) return;
  
  const container = targetContainerRef.current;
  const existingCards = container.children;
  
  Array.from(existingCards).forEach((card, index) => {
    if (!shift && index === 0) return;
    
    if (shift) {
      let shiftAmount;
      
      if (existingCards.length === 1) {
        shiftAmount = 50; 
      } else {  
        const cardRect = card.getBoundingClientRect();
        const actualCardWidth = cardRect.width;
        const containerStyle = window.getComputedStyle(container);
        const gap = parseFloat(containerStyle.gap) || parseFloat(containerStyle.columnGap) || 6;
        shiftAmount = actualCardWidth;
      }
      
      console.log('Existing cards:', existingCards.length);
      console.log('Shift amount:', shiftAmount);
      
      card.style.transform = `translateX(${shiftAmount}px)`;
      card.style.transition = 'transform 0.6s ease-out';
    } else {
      card.style.transform = '';
      card.style.transition = '';
    }
  });
};

  useEffect(() => {
    if (isActive && song) {
     
      setDataUpdated(false);
      
      calculateTargetPosition();
      setAnimationPhase('centerFadeIn'); 
      setTimeout(() => {
        setAnimationPhase('center');
      }, 500);
      
      setTimeout(() => {
       
        calculateTargetPosition();
        setAnimationPhase('moving');

         if (!isFirstSong) {
        shiftExistingCards(true);
      }
      }, 1500); 
      
      setTimeout(() => {
        setAnimationPhase('fadeOut');
      }, 2700); 
      
      setTimeout(() => {
        setAnimationPhase('hidden');
        if (onComplete && !dataUpdated) {
          setDataUpdated(true);
          onComplete();
        }

         if (!isFirstSong) {
          setTimeout(() => {
            shiftExistingCards(false);
          }, 10); 
          }
      }, 3000); 
    }
  }, [isActive, song, onComplete, isFirstSong]);

  if (!isActive || !song || animationPhase === 'hidden') {
    return null;
  }

  const getStyles = () => {
    if (animationPhase === 'centerFadeIn') {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.5s ease-in-out',
        opacity: 0, 
        zIndex: 9999,
        pointerEvents: 'none'
      };
    }
    
    if (animationPhase === 'center') {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.5s ease-in-out',
        opacity: 1,
        zIndex: 9999,
        pointerEvents: 'none'
      };
    }
    
    if (animationPhase === 'moving') {
      const scale = getTargetScale();
      return {
        position: 'fixed',
        top: `${targetPosition.y}px`,
        left: `${targetPosition.x}px`,
        transform: `translate(0, 0) scale(${scale})`,
        transformOrigin: 'top left',
        transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        opacity: 1,
        zIndex: 9999,
        pointerEvents: 'none'
      };
    }
    
    if (animationPhase === 'fadeOut') {
      const scale = getTargetScale();
      return {
        position: 'fixed',
        top: `${targetPosition.y}px`,
        left: `${targetPosition.x}px`,
        transform: `translate(0, 0) scale(${scale})`,
        transformOrigin: 'top left',
        transition: 'opacity 0.3s ease-out',
        opacity: 0,
        zIndex: 9999,
        pointerEvents: 'none'
      };
    }

    return {};
  };

  return (
    <>
      {(animationPhase === 'centerFadeIn' || animationPhase === 'center') && showBackgroundOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"></div>
      )}
      <div style={getStyles()}>
        <AnimationSongCard song={song} />
      </div>
    </>
  );
};

export default MoveTransitionAnimation;