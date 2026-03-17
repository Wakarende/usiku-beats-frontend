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
import OneSignal from "react-onesignal";

export default function MyApp({ Component, pageProps, router }) {
  const currentRouter = useRouter();
  useEffect(() => {
    // Initialize OneSignal push notifications
    let oneSignalReady = false;
    (async () => {
      try {
        await OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          allowLocalhostAsSecureOrigin: true,
        });
        oneSignalReady = true;

        // Trigger the browser permission prompt if not yet decided
        if (typeof Notification !== "undefined" && Notification.permission === "default") {
          await OneSignal.Notifications.requestPermission();
        }

        // Register the push subscription with OneSignal if permission granted
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          if (!OneSignal.User.PushSubscription.optedIn) {
            await OneSignal.User.PushSubscription.optIn();
          }
        }

        // Link user if already authenticated on page load
        const { isAuthenticated, user_data } = mainStore.getState().auth;
        if (isAuthenticated && user_data?.profile?.user?.id) {
          await OneSignal.login(String(user_data.profile.user.id));
        }
      } catch (e) {
        console.warn("OneSignal init failed:", e?.message ?? e);
      }
    })();

    // Watch for login / logout and sync identity with OneSignal
    let prevIsAuth = mainStore.getState().auth.isAuthenticated;
    const unsubscribe = mainStore.subscribe(async () => {
      if (!oneSignalReady) return;
      const { isAuthenticated, user_data } = mainStore.getState().auth;
      if (isAuthenticated === prevIsAuth) return;
      prevIsAuth = isAuthenticated;

      try {
        if (isAuthenticated && user_data?.profile?.user?.id) {
          await OneSignal.login(String(user_data.profile.user.id));
        } else if (!isAuthenticated) {
          await OneSignal.logout();
        }
      } catch (_) {
        // OneSignal not ready or no active session
      }
    });

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
    return () => unsubscribe();
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
