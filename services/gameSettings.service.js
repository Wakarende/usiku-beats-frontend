import { instance as axios } from "./axios.config";

export const DEFAULT_DISCS_TRACK_UNLOCK_COST = 30;
export const DEFAULT_GEMS_INITIAL = 150;
export const DEFAULT_GEMS_AD_REWARD = 20;
export const DEFAULT_GEMS_FASTTRACK_UNLOCK_SONG_COST = 20;
const SETTINGS_ENDPOINT = "game-settings/";

function getActiveSettingByKey(settings, key) {
  if (!Array.isArray(settings)) return null;

  const now = new Date();
  const activeSettings = settings.filter((item) => {
    if (!item || item.key !== key) return false;

    const startsAt = item.effective_from ? new Date(item.effective_from) : null;
    const endsAt = item.effective_to ? new Date(item.effective_to) : null;

    const started = !startsAt || startsAt <= now;
    const notExpired = !endsAt || endsAt > now;

    return started && notExpired;
  });

  if (activeSettings.length === 0) return null;

  return activeSettings.sort((a, b) => {
    const aStart = a.effective_from ? new Date(a.effective_from).getTime() : 0;
    const bStart = b.effective_from ? new Date(b.effective_from).getTime() : 0;
    return bStart - aStart;
  })[0];
}

function parseNumericSetting(settingValue, fallbackValue) {
  const parsed = Number(settingValue);
  return Number.isFinite(parsed) ? parsed : fallbackValue;
}

async function getNumericGameSetting(key, fallbackValue) {
  try {
    const response = await axios.get(SETTINGS_ENDPOINT);
    const settings = response?.data;

    const setting = getActiveSettingByKey(settings, key);

    return parseNumericSetting(setting?.value, fallbackValue);
  } catch (error) {
    console.error("Failed to fetch game settings:", error);
    return fallbackValue;
  }
}

export async function getDiscsTrackUnlockCost() {
  return getNumericGameSetting(
    "discs_track_unlock_cost",
    DEFAULT_DISCS_TRACK_UNLOCK_COST
  );
}

export async function getInitialGems() {
  return getNumericGameSetting("gems_initial", DEFAULT_GEMS_INITIAL);
}

export async function getGemsAdReward() {
  return getNumericGameSetting("gems_ad_reward", DEFAULT_GEMS_AD_REWARD);
}

export async function getGemsFasttrackUnlockSongCost() {
  return getNumericGameSetting(
    "gems_fasttrack_unlock_song_cost",
    DEFAULT_GEMS_FASTTRACK_UNLOCK_SONG_COST
  );
}
