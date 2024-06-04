import { produce } from "immer";


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

interface MainState {
    user:any;

    isAuthenticated: boolean;
    user_data: any;
    access: any;
    refresh: any;

  }
  
  const initialState: MainState = {

    user : null,

    isAuthenticated: access && refresh && user_data ? true : false,
    user_data: user_data || null,
    access: access || null,
    refresh: refresh || null,
  };
  

  const mainReducer = (state = initialState, action: any): MainState => {
    switch (action.type) {
    
      case "SET_USER":

      return produce(state, draftState => {
        let element = action.payload;
        draftState.user = element;
      })  

      case "SET_AUTH":
        // console.log('HERE', action.payload);
        return { ...state, isAuthenticated: true, access: action.payload.access, refresh: action.payload.refresh, user_data: action.payload.data };
    
      default:
        return state;
    }
  };
  
  export default mainReducer;
  