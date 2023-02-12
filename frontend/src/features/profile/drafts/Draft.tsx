import { Box, Typography } from '@mui/material';
import {  useAppSelector } from '../../../app/hook';
import CloseTheDraftUpdate from '../yourposts/YourPostsUpdateBlogCloser';
import { selectBlogsStatus, selectDraftBlogs } from '../../wall/wallSlice';
import DraftsList from './DraftsList';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export default function Draft() {

  const usersDraftsSelector = useAppSelector(selectDraftBlogs)
  
  const status = useAppSelector(selectBlogsStatus)
  let closingWindow = status === 'post deleted'

  useEffect(() => {
    console.log(status)
  },[status])

  return (
    <Box
      sx={{
        width: '92%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }} >
    <Typography variant='h1' textAlign='center' 
        sx={{
          filter: closingWindow ? 'blur(5px)' : 'null', 
          mt: {xs: 1, md: 4}, 
          mb: {xs: 1, md: 4},
        }}>
        
      {usersDraftsSelector.length > 0 ? 'Your Drafts' : 'You don\'t have any drafts'}
      </Typography>

    <Box
        sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        gap:closingWindow ? 4 : 0, 
        mb: closingWindow ? 10 : 0, 
        width: '100%',
        minHeight: '60vh',
      }}>

      {closingWindow && <CloseTheDraftUpdate />}

     <DraftsList />   
     <Outlet />
    </Box>
    </Box>
  )
}
