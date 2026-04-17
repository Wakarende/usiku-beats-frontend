import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function LandscapeBlocker() {
  const [mounted, setMounted] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      setIsLandscape(
        window.innerWidth > window.innerHeight && window.innerWidth < 1024,
      );
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  if (!mounted || !isLandscape) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "2rem",
      }}
    >
      <style>{`
        @keyframes rotatePulse {
          0%, 100% { transform: rotate(0deg); opacity: 1; }
          40% { transform: rotate(-90deg); opacity: 0.6; }
          60% { transform: rotate(-90deg); opacity: 1; }
        }
      `}</style>

      <img
        src="./assets/img/usikuLogo.png"
        alt="Usiku Beats"
        style={{
          width: 180,
          height: "auto",
          objectFit: "contain",
        }}
      />

      <div
        style={{
          width: 64,
          height: 64,
          border: "3px solid #ffffff",
          borderRadius: 10,
          position: "relative",
          animation: "rotatePulse 2s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -10,
            right: -10,
            width: 20,
            height: 20,
            borderTop: "3px solid #ffffff",
            borderRight: "3px solid #ffffff",
            borderRadius: "0 6px 0 0",
            transform: "rotate(90deg)",
          }}
        />
      </div>

      <p
        style={{
          color: "#ffffff",
          fontSize: 20,
          fontWeight: 700,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: 0,
        }}
      >
        Please rotate your device
      </p>
      <p
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: 14,
          textAlign: "center",
          margin: 0,
          maxWidth: 260,
          lineHeight: 1.6,
        }}
      >
        Usiku Beats is designed for portrait mode.
        <br />
        Turn your phone upright to continue.
      </p>
    </div>,
    document.body,
  );
}
