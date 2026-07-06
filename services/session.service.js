import axios from "axios";
import { BASE_URL } from "./config";

/**
 * Decode the exp claim (seconds since epoch) from a JWT without verifying it.
 * Returns null if the token can't be decoded.
 */
export const getTokenExpiry = (token) => {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));
    return typeof decoded.exp === "number" ? decoded.exp : null;
  } catch (e) {
    return null;
  }
};

/**
 * A token is treated as expired if its exp is within `skewSeconds` from now,
 * or if it can't be decoded at all.
 */
export const isTokenExpired = (token, skewSeconds = 60) => {
  if (!token) return true;
  const exp = getTokenExpiry(token);
  if (exp === null) return true;
  return exp * 1000 <= Date.now() + skewSeconds * 1000;
};

/**
 * Validate the stored session on app load.
 *
 * Returns one of:
 *   "guest"     - no tokens stored, nothing to do
 *   "valid"     - access token still valid
 *   "refreshed" - access token was expired but silently renewed via the
 *                 refresh token; localStorage now holds the new access token
 *   "expired"   - both tokens are dead; the caller should log the user out
 *                 and prompt them to log in again
 */
export const checkAndRefreshSession = async () => {
  if (typeof window === "undefined") return "guest";

  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  if (!access && !refresh) return "guest";

  if (!isTokenExpired(access)) return "valid";

  if (isTokenExpired(refresh)) return "expired";

  try {
    const response = await axios.post(`${BASE_URL}token/refresh/`, {
      refresh: refresh,
    });

    if (response.data && response.data.access) {
      localStorage.setItem("access", response.data.access);
      // SimpleJWT only returns a new refresh token when rotation is enabled
      if (response.data.refresh) {
        localStorage.setItem("refresh", response.data.refresh);
      }
      return "refreshed";
    }
    return "expired";
  } catch (e) {
    // Refresh token rejected by the server (expired/blacklisted)
    if (e.response && (e.response.status === 401 || e.response.status === 400)) {
      return "expired";
    }
    // Network error: don't log the user out over a flaky connection
    return "valid";
  }
};
