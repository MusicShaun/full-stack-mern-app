import { CssBaseline, Container, Box, Stack, Paper, styled, Divider, Typography, Button } 
from "@mui/material";
import React from "react";
import { useState, useEffect } from 'react';
import { useAppSelector } from "../../app/hook";
import Card from "../../components/blog_posts/Card";
import YourPosts from "./YourPosts";



export default function Profile() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [ usersPosts, setUsersPost ] = useState<object[]>([]);
  const usersProfilePosts = useAppSelector((state) => state.getWallPostState.value[0]); // blog content

  

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('userInfo') || ""); 
    if (usersProfilePosts){
    Object.values(usersProfilePosts).filter(item => item.lastName === local.lastName ? setUsersPost([item]) : null)
    }
  }, [usersProfilePosts])

 const bigButton = {
  height: '15%', display: 'flex', justifyContent: 'center', 
  alignItems: 'center', bgcolor: 'primary.light', color: 'primary.contrastText', fontSize: '1.3rem',
  borderTopRightRadius: '0px',  borderEndEndRadius: '0px' 
 }

return (
  <React.Fragment>
  <CssBaseline />
    <Container maxWidth={false} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background',
        height: 'calc(100vh - 136px)',
        width: '100%'
    }}>
      <Box sx={{
        height: '100%',
        width: '30%',
      }}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          divider={<Divider orientation="horizontal" flexItem />}
          sx={{
            height: '100%',
            width: '100%',
          }}
        >
          <Item sx={{...bigButton}}>
            YOUR POSTS</Item>
          <Item sx={{...bigButton}}>
          PERSONAL DETAILS</Item>
          <Item sx={{...bigButton}}>
            EMPTY</Item>
          <div style={{flexGrow: 1}}></div>
          <Item sx={{...bigButton}}>
            LOGOUT</Item>

        </Stack>
      </Box>

      <Box sx={{
        height: '100%',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
            <YourPosts usersPosts={usersPosts}/>
      </Box>



    </Container>
  </React.Fragment>
)
}