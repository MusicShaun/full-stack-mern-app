import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoggedIn {
  value: boolean;
}
const initialState : LoggedIn = {
  value: false,
}

export const loggedInSlice = createSlice({
  name: 'loggedInState',
  initialState,
  reducers: {
    logInUser: (state: LoggedIn) => {
      state.value = true; 
    },
    logOutUser: (state) => {
      state.value = false;
    },
  },
})

export const { logInUser, logOutUser } = loggedInSlice.actions; 
export default loggedInSlice.reducer;
