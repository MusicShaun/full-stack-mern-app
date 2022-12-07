import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hook';




interface IProps {
  content: any;
}

export default function usePicturesAndBlogMatcher({ content }: IProps) {
  
  const picturesForUsers = useAppSelector(state => state.picturesState.value)

  const [output, setOutput] = useState<string>();
  const alt = 'https://res.cloudinary.com/dyneqi48f/image/upload/v1669686479/qqsmbl9quuhnvbrs7daw.jpg';

  useEffect(() => {
    if (Object.keys(picturesForUsers).length === 0 || picturesForUsers.length === 0 || !content) {
      console.log('empty object refused')
      return;
    }

    if (content.user ) {
      picturesForUsers.pictures.find((pic: any) => {
        return pic.user === content.user && setOutput(pic.profilePicture.toString());
      })
    } else {
      return setOutput(alt);
    }
    //! Change this to pictures for users when ready
// eslint-disable-next-line 
  }, [])

  return output
}

