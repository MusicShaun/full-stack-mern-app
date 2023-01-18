import axios from "axios";
import { loginUser } from "../features/loginSlice";
import { loadingState } from "../features/loaderSlice";
import { changeLoggedInOrOut } from "../features/loggedInOrOutSlice";




type RegisterProps = {
  firstName: FormDataEntryValue;
  lastName: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue; 
}

export const registerUser = ({ firstName, lastName, email, password }: RegisterProps) => async (dispatch: any) => {
  try {
    const {data} = await axios.post('/api/users/signup', { 
      firstName,
      lastName,
      email,
      password,
      passwordChangedAt: Date.now()
      } 
    );
    dispatch(loginUser({ ...data, isUserLoggedIn: true }))
    dispatch(changeLoggedInOrOut({ isLoggedIn: true }))
    localStorage.setItem('userInfo', JSON.stringify({ ...data, isUserLoggedIn: true }))
  } catch (error: any) {
    console.log(error.message)
  }
}






type LoginProps = {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
}

export  const login = ({email, password}: LoginProps ) => async (dispatch: any) => { 
  try {
    const { data } = await axios.post('/api/users/login', 
      {
        email,
        password
      }
    );
    dispatch(loginUser({ ...data, isUserLoggedIn: true }))
    dispatch(changeLoggedInOrOut({ isLoggedIn: true }))
    localStorage.setItem('userInfo', JSON.stringify({ ...data, isUserLoggedIn: true }))

  } catch (error: any) {
      console.log(error.response.data.message)
      alert("Invalid email or password")
  }
};





type UpdateUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string; 
  profilePicture?: string;
}
export const updateUser = ( { firstName,lastName, email, password, profilePicture} : UpdateUser) => async (dispatch: any) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo') ||  '{}');
  dispatch(loadingState({ booly: true, message: '' }))
    
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token ? userInfo.token  : userInfo.data.token }`,
        },
      };
      const { data } = await axios.patch(`/api/users/${userInfo.id}`, {
        firstName,
        lastName,
        email,
        password,
        profilePicture
      }, config)

      dispatch(loadingState({booly:false, message: "Details updated successfully!"}))
      dispatch(loginUser({...data, isUserLoggedIn: true}))
      localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, ...data.data}))

    } catch (error: any) {
      console.log(error.response)
      dispatch(loadingState({booly: false, message: error.response}))
    } 
}
    



