import axios from "axios";
import { getPicturesState } from "../features/picturesSlice";


export const getPictures = () => async (dispatch: any) => {

  const controller = new AbortController()
  try {
    const {data} = await axios.get('/api/profilePictures', {
      signal: controller.signal
    }) 
    dispatch(getPicturesState(data.data))

    return () => { controller.abort()}
  } catch (error) {
    console.log(error)
  }
}


export const getPictureByID = () => async (dispatch: any) => {

  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  try {
    const res = await axios.get(`/api/bloggers/${userInfo._id}`);
    // dispatch(getProfileBlogs(res.data.blog))
    console.log(res)
  } catch (error: any) {
    console.log(error.response.data.message)
    // dispatch(loaderTrue({booly: false, message: error.response.data.message}))

  }
}


type MakePost = {
  profilePicture: string; 
  id:  string;
}
export const postPicture = ( { profilePicture, id} : MakePost) => async (dispatch: any) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token ? userInfo.token  : userInfo.data.token }`,
        },
      };
    const res = await axios.post(
      '/api/profilePictures', {
        profilePicture,
    }, config);
    console.log(res)
  } catch (error: any) {
      alert('Something happened that wasn\'t supposed to. Please have another go.')
  } 
}