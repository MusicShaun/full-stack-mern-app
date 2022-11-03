import { CssBaseline, Container, Box, Stack, Paper, styled, Divider, Typography, Button } 
from "@mui/material";
import React from "react";
import { useState, useEffect } from 'react';
import { useAppSelector } from "../app/hook";
import Card from "../components/blog_posts/Card";




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
  }, [])



return (
  <React.Fragment>
  <CssBaseline />
    <Container maxWidth={false} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        height: 'calc(100vh - 380px)',
        mt: 10
        // width: '100%'
    }}>
      <Box sx={{
        border: '2px solid lightblue',
        height: '100%',
        width: '30%',
        backgroundColor: 'white',
      }}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          // spacing={4}
          divider={<Divider orientation="horizontal" flexItem />}
          sx={{
            height: '100%',
            width: '100%',
            backgroundColor: 'lightgrey',
          }}
        >
          <Item sx={{height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Your posts</Item>
          <Item sx={{height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          Personal Details</Item>
          <Item sx={{height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Something</Item>
          <div style={{flexGrow: 1}}></div>
          <Item sx={{height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Logout</Item>

        </Stack>
      </Box>

      <Box sx={{
        border: '2px solid lightblue',
        height: '100%',
        width: '70%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography variant='h1' textAlign='center' >
          {usersPosts.length > 0 ? 'Your posts' : 'You havent made any posts'}
        </Typography>

      
        {usersPosts && 
          usersPosts.map((item: any, index: number) => {
            return <Card key={index}
                  tag={item.tag}
                  tag2={item.tag2}
                  header={item.header}
                  body={item.body}
                  date={item.createdAt}
                  name={item.firstName}
                  />
             
          })
        }
        <Button>Add Delete Button</Button>
        <Button>Add update Button</Button>
      </Box>



    </Container>
  </React.Fragment>
)
}