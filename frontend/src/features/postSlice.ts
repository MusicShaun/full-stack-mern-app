import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Poster {
  value: PostType[];
}
interface PostType {
  tag: FormDataEntryValue;
  tag2: FormDataEntryValue;
  header:  FormDataEntryValue;
  body:  FormDataEntryValue;
  firstName:  string;
  lastName: string;
  isDraft: boolean;
  profilePicture?: string; 
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