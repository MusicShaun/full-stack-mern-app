
import axios from "axios";
import { loadingState } from "../features/loaderSlice";
import { trueBoolean } from "../features/patheticBooleanSlice";
import { getProfileBlogs } from "../features/profileBlogSlice";
import { getWallPosts } from "../features/wallPostsSlice";





export const getBlogs = () => async (dispatch: any) => {
  dispatch(loadingState({booly: true, message: 'Loading'}))
  try {
    const res = await axios.get('/api/bloggers') 

    dispatch(getWallPosts(res.data.blogs))
    console.log('Blog content retrieved')
    dispatch(loadingState({booly: false, message: 'finished load'}))

  } catch (error: any) {
    dispatch(loadingState({booly: false, message: error.response.data.message}))
  } 

}

  




type MakePost = {
  tag: FormDataEntryValue;
  tag2: FormDataEntryValue;
  header:  FormDataEntryValue;
  body:  FormDataEntryValue;
  firstName:  string;
  lastName:  string;
  isDraft :boolean;
}
export const postBlog = ( { tag,tag2,header,body,firstName,lastName, isDraft} : MakePost) => async (dispatch: any) => {

  dispatch(loadingState({booly:true, message: ''}))
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token ? userInfo.token  : userInfo.data.token }`,
        },
      };
// eslint-disable-next-line 
    const data  = await axios.post(
      '/api/bloggers', {
      tag,
      tag2,
      header,
      body,
      firstName,
      lastName,
      isDraft,
      
    }, config );
    dispatch(loadingState({ booly: false, message: "Blog has posted successfully!" }))
    
  } catch (error: any) {
      dispatch(loadingState({booly: false, message: error.response.data.message}))
      alert('Something happened that wasn\'t supposed to. Please have another go.')
  } 
}



type UpdateBlog = {
  id: number;
  tag: string;
  tag2: string;
  header: string;
  body: string;
  isDraft: boolean;
  // profilePicture: string; 
}
export const updateBlog = ( {id, tag,tag2, header, body, isDraft, } : UpdateBlog) => async (dispatch: any) => {
  console.log('updateblog engaged')
  dispatch(loadingState({booly:true, message: ''}))
  let userInfo = JSON.parse(localStorage.getItem('userInfo') ||  '{}');
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token ? userInfo.token  : userInfo.data.token }`,
      },
    };
// eslint-disable-next-line 
    const {data} = await axios.patch(
      `/api/bloggers/${id}`, {
      tag,
      tag2,
      header,
      body,
      isDraft,
    }, config );
    dispatch(loadingState({booly:false, message: "Blog updated successfully!"}))
    dispatch(trueBoolean())
    console.log(data)
  } catch (error: any) {
    console.log(error.response.data.message)
    dispatch(loadingState({booly: false, message: error.response.data.message}))
    dispatch(trueBoolean())
  }
}



export const deleteBlog = (id: any) => async (dispatch: any) => {

  let userInfo = JSON.parse(localStorage.getItem('userInfo') ||  '{}');
  console.log('Deleting Post')
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token ? userInfo.token : userInfo.data.token}`,
      },
    };// eslint-disable-next-line 
    const data = await axios.delete(`/api/bloggers/${id}`, config);
  } catch (error: any) {
    console.log(error.response.data.message)
  }
}
  



export const getBlogByID = () => async (dispatch: any) => {

  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  try {
    const res = await axios.get(`/api/bloggers/${userInfo._id}`);
    dispatch(getProfileBlogs(res.data.blog))

  } catch (error: any) {
    console.log(error.response.data.message)
    dispatch(loadingState({booly: false, message: error.response.data.message}))

  }
}


