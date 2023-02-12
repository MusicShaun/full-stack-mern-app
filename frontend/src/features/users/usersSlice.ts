import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

const userStorage = JSON.parse(localStorage.getItem('userInfo') || '{}')


function config(token: string | undefined){ 
  return {headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token ? token : ''}`,
  }}
} 

export interface UserType { //* what is the initial state for registerers or login peeps. 
  _id?: string,
  firstName?: string,
  lastName?: string,
  email: string,
  password?: string,
  profilePicture?: string,
  token?: string,

  //passwordChangedAt is added at the server side
}
const user: UserType = {
  _id: userStorage._id || '',
  firstName: userStorage.firstName || '',
  lastName: userStorage.lastName || '',
  email:  userStorage.email || '',
  password: '',
  profilePicture:  userStorage.profilePicture || '',
  token: userStorage.token || '',
}
interface ISType {
  user: UserType,
  status: string,
  message: string, 
  error: string | null
}
const initialState: ISType = {
  user,
  status: 'idle',
  message: '',
  error: null
}

export const loginUser = createAsyncThunk('/users/login', async (initialPost: UserType) => {
  const { data } = await axios.post(`/api/users/login`, initialPost)
  return data
})
export const registerUser = createAsyncThunk('/users/register', async (initialPost: UserType) => {
  const { data } = await axios.post(`/api/users/signup`, initialPost)
  return data
})
export const updateUser = createAsyncThunk('/users/updateUser', async (initialPost: UserType) => {
  const { _id, token, ...rest } = initialPost
  const { data } = await axios.put(`/api/users/${_id}`, rest, config(token)) 
  localStorage.setItem('userInfo', JSON.stringify({...data.data, token}))
  return {...data.data, token}
})


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userStatusIdle: (state: any) => {
      state.status = 'idle'
    },  
  },

  extraReducers(builder)  {
    builder 
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserType>) => { //! we dont want the password coming
        state.status = 'succeeded'
        state.user = action.payload 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || ''
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.status = 'succeeded'
        state.user = action.payload 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || ''
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.message = 'Your details have been updated'
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || ''
      })
  }
})

export const selectUser = (state: RootState) => state.user.user
export const selectUserStatus = (state: RootState) => state.user.status
export const selectUserMessage = (state: RootState) => state.user.message
export const selectUserPicture = (state: RootState) => state.user.user.profilePicture

export const { userStatusIdle } = usersSlice.actions
export default usersSlice.reducer