import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WallType {
  value: TheThings[];
}
interface TheThings {
  data: object
}
const initialState : WallType = {
  value: [],
}

export const wallPostSlice = createSlice({
  name: 'wallPostState',
  initialState,
  reducers: {
    getWallPosts: (state, action: PayloadAction<TheThings>) => {
      state.value.push(action.payload)
    },
    deleteWallPosts: (state) => {
      state.value.splice(0, state.value.length)
    },
  }
})

export const { getWallPosts, deleteWallPosts } = wallPostSlice.actions;
export default wallPostSlice.reducer;