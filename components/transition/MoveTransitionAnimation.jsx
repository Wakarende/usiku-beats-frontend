import React, { useEffect, useRef, useState } from "react";
import AnimationSongCard from "./AnimationSongCard";

const MoveTransitionAnimation = ({
  song,
  onComplete,
  isActive,
  targetContainerRef,
  isFirstSong = false,
  showBackgroundOverlay = true,
}) => {
  const [animationPhase, setAnimationPhase] = useState("hidden");
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [dataUpdated, setDataUpdated] = useState(false);
  const [useViewportCoordinates, setUseViewportCoordinates] = useState(false);
  const activeContainerRef = useRef(null);

  const calculateTargetPosition = () => {
    if (!targetContainerRef?.current) return;

    let container = targetContainerRef.current;
    let containerRect = container.getBoundingClientRect();

    if (
      (containerRect.width === 0 || containerRect.height === 0) &&
      typeof document !== "undefined"
    ) {
      const desktopContainer = document.querySelector(
        '.desktop-only .mobile-scaled [data-role="your-songs-container"]'
      );
      if (desktopContainer instanceof HTMLElement) {
        container = desktopContainer;
        containerRect = desktopContainer.getBoundingClientRect();
      }
    }

    const viewportElement = container.closest(".mobile-scaled");
    const viewportRect = viewportElement ? viewportElement.getBoundingClientRect() : null;

    let firstCardX, firstCardY;

    const viewportLeft = viewportRect?.left ?? 0;
    const viewportTop = viewportRect?.top ?? 0;
    const relativeLeft = containerRect.left - viewportLeft;
    const relativeTop = containerRect.top - viewportTop;

    if (isFirstSong) {
      const fallbackWidth =
        containerRect.width > 0
          ? containerRect.width
          : viewportRect?.width > 0
          ? viewportRect.width
          : 160;
      firstCardX = relativeLeft + fallbackWidth / 2 - 80;
      firstCardY = relativeTop;
    } else {
      firstCardX = relativeLeft + 8;
      firstCardY = relativeTop;
    }

    setTargetPosition({
      x: firstCardX,
      y: firstCardY,
    });
    setUseViewportCoordinates(Boolean(viewportRect));
    activeContainerRef.current = container;
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
    const containerNode = activeContainerRef.current || targetContainerRef?.current;
    if (!containerNode) return;

    const container = containerNode;
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

        console.log("Existing cards:", existingCards.length);
        console.log("Shift amount:", shiftAmount);

        card.style.transform = `translateX(${shiftAmount}px)`;
        card.style.transition = "transform 0.6s ease-out";
      } else {
        card.style.transform = "";
        card.style.transition = "";
      }
    });
  };

  useEffect(() => {
    if (isActive && song) {
      setDataUpdated(false);

      calculateTargetPosition();
      setAnimationPhase("centerFadeIn");
      setTimeout(() => {
        setAnimationPhase("center");
      }, 500);

      setTimeout(() => {
        calculateTargetPosition();
        setAnimationPhase("moving");

        if (!isFirstSong) {
          shiftExistingCards(true);
        }
      }, 1500);

      setTimeout(() => {
        setAnimationPhase("fadeOut");
      }, 2700);

      setTimeout(() => {
        setAnimationPhase("hidden");
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

  if (!isActive || !song || animationPhase === "hidden") {
    return null;
  }

  const getStyles = () => {
    const positionRule = useViewportCoordinates ? "absolute" : "fixed";

    if (animationPhase === "centerFadeIn") {
      return {
        position: positionRule,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.5s ease-in-out",
        opacity: 0,
        zIndex: 9999,
        pointerEvents: "none",
      };
    }

    if (animationPhase === "center") {
      return {
        position: positionRule,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.5s ease-in-out",
        opacity: 1,
        zIndex: 9999,
        pointerEvents: "none",
      };
    }

    if (animationPhase === "moving") {
      const scale = getTargetScale();
      return {
        position: positionRule,
        top: `${targetPosition.y}px`,
        left: `${targetPosition.x}px`,
        transform: `translate(0, 0) scale(${scale})`,
        transformOrigin: "top left",
        transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        opacity: 1,
        zIndex: 9999,
        pointerEvents: "none",
      };
    }

    if (animationPhase === "fadeOut") {
      const scale = getTargetScale();
      return {
        position: positionRule,
        top: `${targetPosition.y}px`,
        left: `${targetPosition.x}px`,
        transform: `translate(0, 0) scale(${scale})`,
        transformOrigin: "top left",
        transition: "opacity 0.3s ease-out",
        opacity: 0,
        zIndex: 9999,
        pointerEvents: "none",
      };
    }

    return {};
  };

  return (
    <>
      {(animationPhase === "centerFadeIn" || animationPhase === "center") &&
        showBackgroundOverlay && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"></div>
        )}
      <div style={getStyles()}>
        <AnimationSongCard song={song} />
      </div>
    </>
  );
};

export default MoveTransitionAnimation;
