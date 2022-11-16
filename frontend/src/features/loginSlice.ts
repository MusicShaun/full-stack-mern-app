import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Login {
  value: LoginState[];
}
interface LoginState {
  firstName?: string;
  lastName?: string;
  email: string; 
  password: string; 
  
}
const initialState: Login = {
  value: [],
}

export const loginSlice = createSlice({
  name: 'loginUserState',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginState>) => {
      state.value.push(action.payload)
    },
    deleteUser: (state) => {
      state.value.splice(0, 1)
    },
  }
})

export const { loginUser, deleteUser } = loginSlice.actions; 

export default loginSlice.reducer; 