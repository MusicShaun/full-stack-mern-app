import styled from 'styled-components';
import { TextField, Button, AppBar, useScrollTrigger, Slide } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './art/logo.png';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { logOutUser } from '../features/loggedInSlice';
import { deleteUser } from '../features/loginSlice';
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


export default function Header( ) {

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
          boxShadow: '13px 3px 10px lightgrey',
          backgroundColor: 'white',
          
      }}>
      <Container>
        <Logo />
        <TextField id="outlined-basic" label="Search. . . " 
        variant="outlined" size="small"
          sx={{
              width: 350, 
              fontSize: 16, 
              fontWeight: 600 
            }}
          />
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