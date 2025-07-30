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
      firstCardX = containerRect.left;
      firstCardY = containerRect.top;
    }
  
    setTargetPosition({
      x: firstCardX,
      y: firstCardY
    });
  };

  // More precise scale calculation matching Tailwind breakpoints
  const getTargetScale = () => {
    const screenWidth = window.innerWidth;
    let targetWidth, targetHeight;
    
    if (screenWidth >= 1280) { // xl
      targetWidth = 160;
      targetHeight = 266;
    } else if (screenWidth >= 1024) { // lg
      targetWidth = 180;
      targetHeight = 266;
    } else if (screenWidth >= 768) { // md
      targetWidth = 160;
      targetHeight = 256;
    } else if (screenWidth >= 640) { // sm
      targetWidth = 140;
      targetHeight = 200;
    } else { // < sm, default to sm size
      targetWidth = 140;
      targetHeight = 200;
    }
    
    // Calculate scale based on width (AnimationSongCard is 200x280)
    const widthScale = targetWidth / 200;
    const heightScale = targetHeight / 280;
    
    // Use the smaller scale to ensure it fits properly
    return Math.min(widthScale, heightScale);
  };

  useEffect(() => {
    if (isActive && song) {
     
      setDataUpdated(false);
      
      calculateTargetPosition();
      setAnimationPhase('centerFadeIn'); // Start with fade-in phase
      
      // Fade in first
      setTimeout(() => {
        setAnimationPhase('center');
      }, 500);
      
      setTimeout(() => {
       
        calculateTargetPosition();
        setAnimationPhase('moving');
      }, 1500); // Delayed to account for fade-in
      
      setTimeout(() => {
        setAnimationPhase('fadeOut');
      }, 2700); 
      
      setTimeout(() => {
        setAnimationPhase('hidden');
        if (onComplete && !dataUpdated) {
          setDataUpdated(true);
          onComplete();
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
        opacity: 0, // Start invisible
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
        opacity: 1, // Fade to visible
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