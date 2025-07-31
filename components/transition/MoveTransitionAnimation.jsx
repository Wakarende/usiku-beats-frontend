import React, { useEffect, useState } from 'react';
import AnimationSongCard from './AnimationSongCard';
// import { clear } from 'console';

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
  
  if (screenWidth >= 1024) { // xl: min 1024px
    targetWidth = 160;
    targetHeight = 266;
  } else if (screenWidth >= 641 && screenWidth <= 1023) { // lg: 641px to 1023px
    targetWidth = 180;
    targetHeight = 266;
  } else if (screenWidth >= 400 && screenWidth <= 640) { // md: 400px to 640px
    targetWidth = 160;
    targetHeight = 256;
  } else if (screenWidth <= 395) { // sm: max 395px
    targetWidth = 140;
    targetHeight = 200;
  } else { // fallback for gap between 396-399px
    targetWidth = 160;
    targetHeight = 256;
  }
  // Calculate both width and height scales
  const widthScale = targetWidth / 200;   // AnimationSongCard is 200px wide
  const heightScale = targetHeight / 280;  // AnimationSongCard is 280px tall
  
  // Use the smaller scale to ensure the card fits within both dimensions
  return Math.min(widthScale, heightScale);
};

// In MoveTransitionAnimation, add this function
// const shiftExistingCards = (shift = true) => {
//   if (!targetContainerRef?.current) return;
  
//   const container = targetContainerRef.current;
//   const existingCards = container.children;
  
  
//   Array.from(existingCards).forEach((card, index) => {
//     if (!shift && index === 0) return;
    
//     if (shift) {
//       let shiftAmount;
      
//       if (existingCards.length === 1) {
//         // Card is currently centered, needs to move to "second position" in left-aligned layout
//         const containerWidth = container.offsetWidth;
//         const cardWidth = card.offsetWidth;
//         const gap = 16; // or whatever your gap is
        
//         // Calculate where it should be in left-aligned layout (second position)
//         const targetLeftPosition = cardWidth + gap;
//         // Calculate where it currently is (centered)
//         const currentCenterPosition = (containerWidth - cardWidth) / 2;
        
//         shiftAmount = targetLeftPosition - currentCenterPosition;
//       } else {
//         // Normal case: just shift by one card width + gap
//         shiftAmount = getCardWidthAndGap();
//       }
      
//       card.style.transform = `translateX(${shiftAmount}px)`;
//       card.style.transition = 'transform 0.6s ease-out';
//     } else {
//       card.style.transform = '';
//       card.style.transition = '';
//     }
//   });
// };
// const shiftExistingCards = (shift = true) => {
//   if (!targetContainerRef?.current) return;
  
//   const container = targetContainerRef.current;
//   const existingCards = container.children;
  
//   // Helper function to get responsive card width + gap
//   const getCardWidthAndGap = () => {
//     const screenWidth = window.innerWidth;
//     let cardWidth, gap;
    
//     if (screenWidth <= 395) { // sm
//       cardWidth = 140;
//       gap = 6; // matching your gap-x-1.5
//     } else if (screenWidth >= 400 && screenWidth <= 640) { // md
//       cardWidth = 160;
//       gap = 6;
//     } else if (screenWidth >= 641 && screenWidth <= 1023) { // lg
//       cardWidth = 180;
//       gap = 6;
//     } else { // xl
//       cardWidth = 160;
//       gap = 6;
//     }
    
//     return { cardWidth, gap };
//   };
  
//   Array.from(existingCards).forEach((card, index) => {
//     if (!shift && index === 0) return;
    
//     if (shift) {
//       let shiftAmount;
      
//       if (existingCards.length === 1) {
//         // Card is currently centered, should move to make space for new card on the left
//         const { cardWidth, gap } = getCardWidthAndGap();
        
//         // Simple approach: just shift right by card width + gap
//         // This moves the centered card to the right to make space on the left
//         shiftAmount = cardWidth + gap;
//       } else {
//         // Normal case: shift by one card width + gap
//         const { cardWidth, gap } = getCardWidthAndGap();
//         shiftAmount = cardWidth + gap;
//       }
      
//       card.style.transform = `translateX(${shiftAmount}px)`;
//       card.style.transition = 'transform 0.6s ease-out';
//     } else {
//       card.style.transform = '';
//       card.style.transition = '';
//     }
//   });
// };
// const shiftExistingCards = (shift = true) => {
//   if (!targetContainerRef?.current) return;
  
//   const container = targetContainerRef.current;
//   const existingCards = container.children;
  
//   Array.from(existingCards).forEach((card, index) => {
//     if (!shift && index === 0) return;
    
//     if (shift) {
//       // Get the ACTUAL width of this card from the DOM
//       const cardRect = card.getBoundingClientRect();
//       const actualCardWidth = cardRect.width;
      
//       // Get the container's computed style to find the actual gap
//       const containerStyle = window.getComputedStyle(container);
//       const gap = parseFloat(containerStyle.gap) || parseFloat(containerStyle.columnGap) || 6; // fallback to 6px
      
//       // const shiftAmount = actualCardWidth + gap;
//       const shiftAmount = 80;
      
//       console.log('Actual card width:', actualCardWidth);
//       console.log('Actual gap:', gap);
//       console.log('Shift amount:', shiftAmount);
      
//       card.style.transform = `translateX(${shiftAmount}px)`;
//       card.style.transition = 'transform 0.6s ease-out';
//     } else {
//       card.style.transform = '';
//       card.style.transition = '';
//     }
//   });
// };
const shiftExistingCards = (shift = true) => {
  if (!targetContainerRef?.current) return;
  
  const container = targetContainerRef.current;
  const existingCards = container.children;
  
  Array.from(existingCards).forEach((card, index) => {
    if (!shift && index === 0) return;
    
    if (shift) {
      let shiftAmount;
      
      if (existingCards.length === 1) {
        // ONE SONG scenario: smaller shift amount
        shiftAmount = 50; 
      } else {
        // MULTIPLE SONGS scenario: larger shift amount  
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
      setAnimationPhase('centerFadeIn'); // Start with fade-in phase
      
      // Fade in first
      setTimeout(() => {
        setAnimationPhase('center');
      }, 500);
      
      setTimeout(() => {
       
        calculateTargetPosition();
        setAnimationPhase('moving');

         if (!isFirstSong) {
        shiftExistingCards(true);
      }
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

         if (!isFirstSong) {
          setTimeout(() => {
            shiftExistingCards(false);
          }, 10); // Give time for Redux update and re-render
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