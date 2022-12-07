import { USER_LOGIN_FAIL} from "../constants/userConstants";
import axios from "axios";
import { loggedIn } from "../features/loggedInSlice";
import { deleteUser, loginUser } from "../features/loginSlice";
import { deleteRegisterUser } from "../features/registerSlice";
import { loadingState } from "../features/loaderSlice";




type RegisterProps = {
  firstName: FormDataEntryValue;
  lastName: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue; 
}

export const registerUser = ( {firstName, lastName, email, password } : RegisterProps) => async (dispatch: any)  => {
  console.log('user Registering')
  try {
    const data = await axios.post('/api/users', { //api/users
      firstName,
      lastName,
      email,
      password 
      } 
    );
    dispatch(deleteRegisterUser()) /// remove any old content
    dispatch(loginUser(data.data)) // renew login information for the app to use
    dispatch(loggedIn()) // set logged in state for header
    localStorage.setItem("userInfo", JSON.stringify(data.data))

  } catch (error: any) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: 
      error.response && error.response.data.message
      ? error.response.data.message 
      : error.message, 
    })
  } finally {
  }
}






type LoginProps = {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
}

export  const login = ({email, password}: LoginProps ) => async (dispatch: any) => { 
  
  try {
    const { data } = await axios.post(
      '/api/users/login', //api/login
      {
        email,
        password
      }
    );
    dispatch(deleteUser()) // empty the state 
    dispatch(loginUser(data))// includes first and last name
    dispatch(loggedIn())
    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error: any) {
      console.log(error.response.data.message)
      console.log(error)
      alert("Invalid email or password")
  }
};





  type UpdateUser = {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
    password: string; 
  }
  export const updateUser = ( { firstName,lastName, email, _id, password} : UpdateUser) => async (dispatch: any) => {
    console.log('useractions')
    let userInfo = JSON.parse(localStorage.getItem('userInfo') ||  '{}');
    dispatch(loadingState({booly:true, message: ''}))
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token ? userInfo.token  : userInfo.data.token }`,
          },
        };
        const {data} = await axios.post(
          '/api/users/profile', {
          firstName,
          lastName,
          email,
          _id, 
          password,
        }, config );
        dispatch(loadingState({booly:false, message: "Details updated successfully!"}))
        dispatch(deleteUser()) 
        dispatch(loginUser(data))// includes first and last name
        localStorage.setItem("userInfo", JSON.stringify(data))
      } catch (error: any) {
        console.log(error.response.data.message)
        dispatch(loadingState({booly: false, message: error.response.data.message}))
      } 
  }
    
