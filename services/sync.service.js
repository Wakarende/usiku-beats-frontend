import axios from "axios";
import { BASE_URL } from "./config";

/**
 * Transforms local user_data format to the sync API payload format
 */
function buildSyncPayload(userData) {
  const player = userData?.profile?.player;
  if (!player) return null;

  const payload = {
    player: {
      level: player.level || 1,
      total_discs: player.total_discs || 0,
      total_gems: player.total_gems || 0,
      total_stars: player.total_stars || 0,
    },
    player_song_instances: [],
  };

  if (player.player_song_instances && Array.isArray(player.player_song_instances)) {
    payload.player_song_instances = player.player_song_instances.map((instance) => ({
      song_id: instance.song?.id || instance.song_id,
      high_score: instance.high_score || 0,
      no_of_plays: instance.no_of_plays || 0,
      favourited: instance.favourited || false,
      unlocked: instance.unlocked || false,
      unlock_time: instance.unlock_time || null,
      unlock_start_time: instance.unlock_start_time || null,
      unlock_duration_sec: instance.unlock_duration_sec || null,
      unlock_completed_at: instance.unlock_completed_at || null,
      maximum_progress: instance.maximum_progress || 0,
      paid_for_flag: instance.paid_for_flag || false,
      date_added: instance.date_added || null,
    }));
  }

  return payload;
}

/**
 * Syncs local player data to the server
 * @param {string} accessToken - JWT access token
 * @param {object} userData - Local user_data object from localStorage
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export async function syncPlayerData(accessToken, userData) {
  if (!accessToken) {
    return { success: false, error: "No access token" };
  }

  const payload = buildSyncPayload(userData);
  if (!payload) {
    return { success: false, error: "Invalid user data" };
  }

  try {
    const response = await axios.post(`${BASE_URL}player/sync/`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data?.profile) {
      return { success: true, data: response.data };
    }

    return { success: false, error: "Invalid response from server" };
  } catch (error) {
    console.error("Sync failed:", error?.response?.data || error.message);
    return {
      success: false,
      error: error?.response?.data?.detail || error.message || "Sync failed",
    };
  }
}

/**
 * Fetches fresh player data from the server WITHOUT pushing local state.
 * Use this after payments/webhooks to avoid overwriting server-side balance updates.
 * @param {string} accessToken - JWT access token
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export async function fetchPlayerData(accessToken) {
  if (!accessToken) {
    return { success: false, error: "No access token" };
  }

  try {
    const response = await axios.get(`${BASE_URL}player/profile/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data?.profile) {
      return { success: true, data: response.data };
    }

    return { success: false, error: "Invalid response from server" };
  } catch (error) {
    console.error("Fetch player data failed:", error?.response?.data || error.message);
    return {
      success: false,
      error: error?.response?.data?.detail || error.message || "Fetch failed",
    };
  }
}

/**
 * Syncs player data using localStorage values
 * Call this from Phaser scenes or anywhere without direct access to Redux
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export async function syncFromLocalStorage() {
  const accessToken = localStorage.getItem("access");
  const userDataRaw = localStorage.getItem("user_data");

  if (!accessToken || !userDataRaw) {
    return { success: false, error: "Not logged in" };
  }

  try {
    const userData = JSON.parse(userDataRaw);
    const result = await syncPlayerData(accessToken, userData);

    // Update localStorage with server response if sync succeeded
    if (result.success && result.data) {
      const updatedUserData = { profile: result.data.profile };
      localStorage.setItem("user_data", JSON.stringify(updatedUserData));
    }

    return result;
  } catch (e) {
    return { success: false, error: "Failed to parse user data" };
  }
}
