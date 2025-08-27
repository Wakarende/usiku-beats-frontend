import axios from "axios";

// Initialize with placeholders for server-side rendering
let gameanalytics = null;
let initialized = false;

// Only import GameAnalytics on the client side
if (typeof window !== "undefined") {
  // We use require instead of import to make this conditional
  // This prevents the server from trying to load gameanalytics
  try {
    gameanalytics = require("gameanalytics");
  } catch (e) {
    console.error("Error loading GameAnalytics:", e);
  }
}

export const AnalyticsService = {
  init: () => {
    // Only initialize once and only on client-side
    if (!initialized && typeof window !== "undefined" && gameanalytics) {
      try {
        gameanalytics.GameAnalytics.configureBuild("0.3.1");
        gameanalytics.GameAnalytics.configureAvailableResourceCurrencies([
          "Gems",
          "Discs",
          "Stars",
        ]);
        gameanalytics.GameAnalytics.configureAvailableResourceItemTypes([
          "continue",
          "song_unlock",
        ]);

        gameanalytics.GameAnalytics.initialize(
          "ee0454adaf47527b1972a5a530e570b6",
          "f5ed2b53cbad4d76d4f481b0b423bc4a0937c5bd"
        );
        initialized = true;
        console.log("GameAnalytics initialized");
      } catch (error) {
        console.error("Failed to initialize GameAnalytics:", error);
      }
    }
  },

  // Game lifecycle events
  trackGameStart: () => {
    if (!initialized || !gameanalytics) return;
    gameanalytics.GameAnalytics.addProgressionEvent(
      gameanalytics.EGAProgressionStatus.Start,
      "Game"
    );
  },

  trackGameEnd: (score) => {
    if (!initialized || !gameanalytics) return;
    gameanalytics.GameAnalytics.addProgressionEvent(
      gameanalytics.EGAProgressionStatus.Complete,
      "Game",
      "",
      "",
      score
    );
  },

  // Song events for rhythm game
  trackSongStart: (songName) => {
    if (!initialized || !gameanalytics) return;
    gameanalytics.GameAnalytics.addProgressionEvent(
      gameanalytics.EGAProgressionStatus.Start,
      "Song",
      songName
    );
  },

  trackTileMiss: (songName, tileType) => {
    if (!initialized || !gameanalytics) return;

    // Since tileType is always a string, include it in the event ID
    gameanalytics.GameAnalytics.addDesignEvent(`Song:Miss:${songName}:${tileType}`);

    // // Also track general misses for the song (without tile type) for easier aggregation
    // gameanalytics.GameAnalytics.addDesignEvent(`Song:Miss:${songName}`);
  },

  trackSongEnd: (songName, score, wasSuccessful) => {
    if (!initialized || !gameanalytics) return;

    // Use Complete status for successful completion, Fail status for failures
    const progressionStatus = wasSuccessful
      ? gameanalytics.EGAProgressionStatus.Complete
      : gameanalytics.EGAProgressionStatus.Fail;

    gameanalytics.GameAnalytics.addProgressionEvent(progressionStatus, "Song", songName, "", score);
  },

  // UI events
  trackUIEvent: (uiElement, action) => {
    if (!initialized || !gameanalytics) return;
    gameanalytics.GameAnalytics.addDesignEvent(`UI:${uiElement}:${action}`);
  },

  // Resource events
  trackResourceGain: (resourceType, amount, itemType, itemId) => {
    if (!initialized || !gameanalytics) return;
    gameanalytics.GameAnalytics.addResourceEvent(
      gameanalytics.EGAResourceFlowType.Source,
      resourceType,
      amount,
      itemType,
      itemId
    );
  },

  trackResourceUse: (resourceType, amount, itemType, itemId) => {
    if (!initialized || !gameanalytics) return;
    gameanalytics.GameAnalytics.addResourceEvent(
      gameanalytics.EGAResourceFlowType.Sink,
      resourceType,
      amount,
      itemType,
      itemId
    );
  },

  // Custom events
  trackCustomEvent: (eventCategory, eventAction, value = null) => {
    if (!initialized || !gameanalytics) return;
    const eventId = `${eventCategory}:${eventAction}`;
    gameanalytics.GameAnalytics.addDesignEvent(eventId, value);
  },

  // FTUE events (First Time User Experience)
  trackFTUEStep: (stepName, isComplete = false) => {
    if (!initialized || !gameanalytics) return;
    const eventId = isComplete ? `FTUE:Complete:${stepName}` : `FTUE:Start:${stepName}`;
    gameanalytics.GameAnalytics.addDesignEvent(eventId);
  },

  // Add this to your AnalyticsService object
  trackFTUEFail: (stepName) => {
    if (!initialized || !gameanalytics) return;
    // Track the basic fail event
    const eventId = `FTUE:Fail:${stepName}`;
    gameanalytics.GameAnalytics.addDesignEvent(eventId);
  },

  trackFTUETileMiss: (tileType, attemptCount = null) => {
    if (!initialized || !gameanalytics) return;

    // Always track with tile type since it's available
    const eventId = `FTUE:TileMiss:${tileType}`;

    // If attempt count is provided, include it as a value
    if (attemptCount !== null) {
      gameanalytics.GameAnalytics.addDesignEvent(eventId, attemptCount);
    } else {
      gameanalytics.GameAnalytics.addDesignEvent(eventId);
    }

    // // Also track aggregated miss events for the tutorial step
    // const stepEventId = `FTUE:TileMiss:${stepName}`;
    // gameanalytics.GameAnalytics.addDesignEvent(stepEventId);
  },
};

// // Auto-initialize on client side
// if (typeof window !== "undefined") {
//   // Wait for next tick to ensure window is fully available
//   setTimeout(() => {
//     AnalyticsService.init();
//   }, 0);
// }

// utils/analytics.js

const ANALYTICS_ENDPOINT = "https://api.usiku.games/analytics/"; // Adjust this to match your Django URL

export const logAnalytics = async (sessionId, eventId) => {
  try {
    // Get or create persistent user ID for debugging session issues
    let persistentId = localStorage.getItem("persistentUserId");
    if (!persistentId) {
      persistentId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("persistentUserId", persistentId);
    }

    // console.log(`sending event ${eventId}`);
    await axios.post(ANALYTICS_ENDPOINT, {
      sessionId,
      eventId,
      persistentId,
    });
  } catch (error) {
    // Silently fail - analytics shouldn't break the game
    console.warn("Analytics logging failed:", error);
  }
};

// New function that auto-gets sessionId
export const logAnalyticsEvent = async (eventId, customSessionId = null) => {
  try {
    const sessionId = customSessionId || sessionStorage.getItem("sessionId");

    if (!sessionId) {
      console.warn("No session ID found for analytics");
      return;
    }

    return logAnalytics(sessionId, eventId);
  } catch (error) {
    console.warn("Analytics logging failed:", error);
  }
};

// Usage examples:
// logAnalytics('user123', 'game_started');
// logAnalytics('user123', 'level_completed');
// logAnalytics('user123', 'song_played');
