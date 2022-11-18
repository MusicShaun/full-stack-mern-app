import { CssBaseline, Container, Box, Stack, Divider, Button, AppBar, Typography } 
from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import usePerfectWindowHeight from "../../hooks/usePerfectWindowHeight";
import { useWindowSize} from "@react-hook/window-size";
import ProfileMUIButtons from "./ProfileMUIButtons";


export default function Profile() {
  const [onlyWidth, onlyHeight] = useWindowSize(); 
  const navigate = useNavigate();

return (
  <React.Fragment>
  <CssBaseline />
    <Container maxWidth="lg"
      sx={{
        minHeight: `${usePerfectWindowHeight(onlyHeight)}px`,
        mt: 10,
        display: 'flex',
        bgcolor: 'background',
        flexDirection: {xs: 'column', md: 'row' },
        p: onlyWidth > 600 ? "lg" : 0,
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


      <AppBar position="fixed"  
              sx={{display: { xs: 'flex', md: 'none' }, mt: '80px',}} >
        <Container maxWidth={false} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button  onClick={() => navigate('/profile')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
        Post        
        </Button>
        <Button  
                onClick={() => navigate('/profile/personal')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
        Profile        
        </Button>
        <Button  onClick={() => navigate('/profile/draft')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
        Draft        
        </Button>

        </Container>
      </AppBar>



      <Box sx={{
        position: 'relative',
        height: '100%',
        maxWidth: {sx: '95%', md: '100%'},
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