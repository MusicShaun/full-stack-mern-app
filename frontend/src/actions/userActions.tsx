import { USER_LOGIN_FAIL} from "../constants/userConstants";
import axios from "axios";
import { loggedIn } from "../features/loggedInSlice";
import { deleteUser, loginUser } from "../features/loginSlice";
import { deleteRegisterUser } from "../features/registerSlice";
import { loaderTrue } from "../features/loaderSlice";
import { trueBoolean } from "../features/patheticBooleanSlice";




type RegisterProps = {
  firstName: FormDataEntryValue;
  lastName: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue; 
}

export const registerUser = ( {firstName, lastName, email, password } : RegisterProps) => async (dispatch: any)  => {

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
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: 
        error.response && error.response.data.message
        ? error.response.data.message 
        : error.message, 
      })
    }
  };






type MakePost = {
  tag: FormDataEntryValue;
  tag2: FormDataEntryValue;
  header:  FormDataEntryValue;
  body:  FormDataEntryValue;
  firstName:  string;
  lastName:  string;
}
export const postBlog = ( { tag,tag2,header,body,firstName,lastName} : MakePost) => async (dispatch: any) => {

  dispatch(loaderTrue({booly:true, message: ''}))

  let userInfo = JSON.parse(localStorage.getItem('userInfo') ||  '{}');
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token ? userInfo.token  : userInfo.data.token }`,
        },
      };
  // eslint-disable-next-line 
      const {data} = await axios.post(
        '/api/bloggers/create', {
        tag,
        tag2,
        header,
        body,
        firstName,
        lastName
      }, config );
        dispatch(loaderTrue({booly:false, message: "Blog has posted successfully!"}))
    } catch (error: any) {
        dispatch(loaderTrue({booly: false, message: error.response.data.message}))
        alert('Something happened that wasn\'t supposed to. Please have another go.')
    } 
  }
  

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
    dispatch(loaderTrue({booly:true, message: ''}))

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
          password
        }, config );
        dispatch(loaderTrue({booly:false, message: "Details updated successfully!"}))
        dispatch(deleteUser()) 
        dispatch(loginUser(data))// includes first and last name
        localStorage.setItem("userInfo", JSON.stringify(data))
      } catch (error: any) {
        console.log(error.response.data.message)
        dispatch(loaderTrue({booly: false, message: error.response.data.message}))
      } 
  }
    

  type UpdateBlog = {
    id: number;
    tag: string;
    tag2: string;
    header: string;
    body: string;
  }
  export const updateBlog = ( {id, tag,tag2, header, body} : UpdateBlog) => async (dispatch: any) => {
    console.log('updateuser engaged')
    dispatch(loaderTrue({booly:true, message: ''}))
    let userInfo = JSON.parse(localStorage.getItem('userInfo') ||  '{}');

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token ? userInfo.token  : userInfo.data.token }`,
        },
      };
  // eslint-disable-next-line 
      const {data} = await axios.put(
        `/api/bloggers/${id}`, {
        tag,
        tag2,
        header,
        body,
      }, config );
      dispatch(loaderTrue({booly:false, message: "Blog updated successfully!"}))
      dispatch(trueBoolean())
    } catch (error: any) {
      console.log(error.response.data.message)
      dispatch(loaderTrue({booly: false, message: error.response.data.message}))
      dispatch(trueBoolean())
    }
  }



  export const deleteBlog = ( id: any) => async (dispatch: any) => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo') ||  '{}');
    console.log('Deleting Post')
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token ? userInfo.token  : userInfo.data.token }`,
        },
      };// eslint-disable-next-line 
      const {data} = await axios.delete(`/api/bloggers/${id}`, config );
    } catch (error: any) {
      console.log(error.response.data.message)
    } finally {
    }

  }