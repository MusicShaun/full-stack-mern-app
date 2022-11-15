import { USER_LOGIN_FAIL} from "../constants/userConstants";
import axios from "axios";
import { logInUser } from "../features/loggedInSlice";
import { loginUser } from "../features/loginSlice";
import { deleteRegister } from "../features/registerSlice";




type RegisterProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string; 
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
    dispatch(logInUser())
    localStorage.setItem("userInfo", JSON.stringify(data.data))
    console.log(data)

  } catch (error: any) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: 
      error.response && error.response.data.message
      ? error.response.data.message 
      : error.message, 
    })
  } finally {
    dispatch(deleteRegister())
  }
}






type LoginProps = {
  email: string;
  password: string;
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
      dispatch(loginUser(data))
      dispatch(logInUser())
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
  tag: string;
  tag2: string;
  header: string;
  body: string;
  firstName: string;
  lastName: string;
}
export const postBlog = ( { tag,tag2,header,body,firstName,lastName} : MakePost) => async (dispatch: any) => {
  console.log('userActions engaged')

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
    } catch (error: any) {
      console.log(error.response.data.message)
    } finally {
    }
  }
  

  type UpdateUser = {
    firstName: string;
    lastName: string;
    email: string;
  }
  export const updateUser = ( { firstName,lastName, email} : UpdateUser) => async (dispatch: any) => {
    console.log('updateuser engaged')
    let userInfo = JSON.parse(localStorage.getItem('userInfo') ||  '{}');
  
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token ? userInfo.token  : userInfo.data.token }`,
          },
        };
    
        const {data} = await axios.put(
          '/api/users/profile', {
          firstName,
          lastName,
          email
        }, config );
        console.log(data)

        dispatch({
          payload: data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data))

      } catch (error: any) {
        console.log(error.response.data.message)
        console.log('userActions error log')
      } finally {
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
    } catch (error: any) {
      console.log(error.response.data.message)
    } finally {
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