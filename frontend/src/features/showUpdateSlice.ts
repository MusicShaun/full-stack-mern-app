import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Thing {
  bool: boolean;
  counter : number; 
}
interface ValueThing {
  value: Thing;
}

const initialState: ValueThing = {
  value: {bool: false, counter: 0},
}

const showUpdaterSlice = createSlice({
  name: 'showUpdaterSlice', 
  initialState,
  reducers: {
    showUpdateFalse: (state) => {
      state.value = {bool: false, counter: 0}; 
    },
    showUpdateTrue: (state, action: PayloadAction<number>) => {
      state.value = {bool: true, counter: action.payload}; 
    },
  },
})

export const { showUpdateFalse, showUpdateTrue } = showUpdaterSlice.actions; 

export default showUpdaterSlice.reducer; 