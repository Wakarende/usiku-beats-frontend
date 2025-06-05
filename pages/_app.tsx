"use client";

import type { AppProps } from "next/app";

import "../src/App.css";
import { Provider } from "react-redux";
import mainStore from "../redux/main/mainStore";

import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { AnalyticsService } from "../services/analytics.service";
import { useEffect, useState } from "react";
import AudioProvider from "../src/context/AudioProvider";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const currentRouter = useRouter();
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window !== window.parent);
  }, []);

  useEffect(() => {
    // Initialize analytics on client-side
    AnalyticsService.init();
  }, []);

  return (
    <Provider store={mainStore}>
      {!isInIframe ? (
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
      ): (
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
      )
    }
    </Provider>
  );
}
