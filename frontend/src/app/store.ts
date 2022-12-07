import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {  persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import { combineReducers } from 'redux'

import loginUserState from "../features/loginSlice";
import loggedInState from '../features/loggedInSlice';
import registerState from '../features/registerSlice';
import postState from '../features/postSlice';
import getWallPostState from '../features/wallPostsSlice';
import updateUserState from '../features/updateUserSlice';
import patheticBoolean from '../features/patheticBooleanSlice';
import showUpdateSlice from '../features/showUpdateSlice';
import loadingState from '../features/loaderSlice';
import getDraftPostsState from '../features/draftPostsSlice';
import profileBlogState from '../features/profileBlogSlice';
import picturesState from '../features/picturesSlice';
  
const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  loginUserState: loginUserState,
  loggedInState: loggedInState, 
  registerState: registerState,
  postState: postState,
  getWallPostState: getWallPostState, 
  getDraftPostsState: getDraftPostsState,
  updateUserState: updateUserState, 
  patheticBoolean: patheticBoolean,
  showUpdateSlice: showUpdateSlice,
  loadingState: loadingState,
  profileBlogState: profileBlogState,
  picturesState: picturesState,

})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


