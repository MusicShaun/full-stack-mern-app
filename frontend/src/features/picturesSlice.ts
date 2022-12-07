import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WallType {
  value: object[];
}
const initialState : WallType = {
  value: [],
}

export const picturesSlice = createSlice({
  name: 'picturesState',
  initialState,
  reducers: {
    getPicturesState: (state, action: PayloadAction<any>) => {
      state.value = {...action.payload}
    },
    deletePictures: (state) => {
      state.value = [];
    },
  }
})

export const { getPicturesState, deletePictures } = picturesSlice.actions;
export default picturesSlice.reducer;

