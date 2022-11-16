import { createSlice , PayloadAction} from "@reduxjs/toolkit";


interface Register {
  value: Registering[];
}
interface Registering {
  firstName: string;
  lastName: string; 
  email: string;
  password: string;
}
const initialState: Register = {
  value: [],
}


export const registerSlice = createSlice({
  name: 'registerState', 
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<Registering>) => {
      state.value.push(action.payload);
    },
    deleteRegisterUser: (state) => {
      state.value.splice(0, 1)
    },
  },
})



export const { registerUser,  deleteRegisterUser} = registerSlice.actions; 


export default registerSlice.reducer; 