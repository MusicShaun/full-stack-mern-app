import axios from "axios";
import { getPictureState } from "../features/userProfilePictureSlice";


export const getUserPicture = () => async (dispatch: any) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token ? userInfo.token : userInfo.data.token}`,
      },
    }
    const data = await axios.get(`/api/users/picture/${userInfo.id}`, config)
    dispatch(getPictureState(data.data.data))
  } catch (error: any) {
    console.log(error)
  }
}

