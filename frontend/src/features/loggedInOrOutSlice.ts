import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  value: IProps
}
interface IProps {
  isLoggedIn: boolean;
}
const initialState: IState = {
  value: {
    isLoggedIn: false,
  }
}

const loggedInOrOutSlice = createSlice({
  name: 'loggedInOrOut',
  initialState,
  reducers: {
    changeLoggedInOrOut: (state, action: PayloadAction<IProps>) => {
      state.value = {...action.payload }
    },
  }
})

export const { changeLoggedInOrOut } = loggedInOrOutSlice.actions; 

export default loggedInOrOutSlice.reducer; 