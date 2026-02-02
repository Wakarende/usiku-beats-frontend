// Load auth info from local storage
let access, refresh, user_data;

if (typeof window !== "undefined") {
    // Access localStorage only in the browser
    access = localStorage.getItem("access");
    refresh = localStorage.getItem("refresh");
    user_data = localStorage.getItem("user_data");
    if (user_data !== null) {
        user_data = JSON.parse(user_data);
    }
} else {
    // Set defaults for server-side execution
    access = null;
    refresh = null;
    user_data = null;
}


const initialState = {
  isAuthenticated: access && refresh && user_data ? true : false,
  access: access || null,
  refresh: refresh || null,
  user_data: user_data || null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        access: action.payload.access,
        refresh: action.payload.refresh,
        user_data: action.payload.user_data,
      };

      case "UPDATE_USER":
        return {
          ...state,
          user_data: action.payload.user_data,
        };

    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        access: action.payload.access,
        refresh: action.payload.refresh,
        user_data: action.payload.user_data,
      };
    case "SIGNUP_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };

    case "LOGOUT":
      // Clear auth tokens only, preserve user_data for local progress
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
