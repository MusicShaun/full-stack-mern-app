import styled from 'styled-components';
import { TextField, Button, AppBar, useScrollTrigger, Slide, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './art/logo.png';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { logOutUser } from '../features/loggedInSlice';
import { deleteUser } from '../features/loginSlice';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


interface Props {
  children: React.ReactElement;
}

function HideOnScroll( {children}: Props) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={'down'} in={!trigger}
    >{children}</Slide>
  )
}

type IProps = {
  toggleLightDark: () => void;
  darkMode: boolean;
  blogContent: any | null;
  setBlogFilter: React.Dispatch<React.SetStateAction<any | null>>;
  setClearListings: React.Dispatch<React.SetStateAction<any | null>>;
}

export default function Header( {toggleLightDark, darkMode, blogContent, setBlogFilter, setClearListings } : IProps ) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedInStatus = useAppSelector((state) => state.loggedInState);

  function handleLogout() {
    localStorage.removeItem('userInfo')
    dispatch(logOutUser())
    dispatch(deleteUser())
    navigate('/login')
    console.log('logged out')
  }

  function handleSearch(event: any) {
    setClearListings(true)
    let helper = [];
    for (let i =0; i < blogContent.length; i++) {
      if ((Object.values(blogContent[i]).toString().toLowerCase()).includes(event.target.value.toLowerCase())) {
        helper.push(blogContent[i])
      }
    }
    setBlogFilter(helper)
    helper = [];
  }

  const killLinkStyle = {
    textDecoration: 'none',
    underline: 'none',
    color: 'inherit'
  }
  return (
    <React.Fragment>
      <HideOnScroll>
      <AppBar position="fixed" sx={{
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '13px 3px 10px secondary.main',
          bgcolor: 'background.default',
          
      }}>
      <Container>
        <Logo />
        {/* <FormControl> */}
        <TextField id="outlined-basic" label="Search. . . " 
          variant="outlined" size="small" 
          onKeyUp={(event) => {
            if (event.code === 'Enter') {
              handleSearch(event);
            }
          }} 
          sx={{
              width: 350, 
              fontSize: 16, 
              fontWeight: 600 
            }}
          />
          {/* </FormControl> */}
        <Spacer />

        {!loggedInStatus.value && 
          <Button variant="text" size="large"
                  sx={{fontSize: 16, fontWeight: 600 }} 
                  >
            <Link to='login' style={killLinkStyle}>Login</Link>  
          </Button>
        }
        {!loggedInStatus.value && 
          <Button variant="outlined"  size="large"
                  sx={{fontSize: 16, fontWeight: 600 }} 
                  >
            <Link to='register' style={killLinkStyle}>Create Account</Link>  
          </Button>
        }
        {loggedInStatus.value && 
          <Button variant={window.location.href.includes('wall') ? "contained" : "outlined"} 
                  size="large"
                  sx={window.location.href.includes('wall') ?
                   {fontWeight: 600, mr: '0.5rem', backgroundColor: 'primary.light' }
                  : {fontWeight: 600, mr: '0.5rem', color: 'primary.light' }
                  }
                  onClick={() => navigate('/wall')}                  
                  >Wall
          </Button>
        }
        {loggedInStatus.value && 
          <Button variant={window.location.href.includes('post') ? "contained" : "outlined"} 
                  size="large"
                  sx={window.location.href.includes('post') ?
                   {fontWeight: 600, mr: '0.5rem', backgroundColor: 'primary.light' }
                  : {fontWeight: 600, mr: '0.5rem', color: 'primary.light' }
                  }
                  onClick={() => navigate('/post')}                  
                  >Post
          </Button>
        }
        {loggedInStatus.value && 
          <Button variant={window.location.href.includes('profile') ? "contained" : "outlined"} size="large" 
          sx={window.location.href.includes('profile') ?
          {fontWeight: 600, mr: '0.5rem', backgroundColor: 'primary.light' }
         : {fontWeight: 600, mr: '0.5rem', color: 'primary.light' }
         }
                  >
            <Link to='profile' style={killLinkStyle}>Profile</Link>  
          </Button>
        }
        {loggedInStatus.value && 
          <Button variant="text" size="large"  sx={{color: 'primary.light' }}
                  onClick={handleLogout}
                  >Logout
          </Button>
        }
        <IconButton  onClick={toggleLightDark}>
          {darkMode ?
          <LightModeIcon sx={{color:'primary.main'}}/>
           : <DarkModeIcon sx={{color:'primary.main'}}/>
          }
        </IconButton>
      </Container>
    </AppBar>
    </HideOnScroll>
  </React.Fragment>
  )
}


const Container = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  align-items: center;
`
const Spacer = styled.div`
  display: flex;
  flex: 1;
`
const Logo = styled.div`
  background-image: url(${logo});
  width: 40px;
  height: 40px;
  background-size: contain;
`