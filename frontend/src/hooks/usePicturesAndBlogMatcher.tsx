import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import axios from 'axios';
import { selectUser } from '../features/users/usersSlice';
interface IProps {
  content: any;
}

export default function usePicturesAndBlogMatcher({ content }: IProps) {
  
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const [output, setOutput] = useState<string>();
  const alt = 'https://res.cloudinary.com/dyneqi48f/image/upload/v1669686479/qqsmbl9quuhnvbrs7daw.jpg';
  
  useEffect(() => {
    dispatch(getEveryUsersPicture())
  }, [dispatch])

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token ? user.token : ''}`,
    }
  }

  const getEveryUsersPicture = () => async () => {
    if (content.user) {
      const { data } = await axios.get(`https://mern-project-main.herokuapp.com/api/users/picture/${content.user}`, config)
      if (data) setOutput(data.data)
    }
  }
  return output ? output : alt
}
