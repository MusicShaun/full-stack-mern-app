import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface second {
  value: first[]; 
}
interface first { 
  booly: boolean;
  message: string; 
}
const initialState: second = {
  value: [],
}

export const loaderSlice = createSlice({
  name: 'loginUserState',
  initialState,
  reducers: {
    loaderTrue: (state, action: PayloadAction<first>) => {
      state.value.splice(0 , 1,  action.payload)
    },
  }
})

export const { loaderTrue } = loaderSlice.actions; 

export default loaderSlice.reducer; 