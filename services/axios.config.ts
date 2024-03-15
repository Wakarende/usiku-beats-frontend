import axios from "axios";
// import { BASE_URL } from "./config";


const BASE_URL = "https://api.usiku.games/"

export const instance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("access");

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Simply return the response in case of success.
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;

    if (originalRequest.url.includes("token/refresh")) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      const refreshToken = localStorage.getItem("refresh");

      try {
        const { data } = await instance.post("token/refresh/", {
          refresh: refreshToken,
        });

        localStorage.setItem("access", data.access);
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
        return instance(originalRequest);
      } catch (err) {
        console.log(err);
        // localStorage.clear();
        console.log('error after retry with refresh token')

        // window.location.href = "/login";
      }
    }

    if (error.response.status === 429) {
      alert("You've made too many requests. Please wait a while before trying again.");
    }

    // New block to handle 503 errors
    if (error.response.status === 503 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as being retried
      
      // Set a delay before retrying the request
      const retryDelay = 5000; // 2000 milliseconds delay or change as required
      
      // Retry the request after a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(instance(originalRequest));
        }, retryDelay);
      });
    }

    // If the error is due to other reasons, just reject the promise.
    return Promise.reject(error);
  }
);
