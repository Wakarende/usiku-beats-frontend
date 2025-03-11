import React, { useEffect, useRef } from "react";
import "../styles.css";

const ParticleEffect = ({ active, onComplete, position }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Create particles - increased count for more dramatic effect
    const particleCount = 80;
    const notes = ["♪", "♫", "♬", "♩", "♭", "♮"];
    const colors = [
      "#FFD700",
      "#FF6B6B",
      "#4ecdc4",
      "#F9DC5C",
      "#e84a5f",
      "#FF8C00",
      "#D946EF",
      "#8B5CF6",
    ];

    // Clear any existing particles
    container.innerHTML = "";

    // Create and animate new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Randomly choose musical note or star
      const isNote = Math.random() > 0.3;
      particle.textContent = isNote
        ? notes[Math.floor(Math.random() * notes.length)]
        : "✦";

      // Random position, size and color
      const size = Math.random() * 24 + 12; // Bigger particles
      const startX = (position?.x || containerRect.width / 2) - size / 2;
      const startY = (position?.y || containerRect.height / 2) - size / 2;

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.fontSize = `${size}px`;
      particle.style.color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.textShadow = `0 0 8px ${
        colors[Math.floor(Math.random() * colors.length)]
      }`;

      // Random direction and distance
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 150 + 50; // Greater distance
      const duration = Math.random() * 1.5 + 0.7; // 0.7 to 2.2 seconds

      // Calculate end position
      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;

      // Apply animation
      particle.style.animation = `float ${duration}s ease-out forwards`;
      particle.style.setProperty("--start-x", `${startX}px`);
      particle.style.setProperty("--start-y", `${startY}px`);
      particle.style.setProperty("--end-x", `${endX}px`);
      particle.style.setProperty("--end-y", `${endY}px`);

      container.appendChild(particle);
    }

    // Cleanup function - allow more time for particles
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [active, position, onComplete]);

  return <div ref={containerRef} className="particle-container"></div>;
};

export default ParticleEffect;
