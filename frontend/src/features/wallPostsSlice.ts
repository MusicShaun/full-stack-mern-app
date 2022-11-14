import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WallType {
  value: any[];
}
// interface TheThings {
//   data: any  
// }
const initialState : WallType = {
  value: [],
}

export const wallPostSlice = createSlice({
  name: 'wallPostState',
  initialState,
  reducers: {
    getWallPosts: (state, action: PayloadAction<any>) => {
      state.value.push(action.payload)
    },
    deleteWallPosts: (state) => {
      state.value.splice(0, state.value.length)
    },
  }
})

export const { getWallPosts, deleteWallPosts } = wallPostSlice.actions;
export default wallPostSlice.reducer;