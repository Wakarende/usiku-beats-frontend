// src/stores/unlockSongsStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Store to manage the state of unlocked and unlocking songs
 */
const useUnlockSongsStore = create(
  persist(
    (set, get) => ({
      // State
      unlockedState: {},
      particleTrigger: {},
      unlockTimes: {},

      // Actions
      setUnlockTime: (songId, unlockTimeISOString) =>
        set((state) => ({
          unlockTimes: {
            ...state.unlockTimes,
            [songId]: unlockTimeISOString,
          },
        })),

      getUnlockTime: (songId) => {
        const { unlockTimes } = get();
        return unlockTimes[songId] || null;
      },

      clearUnlockTime: (songId) =>
        set((state) => {
          const newUnlockTimes = { ...state.unlockTimes };
          delete newUnlockTimes[songId];
          return { unlockTimes: newUnlockTimes };
        }),

      markSongAsUnlocked: (songId) =>
        set((state) => ({
          unlockedState: {
            ...state.unlockedState,
            [songId]: true,
          },
        })),

      resetSongUnlockedState: (songId) =>
        set((state) => ({
          unlockedState: {
            ...state.unlockedState,
            [songId]: false,
          },
        })),

      triggerParticles: (songId) =>
        set((state) => ({
          particleTrigger: {
            ...state.particleTrigger,
            [songId]: true,
          },
        })),

      resetParticles: (songId) =>
        set((state) => ({
          particleTrigger: {
            ...state.particleTrigger,
            [songId]: false,
          },
        })),

      // Helper methods
      isSongUnlocked: (songId) => {
        const { unlockedState } = get();
        return unlockedState[songId] || false;
      },

      shouldShowParticles: (songId) => {
        const { particleTrigger } = get();
        return particleTrigger[songId] || false;
      },

      resetAllUnlockedStates: () => set({ unlockedState: {}, particleTrigger: {} }),
    }),
    {
      name: "unlock-songs-storage", // unique name for localStorage
      partialize: (state) => ({
        unlockedState: state.unlockedState,
        particleTrigger: state.particleTrigger,
        unlockTimes: state.unlockTimes,
      }),
    }
  )
);

export default useUnlockSongsStore;
