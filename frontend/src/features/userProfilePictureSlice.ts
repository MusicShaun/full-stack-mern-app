import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WallType {
  value: object[];
}
const initialState : WallType = {
  value: [],
}

export const userProfilePictureSlice = createSlice({
  name: 'userProfilePicture',
  initialState,
  reducers: {
    getPictureState: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
    deletePicture: (state) => {
      state.value = [];
    },
  }
})

export const { getPictureState, deletePicture } = userProfilePictureSlice.actions;
export default userProfilePictureSlice.reducer;

