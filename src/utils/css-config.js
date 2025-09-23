/**
 * Centralized configuration for application paths
 */

// Get base path from environment variable with fallback
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Get asset prefix from environment variable with fallback
export const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '';

// Helper function to construct asset URLs
export const getAssetPath = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${ASSET_PREFIX}/${cleanPath}`;
};

// Helper function to construct page URLs
export const getPagePath = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_PATH}/${cleanPath}`;
};

// Ensure BASE_PATH ends with trailing slash for Phaser baseURL
export const getPhaserBaseURL = () => {
  return BASE_PATH.endsWith('/') ? BASE_PATH : `${BASE_PATH}/`;
};

/**
 * Injects CSS custom properties for dynamic background images
 * Call this function early in your app initialization to set CSS variables
 */
export const injectCSSVariables = () => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    
    // Set asset URLs as CSS variables for background images
    root.style.setProperty('--bg-image-url', `url("${getAssetPath('assets/img/BG.png')}")`);
    root.style.setProperty('--select-arrow-url', `url("${getAssetPath('assets/icons/select-arrow.png')}")`);
    
    // Set asset URLs as CSS variables for pages/pages.css
    root.style.setProperty('--daily-reward-bg-url', `url("${getAssetPath('assets/img/dailyreward/BG.png')}")`);
    root.style.setProperty('--levelinfo-gradient-url', `url("${getAssetPath('assets/img/levelinfo/Gradient.png')}")`);
    root.style.setProperty('--hub-button-blank-url', `url("${getAssetPath('assets/img/hub/button_blank.png')}")`);
    root.style.setProperty('--library-bottom-banner-bg-url', `url("${getAssetPath('assets/img/library/bottom_banner_bg.png')}")`);
    root.style.setProperty('--library-popup-frame-url', `url("${getAssetPath('assets/img/library/popup-frame.png')}")`);
    
    // Set asset URLs as CSS variables for components/styles.css
    root.style.setProperty('--header-top-banner-url', `url("${getAssetPath('assets/img/header/Top_banner.png')}")`);
    root.style.setProperty('--hub-disc-bg-url', `url("${getAssetPath('assets/img/hub/Disc_bg.png')}")`);
    root.style.setProperty('--hub-frame-url', `url("${getAssetPath('assets/img/hub/frame.png')}")`);
    root.style.setProperty('--levelinfo-tile-active-url', `url("${getAssetPath('assets/img/levelinfo/Tile_Active.png')}")`);
    root.style.setProperty('--levelinfo-tile-completed-url', `url("${getAssetPath('assets/img/levelinfo/Tile_completed.png')}")`);
    root.style.setProperty('--levelinfo-tile-inactive-url', `url("${getAssetPath('assets/img/levelinfo/Tile_Inactive.png')}")`);
    root.style.setProperty('--levelup-see-unlock-btn-url', `url("${getAssetPath('assets/img/levelup/see_unlock_btn.png')}")`);
  }
};

/**
 * Dynamically injects font-face declarations with correct paths
 * This replaces CSS variables for fonts which don't work reliably
 */
export const injectFonts = () => {
  if (typeof document !== 'undefined') {
    // Remove existing dynamic font styles
    const existingStyle = document.getElementById('dynamic-fonts');
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = 'dynamic-fonts';
    style.textContent = `
      @font-face {
        font-family: "Afolkalips";
        src: url("${getAssetPath('assets/fonts/Afolkalips.otf')}") format("opentype");
        font-display: swap;
      }
      @font-face {
        font-family: "Carlito-Bold";
        src: url("${getAssetPath('assets/fonts/Carlito-Bold.ttf')}") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Carlito-BoldItalic";
        src: url("${getAssetPath('assets/fonts/Carlito-BoldItalic.ttf')}") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Carlito-Italic";
        src: url("${getAssetPath('assets/fonts/Carlito-Italic.ttf')}") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Digital-7";
        src: url("${getAssetPath('assets/fonts/digital-7.ttf')}") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Carlito-Regular";
        src: url("${getAssetPath('assets/fonts/Carlito-Regular.ttf')}") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "YoungTechs";
        src: url("${getAssetPath('assets/fonts/youngtechs.ttf')}") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Robot-Font";
        src: url("${getAssetPath('assets/fonts/Robot_Font.ttf')}") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "D-DIN-Bold";
        src: url("${getAssetPath('assets/fonts/D-DIN-Bold.otf')}") format("opentype");
        font-display: swap;
      }
      @font-face {
        font-family: "DINPro-Bold";
        src: url("${getAssetPath('assets/fonts/DINPro-Bold.otf')}") format("opentype");
        font-display: swap;
      }
      @font-face {
        font-family: "DINPro-Medium";
        src: url("${getAssetPath('assets/fonts/DINPro-Medium.otf')}") format("opentype");
        font-display: swap;
      }
      @font-face {
        font-family: "DINPro";
        src: url("${getAssetPath('assets/fonts/DINPro.otf')}") format("opentype");
        font-display: swap;
      }
      @font-face {
        font-family: "Misty-Cotton";
        src: url("${getAssetPath('assets/fonts/Misty Cotton.ttf')}") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "MyriadPro-Bold";
        src: url("${getAssetPath('assets/fonts/MyriadPro-Bold.otf')}") format("opentype");
        font-display: swap;
      }
      @font-face {
        font-family: "MyriadPro-Regular";
        src: url("${getAssetPath('assets/fonts/MyriadPro-Regular.otf')}") format("opentype");
        font-display: swap;
      }
      @font-face {
        font-family: "Roboto-Regular";
        src: url("${getAssetPath('assets/fonts/Roboto-Regular.ttf')}") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Righteous-Regular";
        src: url("${getAssetPath('assets/fonts/Righteous-Regular.ttf')}") format("truetype");
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }
};