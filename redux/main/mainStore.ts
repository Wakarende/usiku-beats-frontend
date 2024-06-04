import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainReducer';
import authReducer from './authReducer';
// import { createWrapper } from  "next-redux-wrapper";


const mainStore = configureStore({
  reducer: {
    auth : authReducer
    // mainReducer: mainReducer,
  },
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;

export default mainStore;
