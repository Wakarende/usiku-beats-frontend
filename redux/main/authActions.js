import axios from "axios";
import { BASE_URL } from "../../services/config";
import { syncPlayerData } from "../../services/sync.service";

export const loginSuccess = (access, refresh, user_data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { access, refresh, user_data },
  };
};

export const loginFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const updateUser = (user_data) => {
  localStorage.removeItem("user_data");
  localStorage.setItem("user_data", JSON.stringify(user_data));

  return {
    type: "UPDATE_USER",
    payload: { user_data },
  };
};

// Update SongInstance

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}login/`, {
        email: email,
        password: password,
      });

      if (response.data.access) {
        // Login successful
        const { access, refresh } = response.data;
        const user_data = response.data.data;

        // Store tokens and user data in local storage
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("user_data", JSON.stringify(user_data));

        dispatch(loginSuccess(access, refresh, user_data));
      } else {
        dispatch(loginFailure("Invalid email or password"));
      }
    } catch (error) {
      dispatch(loginFailure("An unexpected error occurred"));
    }
  };
};

export const signUpSuccess = (access, refresh, user_data) => {
  return {
    type: "SIGNUP_SUCCESS",
    payload: { access, refresh, user_data },
  };
};

export const signUpFailure = (error) => {
  return {
    type: "SIGNUP_FAILURE",
    payload: error,
  };
};

export const googleSignIn = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}google-login/`, {
        access_token: accessToken,
      });

      if (response.data.access) {
        const { access, refresh } = response.data;
        const server_data = response.data.data;

        // Check if user has existing server data (existing user)
        const serverPlayer = server_data?.profile?.player;
        const hasServerData =
          serverPlayer?.player_song_instances?.length > 0 ||
          serverPlayer?.total_gems > 0 ||
          serverPlayer?.total_stars > 0 ||
          serverPlayer?.level > 1;

        let finalUserData;

        if (hasServerData) {
          // Existing user - server is source of truth
          finalUserData = server_data;
        } else {
          // New user - check for local guest data to migrate
          const existingRaw = localStorage.getItem("user_data");
          if (existingRaw) {
            const existing = JSON.parse(existingRaw);
            // Merge local progress with server identity
            const mergedData = {
              ...existing,
              profile: {
                ...existing.profile,
                id: server_data.profile.id,
                user: server_data.profile.user,
                google_id: server_data.profile.google_id,
              },
            };

            // Sync local guest data to server
            localStorage.setItem("access", access);
            const syncResult = await syncPlayerData(access, mergedData);
            if (syncResult.success && syncResult.data) {
              finalUserData = { profile: syncResult.data.profile };
            } else {
              finalUserData = mergedData;
            }
          } else {
            finalUserData = server_data;
          }
        }

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("user_data", JSON.stringify(finalUserData));

        dispatch(loginSuccess(access, refresh, finalUserData));
        return { success: true, data: response.data };
      } else {
        dispatch(loginFailure(response.data.error || "Google login failed"));
        return { success: false, error: response.data.error };
      }
    } catch (error) {
      dispatch(loginFailure("Google login failed"));
      return { success: false, error: "Google login failed" };
    }
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}signup/`, {
        email: email,
        password: password,
      });

      if (response.data.message === "User created successfully") {
        const { access, refresh } = response.data;
        const user_data = response.data.data;

        // Store tokens and user data in local storage
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("user_data", JSON.stringify(user_data));

        dispatch(signUpSuccess(access, refresh, user_data));
      } else {
        dispatch(signUpFailure("An unexpected error occurred"));
      }
    } catch (error) {
      dispatch(signUpFailure("An unexpected error occurred"));
    }
  };
};
