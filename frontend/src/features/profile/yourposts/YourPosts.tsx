import { useEffect  } from 'react'
import { Typography, Box } from "@mui/material";
import {  useAppDispatch, useAppSelector } from '../../../app/hook';
import YourPostsFinish from './YourPostsUpdateBlogCloser';
import { Outlet } from 'react-router-dom';
import { BlogShape, selectBlogsById, selectBlogsStatus, statusIdle } from '../../wall/wallSlice';
import { useSelector } from 'react-redux';
import YourPostsList from './YourPostsList';

export default function YourPosts() {

  const dispatch = useAppDispatch()
  const usersPostedBlogs: BlogShape[] | object[] = useSelector(selectBlogsById)
  const status: string = useAppSelector(selectBlogsStatus)
  let closingWindow = status === 'post deleted' || status === 'update successful'

  let notDraft = usersPostedBlogs.filter((p: any) => {
    return p['isDraft'] === false 
  })

  useEffect(() => {
    dispatch(statusIdle())
  }, [dispatch])

  // escape key
  useEffect(() => { 
    function escape(e: any){
      if (e.key === 'Escape'){
      }
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup',  (e) => escape(e)) ;
    // eslint-disable-next-line
  }, [] )

  return (
    <Box sx={{
      position: 'relative',
      width: '92%', minHeight:'60vh',
      height: '100%', display: 'flex',
      alignItems: 'center', flexDirection: 'column', 
    }} >

    {closingWindow && <YourPostsFinish />}

    <Typography variant='h1' textAlign='center' 
        sx={{filter: closingWindow ? 'blur(5px)' : 'null', 
            mt: {xs: 1, md: 4}, 
            mb: {xs: 1, md: 4},
            }}>
        {notDraft.length > 0  ? 'Your Posts' : 'You havent made any posts'}
      </Typography>
    
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap:4 , 
      mb: 6, 
      
      }}>
      <YourPostsList  />
    </Box>
      
    <Outlet />
  </Box>
  )
}
