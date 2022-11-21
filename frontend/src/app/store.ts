import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginUserState from "../features/loginSlice";
import loggedInState from '../features/loggedInSlice';
import registerState from '../features/registerSlice';
import postState from '../features/postSlice';
import getWallPostState from '../features/wallPostsSlice';
import updateUserState from '../features/updateUserSlice';
import patheticBoolean from '../features/patheticBooleanSlice';
import showUpdateSlice from '../features/showUpdateSlice';
import loaderState from '../features/loaderSlice';
import getDraftPostsState from '../features/draftPostsSlice';

export const store = configureStore({
  reducer: {
    loginUserState: loginUserState,
    loggedInState: loggedInState, 
    registerState: registerState,
    postState: postState,
    getWallPostState: getWallPostState, 
    getDraftPostsState: getDraftPostsState,
    updateUserState: updateUserState, 
    patheticBoolean: patheticBoolean,
    showUpdateSlice: showUpdateSlice,
    loaderState: loaderState
  }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


