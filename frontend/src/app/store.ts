import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import wallReducer from '../features/wall/wallSlice';
import searchBarReducer from '../features/searchBarSlice'
import userReducer from '../features/users/usersSlice'
import logger  from 'redux-logger';


const rootReducer = combineReducers({ 

  blogs: wallReducer,         
  searchBar: searchBarReducer, 
  user: userReducer, 

})


export const store = configureStore({

  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .prepend(//middleware if you have it 
    )
    // prepend and concat calls can be chained
    .concat(logger),

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


