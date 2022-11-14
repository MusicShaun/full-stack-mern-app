import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  value: false,
}

const showUpdaterSlice = createSlice({
  name: 'showUpdaterSlice', 
  initialState,
  reducers: {
    showUpdateFalse: (state) => {
      state.value = false; 
    },
    showUpdateTrue: (state) => {
      state.value = true; 
    },
  },
})

export const { showUpdateFalse, showUpdateTrue } = showUpdaterSlice.actions; 

export default showUpdaterSlice.reducer; 