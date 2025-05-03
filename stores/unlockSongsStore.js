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
      unlockedState: {}, // Maps songId -> boolean (whether song is unlocked)
      particleTrigger: {}, // Maps songId -> boolean (whether to show particles)

      // Actions
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
      }),
    }
  )
);

export default useUnlockSongsStore;
