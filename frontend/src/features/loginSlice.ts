import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Login {
  value: LoginState;
}
interface LoginState {
  firstName?: string;
  lastName?: string;
  email: string; 
  password: string; 
  // isUserLoggedIn: boolean;
  
}
const initialState: Login = {
  value: {
    firstName: '',
    lastName:'' ,
    email: '',
    password: '',
    // isUserLoggedIn: false
  },
}

export const loginSlice = createSlice({
  name: 'loginUserState',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginState>) => {
      state.value = {...state.value, ...action.payload }
    },
  }
})

export const { loginUser } = loginSlice.actions; 

export default loginSlice.reducer; 