import { CssBaseline, Container, Box, Stack, Paper, styled, Divider, Button, AppBar } 
from "@mui/material";
import React from "react";
import { useState, useEffect } from 'react';
import { useAppSelector } from "../../app/hook";
import PersonalDetails from "./PersonalDetails";
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
  const [ rightSidePages, setRightSidePages ] = useState<number>(0)
  

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('userInfo') || ""); 
    if (usersProfilePosts){
    Object.values(usersProfilePosts).filter(item => item.lastName === local.lastName ? setUsersPost([item]) : null)
    }
  }, [usersProfilePosts])

 const bigButton = {
  height: '15%', display: 'flex', justifyContent: 'center', 
  alignItems: 'center', bgcolor: 'secondary.light', color: 'primary.contrastText', fontSize: '1.3rem',
  borderTopRightRadius: '0px',  borderEndEndRadius: '0px' 
 }
 const buttonBaby = {
  display: 'flex', justifyContent: 'center', height: '100%', width: '100%',
  alignItems: 'center', bgcolor: 'secondary.light', color: 'primary.contrastText', fontSize: '1.3rem',
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
        width: '100%',
        m:0,
        p:0,
        flexDirection: {xs: 'column', md: 'row' }
    }}>
      <Box sx={{
        height: '100%',
        width: '30%',
        display: { xs: 'none', md: 'flex' } 
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
          <Button sx={{...bigButton}} onClick={() => setRightSidePages(0)}>
            <Item sx={{...buttonBaby}}>
            YOUR POSTS
            </Item>
          </Button>
          <Button sx={{...bigButton}} onClick={() => setRightSidePages(1)}>
            <Item sx={{...buttonBaby}}>
            PERSONAL DETAILS
            </Item>
          </Button>
          <Button sx={{...bigButton}} onClick={() => setRightSidePages(2)}>
            <Item sx={{...buttonBaby}}>
            EMPTY
            </Item>
          </Button>
          <div style={{flexGrow: 1}}></div>
          <Button sx={{...bigButton}}>
            <Item sx={{...buttonBaby}}>
            LOGOUT
            </Item>
          </Button>
        </Stack>
      </Box>

      <AppBar position="fixed"  
              sx={{display: { xs: 'flex', md: 'none' }, mt: '80px',}} >
        <Container maxWidth={false} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button  onClick={() => setRightSidePages(0)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
        Post        
        </Button>
        <Button  onClick={() => setRightSidePages(1)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
        Profile        
        </Button>
        <Button  onClick={() => setRightSidePages(2)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
        Empty        
        </Button>
        <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
        Logout        
        </Button>

        </Container>
      </AppBar>



      <Box sx={{
        height: '100%',
        width: {sx: '95%', md: '70%'},
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: {xs : '136px', md: 0}
      }}>
            {rightSidePages === 0 && <YourPosts usersPosts={usersPosts}/>}
            {rightSidePages === 1 && <PersonalDetails />}
            {/* {rightSidePages === 2 && <YourPosts />} */}
            
            
      </Box>



    </Container>
  </React.Fragment>
)
}