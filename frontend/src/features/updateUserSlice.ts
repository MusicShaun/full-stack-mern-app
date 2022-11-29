import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Updater {
  value: UpdateType[];
}
interface UpdateType {
  firstName: string;
  lastName: string; 
  email: string; 
  _id?: string; 
  password?: string; 
  profilePicture?: string; 
}
const initialState:Updater = {
  value: [],
}

const updateUserSlice = createSlice({
  name: 'updateUserState',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UpdateType>) => {
      state.value.push(action.payload);
    },
  }
})
export const { updateUser } = updateUserSlice.actions;

export default updateUserSlice.reducer; 