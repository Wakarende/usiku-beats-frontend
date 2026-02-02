import axios from "axios";
import { BASE_URL } from "../../services/config";

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

        // Preserve existing local user data (gems, songs, etc.) if present
        const existingRaw = localStorage.getItem("user_data");
        let user_data;
        if (existingRaw) {
          const existing = JSON.parse(existingRaw);
          // Keep local player progress, just update profile identity
          user_data = {
            ...existing,
            profile: {
              ...existing.profile,
              id: server_data.profile.id,
              user: server_data.profile.user,
              google_id: server_data.profile.google_id,
            },
          };
        } else {
          user_data = server_data;
        }

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("user_data", JSON.stringify(user_data));

        dispatch(loginSuccess(access, refresh, user_data));
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
