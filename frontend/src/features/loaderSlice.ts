import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface second {
  booly: boolean;
  message: string; 
}

const initialState = {
  value: {
    booly: false,
    message: ''
  },
}

export const loaderSlice = createSlice({
  name: 'loadingState',
  initialState,
  reducers: {
    loadingState: (state, action: PayloadAction<second>) => {
      state.value = {...action.payload}
    },
  }
})

export const { loadingState } = loaderSlice.actions; 

export default loaderSlice.reducer; 