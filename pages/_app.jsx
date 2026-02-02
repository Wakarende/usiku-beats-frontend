"use client";

import "../src/App.css";
import { Provider } from "react-redux";
import mainStore from "../redux/main/mainStore";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { AnalyticsService } from "../services/analytics.service";
import { useEffect } from "react";
import AudioProvider from "../src/context/AudioProvider";
import { injectCSSVariables, injectFonts } from "../src/utils/env-config";

export default function MyApp({ Component, pageProps, router }) {
  const currentRouter = useRouter();
  useEffect(() => {
    // Initialize analytics on client-side
    AnalyticsService.init();

    // Inject CSS variables for configurable paths
    injectCSSVariables();

    // Inject dynamic font declarations
    injectFonts();

    // Initialize H5 Ad Placement API (client-side only)
    if (typeof window !== 'undefined') {
      // Initialize adsbygoogle array
      window.adsbygoogle = window.adsbygoogle || [];

      // Define adBreak and adConfig functions
      window.adBreak = window.adConfig = function(o) {
        window.adsbygoogle.push(o);
      };

      // Configure ad preloading
      if (window.adConfig) {
        window.adConfig({ preloadAdBreaks: 'on' });
        console.log('H5 Ad Placement API initialized');
      }

    }
  }, []);

  return (
    <GoogleOAuthProvider clientId="775195618835-tn6pl5dodd41sa183l116cffifbnkuoh.apps.googleusercontent.com">
    <Provider store={mainStore}>
      <AudioProvider>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentRouter.asPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </AudioProvider>
    </Provider>
    </GoogleOAuthProvider>
  );
}
