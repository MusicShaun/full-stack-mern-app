import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WallType {
  value: object[];
}
const initialState : WallType = {
  value: [],
}

export const profileBlogSlice = createSlice({
  name: 'profileBlogState',
  initialState,
  reducers: {
    getProfileBlogs: (state, action: PayloadAction<any>) => {
      state.value = [...action.payload]
    },
    deleteProfileBlogs: (state) => {
      state.value = [{}];
    },
  }
})

export const { getProfileBlogs, deleteProfileBlogs } = profileBlogSlice.actions;
export default profileBlogSlice.reducer;