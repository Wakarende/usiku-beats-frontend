"use client";

import type { AppProps } from "next/app";

import "../src/App.css";
import { Provider } from "react-redux";
import mainStore from "../redux/main/mainStore";

import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const currentRouter = useRouter();

  return (
    <Provider store={mainStore}>
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
    </Provider>
  );
}
