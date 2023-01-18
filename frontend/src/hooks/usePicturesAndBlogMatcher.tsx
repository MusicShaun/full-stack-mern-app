import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hook';
import axios from 'axios';
interface IProps {
  content: any;
}

export default function usePicturesAndBlogMatcher({ content }: IProps) {
  
  const dispatch = useAppDispatch()
  const [output, setOutput] = useState<string>();
  const alt = 'https://res.cloudinary.com/dyneqi48f/image/upload/v1669686479/qqsmbl9quuhnvbrs7daw.jpg';
  
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  useEffect(() => {
    dispatch(getEveryUsersPicture())
  }, [])
  

  const getEveryUsersPicture = () => async (dispatch: any) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token ? userInfo.token : userInfo.data.token}`,
        },
      }
      if (content.user) {
        const { data } = await axios.get(`/api/users/picture/${content.user}`, config)
        if (data) setOutput(data.data)
      }
    } catch {
      // ignore errors, its all good
    }
  }
  return output ? output : alt

}
