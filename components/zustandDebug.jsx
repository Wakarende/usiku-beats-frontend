// components/ZustandDebug.jsx
import React, { useEffect, useState } from "react";
import useFTUEStore from "../stores/ftueStore";

const ZustandDebug = () => {
  const store = useFTUEStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubFinishHydration = useFTUEStore.persist.onFinishHydration(() => {
      console.log("FTUE store finished hydration");
      setHydrated(true);
    });

    // Check if already hydrated
    if (useFTUEStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 60,
        right: 0,
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "10px",
        fontSize: "12px",
        maxHeight: "200px",
        maxWidth: "300px",
        overflow: "auto",
        zIndex: 9999,
      }}
    >
      <p>Hydrated: {hydrated ? "Yes" : "No"}</p>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
};

export default ZustandDebug;
