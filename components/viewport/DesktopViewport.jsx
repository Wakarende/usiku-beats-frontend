import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAudio } from '../../src/context/AudioProvider';

const DesktopViewport = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const router = useRouter();
  const { playBoom, fadeOutBgMusic, playBgMusic, stopBgMusic } = useAudio();
  const iframeRef = useRef(null);

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Sync iframe URL with parent URL
  useEffect(() => {
    if (!isMobile) {
      const currentUrl = router.asPath;
      // Add iframe=true parameter to prevent AudioProvider in iframe
      const separator = currentUrl.includes('?') ? '&' : '?';
      setIframeUrl(`${currentUrl}${separator}iframe=true`);
    }
  }, [router.asPath, isMobile]);

  // PostMessage listener for iframe communication
  useEffect(() => {
    if (isMobile) return;

    const handleMessage = (event) => {
      // Security: In production, verify event.origin
      if (event.data?.type === 'PLAY_BOOM') {
        playBoom();
      } else if (event.data?.type === 'NAVIGATE') {
        router.push(event.data.url);
      } else if (event.data?.type === 'STOP_MUSIC') {
        
       stopBgMusic();
      }else if (event.data?.type == 'RESUME_MUSIC'){
        playBgMusic();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isMobile, playBoom, router]);

  // Mobile: Direct rendering
  if (isMobile) {
    return <>{children}</>;
  }

  // Desktop: Iframe with device frame
  return (
    <div style={{
      minHeight: '100vh',
   
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px'
    }}>
      <div style={{
        width: '390px',
        height: '844px',
        maxHeight: '85vh',
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: `
          0 0 0 8px rgba(255, 255, 255, 0.1),
          0 25px 50px rgba(0, 0, 0, 0.5),
          0 10px 20px rgba(0, 0, 0, 0.3)
        `,
        background: '#000'
      }}>
        {/* Device notch */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          zIndex: 9999
        }} />
        
        {/* Home indicator */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '134px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '2px',
          zIndex: 9999
        }} />

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          src={iframeUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '24px'
          }}
          title="Mobile Viewport"
        />
      </div>
    </div>
  );
};

export default DesktopViewport;