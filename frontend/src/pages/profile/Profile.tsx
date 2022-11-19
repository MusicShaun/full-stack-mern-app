import { CssBaseline, Container, Box, Stack, Divider,Typography } 
from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import usePerfectWindowHeight from "../../hooks/usePerfectWindowHeight";
import { useWindowSize} from "@react-hook/window-size";
import ProfileMUIButtons from "./ProfileMUIButtons";


export default function Profile() {
  const [onlyWidth, onlyHeight] = useWindowSize(); 

return (
  <React.Fragment>
  <CssBaseline />
    <Container maxWidth="lg"
      sx={{
        minHeight: `${usePerfectWindowHeight(onlyHeight)}px`,
        mt: {xs: 18, md : 10},
        display: 'flex',
        bgcolor: 'background',
        flexDirection: {xs: 'column', md: 'row' },
        p: onlyWidth > 600 ? "lg" : 0,
        transition: 'all 0.1s', ///// WHY ARE THERE WEIRD SLOW TRANSITIONS?!
      }}>
      <Box sx={{
        width: '30%',
        maxWidth: '400px',
        display: { xs: 'none', md: 'flex' } ,
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
        <Typography variant='h1' 
          sx={{ color: 'text.secondary', width: '100%', p: 4 }}>
              YOUR PROFILE
        </Typography>          
          <ProfileMUIButtons text='YOUR POSTS' destination='/profile' />
          <ProfileMUIButtons text='PERSONAL DETAILS' destination='/profile/personal' />
          <ProfileMUIButtons text='DRAFT' destination='/profile/draft' />
          <div style={{flexGrow: 1}}></div>
        </Stack>
      </Box>


      <Box sx={{
        position: 'relative',
        height: '100%',
        maxWidth: {sm: '95%', md: '100%'},
        width: '100%',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Outlet />
      </Box>



    </Container>
  </React.Fragment>
)
}