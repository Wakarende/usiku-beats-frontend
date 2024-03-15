import { produce } from "immer";


// const access = localStorage.getItem("access");
// const refresh = localStorage.getItem("refresh");
// let user = localStorage.getItem("user");
// if (user !== null) {
//     user = JSON.parse(user);
// }

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
    filterTag: string;
    rubrics:any[];
    allGames : object;
    game:any;
    user:any;
    pageOrigin : any;
    trialDuration:number;
    pack30dDuration:number;

    isAuthenticated: boolean;
    user_data: any;
    access: any;
    refresh: any;

  }
  
  const initialState: MainState = {
    filterTag: "All",
    rubrics : [],
    allGames : {},
    game : {},
    user : null,
    pageOrigin : null,
    trialDuration:2,
    pack30dDuration:720,

    isAuthenticated: access && refresh && user_data ? true : false,
    user_data: user_data || null,
    access: access || null,
    refresh: refresh || null,
  };
  
  export enum MainActionTypes {
    SET_FILTER_TAG = "SET_FILTER_TAG",
    SET_RUBRICS = "SET_RUBRICS",
    SET_ALL_GAMES = "SET_ALL_GAMES",
    SET_GAME = "SET_GAME",
    SET_USER = "SET_USER",
    SET_AUTH = "SET_AUTH",
    SET_PAGE_ORIGIN = "SET_PAGE_ORIGIN",
    
    SET_TRIAL_DURATION = "SET_TRIAL_DURATION",
    SET_PACK30D_DURATION = "SET_PACK30D_DURATION",
  }

  
  const mainReducer = (state = initialState, action: any): MainState => {
    switch (action.type) {
      
      case MainActionTypes.SET_FILTER_TAG:
        return { ...state, filterTag: action.payload };
      
      case MainActionTypes.SET_RUBRICS:
        return { ...state, rubrics: action.payload };
        
      case MainActionTypes.SET_ALL_GAMES:
          var key = action.payload.key;
          var games = action.payload.games;
          var allGames = {...state.allGames};
          
          allGames[key] = games;

          return { ...state, allGames: allGames };
      
          
      case MainActionTypes.SET_GAME:
        return { ...state, game: action.payload };
    
        
      case MainActionTypes.SET_USER:

      return produce(state, draftState => {

        let element = action.payload;

       
        draftState.user = element;

      
      })  

      case MainActionTypes.SET_AUTH:
        // console.log('HERE', action.payload);
        

        return { ...state, isAuthenticated: true, access: action.payload.access, refresh: action.payload.refresh, user_data: action.payload.data };
    
      
      case MainActionTypes.SET_PAGE_ORIGIN:
        return { ...state, pageOrigin: action.payload };
            
      case MainActionTypes.SET_TRIAL_DURATION:
        return { ...state, trialDuration: action.payload };

      case MainActionTypes.SET_PACK30D_DURATION:
        return { ...state, pack30dDuration: action.payload };


      default:
        return state;
    }
  };
  
  export default mainReducer;
  