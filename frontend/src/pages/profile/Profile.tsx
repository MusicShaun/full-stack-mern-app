import { CssBaseline, Container, Box, Stack, Paper, styled, Divider, Button, AppBar, Typography } 
from "@mui/material";
import { useWindowHeight } from "@react-hook/window-size";
import React, { SetStateAction, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";

const bigButton = {
  height: '15%', maxHeight: '80px', display: 'flex', alignItems: 'center', bgcolor: 'none', color: 'text.main', fontSize: '1.3rem',
  borderTopRightRadius: '0px',  borderEndEndRadius: '0px' 
 }
 const buttonBaby = {
  display: 'flex',  height: '100%', width: '100%', padding: '0 0 0 32px',
  alignItems: 'center', bgcolor: 'none', color: 'text.primary', fontSize: '1.3rem',
 }
interface IProps {
  setBlogContent: React.Dispatch<SetStateAction<any | null>>;

}

export default function Profile({setBlogContent, }: IProps) {
  const onlyWidth = useWindowWidth();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const navigate = useNavigate();
  
  const onlyHeight = useWindowHeight(); /// ridiculous setup for perfect height
  const [setHeight, setIt] = useState(onlyHeight - 80);
  useEffect(() => {
    setIt(onlyHeight - 80)
  }, [onlyHeight])

return (
  <React.Fragment>
  <CssBaseline />
    <Container maxWidth="lg"  sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background',
        height: `${setHeight}px`,
        // width: `${onlyWidth}px`,
        flexDirection: {xs: 'column', md: 'row' },
    }}>
      <Box sx={{
        height: '100%',
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

          <Button sx={{...bigButton}} onClick={() => navigate('/profile')}>
            <Item sx={{...buttonBaby}}>
            YOUR POSTS
            </Item>
          </Button>
          <Button sx={{...bigButton}} onClick={() => navigate('/profile/personal')}>
            <Item sx={{...buttonBaby}}>
            PERSONAL DETAILS
            </Item>
          </Button>
          <Button sx={{...bigButton}} onClick={() => navigate('/profile/draft')}>
            <Item sx={{...buttonBaby}}>
            DRAFT
            </Item>
          </Button>
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
        mt: {xs : '136px', md: 0}
      }}>
        <Outlet />
      </Box>



    </Container>
  </React.Fragment>
)
}