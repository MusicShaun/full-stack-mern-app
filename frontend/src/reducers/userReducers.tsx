import { AnyAction } from "@reduxjs/toolkit";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from "../constants/userConstants";

type IProps = {
  state: object;
  action: AnyAction; 
}

export const userLoginReducer = ( {state=[], action}: IProps ) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: 
      return { loading: true } 
    break;

    case USER_LOGIN_SUCCESS: 
    return { loading: false, userInfo: action.payload }
    break;

    case USER_LOGIN_FAIL: 
    return { loading: false, userInfo: action.payload }
    break;

    case USER_LOGOUT: 
    return { }
    break;

    default : return state;
  }
}