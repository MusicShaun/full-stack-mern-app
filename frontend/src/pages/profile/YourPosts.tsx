import { SetStateAction, useState } from 'react'
import { Typography, Button, Box } 
from "@mui/material";
import Card from "../../components/blog_posts/Card";
import UpdateBlog from './UpdateBlog';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import PostUpdateFinish from './PostUpdateFinish';
import { showUpdateTrue } from '../../features/showUpdateSlice';
import { deleteBlog } from '../../actions/userActions';
import { deleteWallPosts, getWallPosts } from '../../features/wallPostsSlice';
import axios from 'axios';


interface IProps {
  usersPosts: object[];
  setBlogContent: React.Dispatch<SetStateAction<any | null>>;

}

export default function YourPosts({usersPosts, setBlogContent}: IProps ) {

  const dispatch = useAppDispatch();
  const [ updateNumber , setUpdateNumber ] = useState<number>(0);

  const finishSelector = useAppSelector(state => state.patheticBoolean);
  const updateSelector = useAppSelector(state => state.showUpdateSlice)

  function handleUpdaterButton(index: number) {
    dispatch(showUpdateTrue())
    setUpdateNumber(index)
  }

  async function handleDeletePost(postID: any) {
      dispatch(deleteBlog(postID)
    )
      const controller = new AbortController() // retrieve new updated list 
      try {
        const data = await axios.get('/api/bloggers', {
          signal: controller.signal
        }) 
        dispatch(deleteWallPosts())
        dispatch(getWallPosts(data.data))
        setBlogContent(data.data)
        return () => {
          controller.abort()
        }
      } catch (error) {
        console.log(error)
      }
  }
  

  return (
    <div>
    <Typography variant='h1' textAlign='center' sx={{filter: finishSelector.value ? 'blur(5px)' : 'null', mt: 4, mb: 4}}>
        {usersPosts.length > 0 ? 'Your Posts' : 'You havent made any posts'}
      </Typography>


      {usersPosts && !updateSelector.value && 
        usersPosts.map((item: any, index: number) => {
          return <><Card key={index}
                tag={item.tag}
                tag2={item.tag2}
                header={item.header}
                body={item.body}
                date={item.createdAt}
                name={item.firstName}
                
                />
                <Box  key={index + 1000} sx={{display: 'flex', justifyContent: 'space-between', mb: 6, mt: 1, }}>

                  <Button variant='contained'
                    onClick={() => handleUpdaterButton(index)} 
                    sx={{ bgcolor: 'success.main', boxShadow: 4,
                    ":hover": { transform: 'scale(1.05)', boxShadow: 5},
                  }}
                    
                  >Update Blog</Button>
                  <Button 
                    onClick={() => handleDeletePost(item._id)}
                    variant='contained' sx={{ bgcolor: 'error.main', boxShadow: 5,
                                      ":hover": { transform: 'scale(1.05)', boxShadow: 4},
                                      
                                    }}
                  >Delete</Button>
                </Box>
                </>
        })
      }


      {updateSelector.value && <UpdateBlog  usersPosts={usersPosts} updateNumber={updateNumber} /> }
      {finishSelector.value && <PostUpdateFinish /> }
  </div>
  )
}
