import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DraftType {
  value: object[];
}
const initialState : DraftType = {
  value: [],
}

export const draftPostsSlice = createSlice({
  name: 'wallPostState',
  initialState,
  reducers: {
    getDraftPosts: (state, action: PayloadAction<any>) => {
      state.value = {...action.payload}
    },
    deleteDraftPosts: (state) => {
      state.value = [{}];
    },
  }
})

export const { getDraftPosts, deleteDraftPosts } = draftPostsSlice.actions;
export default draftPostsSlice.reducer;