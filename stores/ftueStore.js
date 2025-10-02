import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * FTUE (First Time User Experience) store
 * Manages the state for the user onboarding flow
 */
const useFTUEStore = create(
  persist(
    (set, get) => ({
      // State
      currentStep: 1, // Current step in the FTUE flow (1-7)
      isCompleted: false, // Whether FTUE is completed
      hubTutorialSeen: false, // Whether hub tutorial has been seen
      libraryTutorialSeen: false, // Whether library tutorial has been seen
      unlockingInfoSeen: false, // Whether unlocking info panel has been seen
      addToLibrarySeen: false, // Whether add to library panel has been seen
      footerGlowCleared: false, // Whether footer glow has been cleared
      showFtuePanel: false,
      step1PanelShown: false,
      // Actions
      setCurrentStep: (step) => {
        console.log("Setting current step to:", step);
        set({ currentStep: step });
      },

      completeStep: (step) =>
        set((state) => ({
          currentStep: Math.max(state.currentStep, step + 1),
        })),

      completeFTUE: () => set({ isCompleted: true }),

      setHubTutorialSeen: (seen = true) => set({ hubTutorialSeen: seen }),

      setLibraryTutorialSeen: (seen = true) => set({ libraryTutorialSeen: seen }),

      setUnlockingInfoSeen: (seen = true) => set({ unlockingInfoSeen: seen }),

      setAddToLibrarySeen: (seen = true) => set({ addToLibrarySeen: seen }),

      setFooterGlowCleared: (cleared = true) => set({ footerGlowCleared: cleared }),

      setShowFtuePanel: (show) => set({ showFtuePanel: show }),
      setStep1PanelShown: (shown = true) => set({ step1PanelShown: shown }),

      // Helper methods
      getStepStatus: () => {
        const state = get();
        return {
          isStep1: state.currentStep === 1,
          isStep2: state.currentStep === 2,
          isStep3: state.currentStep === 3,
          isStep4: state.currentStep === 4,
          isStep5: state.currentStep === 5,
          isStep6: state.currentStep === 6,
          isCompleted: state.isCompleted,
        };
      },

      resetFTUE: () =>
        set({
          currentStep: 1,
          isCompleted: false,
          hubTutorialSeen: false,
          libraryTutorialSeen: false,
          unlockingInfoSeen: false,
          addToLibrarySeen: false,
          footerGlowCleared: false,
          showFtuePanel: false,
          step1PanelShown: false,
        }),
    }),
    {
      name: "ftue-storage", // unique name for localStorage
      partialize: (state) => ({
        currentStep: state.currentStep,
        isCompleted: state.isCompleted,
        hubTutorialSeen: state.hubTutorialSeen,
        libraryTutorialSeen: state.libraryTutorialSeen,
        unlockingInfoSeen: state.unlockingInfoSeen,
        addToLibrarySeen: state.addToLibrarySeen,
        footerGlowCleared: state.footerGlowCleared,
        showFtuePanel: state.showFtuePanel,
        step1PanelShown: state.step1PanelShown,
      }),
    }
  )
);

export default useFTUEStore;
