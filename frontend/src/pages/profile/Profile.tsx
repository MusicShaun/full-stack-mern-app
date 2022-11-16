import { CssBaseline, Container, Box, Stack, Paper, styled, Divider, Button, AppBar } 
from "@mui/material";
import React, { SetStateAction } from "react";
import { Outlet, useNavigate } from "react-router-dom";


const bigButton = {
  height: '15%', display: 'flex', justifyContent: 'center', 
  alignItems: 'center', bgcolor: 'secondary.light', color: 'primary.contrastText', fontSize: '1.3rem',
  borderTopRightRadius: '0px',  borderEndEndRadius: '0px' 
 }
 const buttonBaby = {
  display: 'flex', justifyContent: 'center', height: '100%', width: '100%',
  alignItems: 'center', bgcolor: 'secondary.light', color: 'primary.contrastText', fontSize: '1.3rem',
 }
interface IProps {
  setBlogContent: React.Dispatch<SetStateAction<any | null>>;

}

export default function Profile({setBlogContent, }: IProps) {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const navigate = useNavigate();
  

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
        flexDirection: {xs: 'column', md: 'row' },
    }}>
      <Box sx={{
        height: '100%',
        width: '30%',
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
        width: {sx: '95%', md: '70%'},
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