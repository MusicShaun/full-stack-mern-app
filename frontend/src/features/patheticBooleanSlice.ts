import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  value: false,
}

const patheticBooleanSlice = createSlice({
  name: 'patheticBoolean', 
  initialState,
  reducers: {
    falseBoolean: (state) => {
      state.value = false; 
    },
    trueBoolean: (state) => {
      state.value = true; 
    },
  },
})

export const { trueBoolean,falseBoolean } = patheticBooleanSlice.actions; 

export default patheticBooleanSlice.reducer; 