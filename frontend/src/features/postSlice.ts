import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Poster {
  value: PostType[];
}
interface PostType {
  tag: string;
  tag2: string;
  header: string;
  body: string;
  firstName: string;
  lastName: string;
}
const initialState: Poster = {
  value: [],
}

const postSlice = createSlice({
  name: 'postState',
  initialState,
  reducers: {
    postBlog: (state, action: PayloadAction<PostType>) => {
      state.value.push(action.payload);
    },
  },
})


export const { postBlog } = postSlice.actions;

export default postSlice.reducer; 