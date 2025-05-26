// stores/storageStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStorageStore = create(
  persist(
    (set, get) => ({
      // Daily login tracking
      lastLoginDate: "",
      loginCount: 0,
      sessionActive: false,

      // Track data storage
      currentTrackData: null,

      // Panel visibility tracking
      playSongPanelSeen: false,

      // Actions
      setLastLoginDate: (date) => set({ lastLoginDate: date }),
      setLoginCount: (count) => set({ loginCount: count }),
      setSessionActive: (active) => set({ sessionActive: active }),
      setCurrentTrackData: (data) => {
        set({ currentTrackData: data });
        if (typeof window !== "undefined") {
          localStorage.setItem("currentTrackData", data);
        }
      },
      setPlaySongPanelSeen: (seen) => set({ playSongPanelSeen: seen }),

      // Helper methods
      trackDailyLogin: () => {
        const state = get();
        const today = new Date().toISOString().split("T")[0];

        if (state.lastLoginDate !== today) {
          set({
            lastLoginDate: today,
            loginCount: 1,
            sessionActive: true,
          });
          return { isFirstLogin: true, loginCount: 1 };
        } else if (!state.sessionActive) {
          const updatedCount = state.loginCount + 1;
          set({
            loginCount: updatedCount,
            sessionActive: true,
          });
          return { isFirstLogin: false, loginCount: updatedCount };
        }

        return { isFirstLogin: false, loginCount: state.loginCount };
      },

      // Reset session for testing
      resetSession: () =>
        set({
          lastLoginDate: "",
          loginCount: 0,
          sessionActive: false,
        }),
    }),
    {
      name: "usiku-storage",
      partialize: (state) => ({
        lastLoginDate: state.lastLoginDate,
        loginCount: state.loginCount,
        sessionActive: state.sessionActive,
        currentTrackData: state.currentTrackData,
        playSongPanelSeen: state.playSongPanelSeen,
      }),
    }
  )
);

export default useStorageStore;
