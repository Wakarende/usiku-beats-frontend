"use client";

import type { AppProps } from "next/app";

import "../src/App.css";
import { Provider } from "react-redux";
import mainStore from "../redux/main/mainStore";

import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { AnalyticsService } from "../services/analytics.service";
import { useEffect } from "react";
import AudioProvider from "../src/context/AudioProvider";
import { injectCSSVariables, injectFonts } from "../src/utils/css-config";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const currentRouter = useRouter();
  useEffect(() => {
    // Initialize analytics on client-side
    AnalyticsService.init();
    
    // Inject CSS variables for configurable paths
    injectCSSVariables();
    
    // Inject dynamic font declarations
    injectFonts();
  }, []);

  return (
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
  );
}
