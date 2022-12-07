import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WallType {
  value: object[];
}
const initialState : WallType = {
  value: [],
}

export const wallPostSlice = createSlice({
  name: 'wallPostState',
  initialState,
  reducers: {
    getWallPosts: (state, action: PayloadAction<any>) => {
      state.value = [...action.payload]
    },
    deleteWallPosts: (state) => {
      state.value = [{}];
    },
  }
})

export const { getWallPosts, deleteWallPosts } = wallPostSlice.actions;
export default wallPostSlice.reducer;