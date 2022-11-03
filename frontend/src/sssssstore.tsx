import { combineReducers, applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import  thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './reducers/userReducers';


const initialState = {}

const middleware = [ thunk ];

const store = configureStore({

  reducer: combineReducers({
    userLogin: userLoginReducer,
  })
  
});

export default store;