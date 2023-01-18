import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import loginUserState from "../features/loginSlice";
import registerState from '../features/registerSlice';
import postState from '../features/postSlice';
import getWallPostState from '../features/wallPostsSlice';
import updateUserState from '../features/updateUserSlice';
import booleanPopUpWindow from '../features/booleanPopUpWindowSlice';
import showUpdateSlice from '../features/showUpdateSlice';
import loadingState from '../features/loaderSlice';
import getDraftPostsState from '../features/draftPostsSlice';
import profileBlogState from '../features/profileBlogSlice';
import userProfilePicture from '../features/userProfilePictureSlice';
import loggedInOrOut from '../features/loggedInOrOutSlice'


const rootReducer = combineReducers({ 
  loginUserState: loginUserState,
  registerState: registerState,
  postState: postState,
  getWallPostState: getWallPostState, 
  getDraftPostsState: getDraftPostsState,
  updateUserState: updateUserState, 
  booleanPopUpWindow: booleanPopUpWindow,
  showUpdateSlice: showUpdateSlice,
  loadingState: loadingState,
  profileBlogState: profileBlogState,
  userProfilePicture: userProfilePicture,
  loggedInOrOut:loggedInOrOut,
})


export const store = configureStore({
  reducer: rootReducer,

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


