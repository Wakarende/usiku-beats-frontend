"use client";

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="./assets/fonts/Afolkalips.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="./manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="UsikuBeats" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.js" async></script>
      </Head>

      <body className="App">
        <Main />
        <NextScript />
      </body>
      <script defer src="https://unpkg.com/@tonejs/midi">
        const Midi = new Midi()
      </script>
      <script defer src="https://unpkg.com/audiomotion-analyzer/dist"></script>
    </Html>
  );
}
