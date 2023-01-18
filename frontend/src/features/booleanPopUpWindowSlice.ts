import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Thing {
  value: boolean;
}

const initialState: Thing = {
  value: false,
}

const booleanPopUpWindowSlice = createSlice({
  name: 'booleanPopUpWindow', 
  initialState,
  reducers: {
    booleanPopUpWindow: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
  },
})

export const { booleanPopUpWindow } = booleanPopUpWindowSlice.actions; 

export default booleanPopUpWindowSlice.reducer; 