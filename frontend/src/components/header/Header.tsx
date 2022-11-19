import styled from 'styled-components';
import { TextField, Button, AppBar, useScrollTrigger, Slide, IconButton, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../art/logo.png';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { logOutUser } from '../../features/loggedInSlice';
import { deleteUser } from '../../features/loginSlice';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoggedOutNav from './LoggedOutNav';
import LoggedInNav from './LoggedInNav';
import { useRef, useEffect, useState } from 'react';


//HIDE APPBAR
function HideOnScroll( {children}: Props) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={'down'} in={!trigger}
    >{children}</Slide>
  )
}
interface Props {
  children: React.ReactElement;
}
type IProps = {
  toggleLightDark: () => void;
  darkMode: boolean;
  blogContent: any | null;
  setBlogFilter: React.Dispatch<React.SetStateAction<any | null>>;
  setClearListings: React.Dispatch<React.SetStateAction<any | null>>;
  clearListings:  boolean;
}



export default function Header( {toggleLightDark, darkMode, blogContent, setBlogFilter, setClearListings , clearListings} : IProps ) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedInStatus = useAppSelector((state) => state.loggedInState);
  const filterRef = useRef<HTMLInputElement>(null);
  const [ inputValue , setInputValue ] = useState('');
  const updateSelector = useAppSelector(state => state.showUpdateSlice)

  useEffect(() => {if (filterRef.current){filterRef.current.focus()}},[])

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

  useEffect(() => { 
    if (!clearListings && filterRef.current) {
      setInputValue('')
      filterRef.current.focus()
    }
  }, [clearListings])

  const killLinkStyle = {
    textDecoration: 'none',
    underline: 'none',
    color: 'inherit',
  }


  return (
    <React.Fragment>
      <HideOnScroll>
      <AppBar position="fixed" elevation={1} sx={{
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'primary.contrastText',

      }}>
      <Container  maxWidth="lg" sx={{display: 'flex'}}>
        <Logo />
        <TextField id="outlined-basic" label="Search. . . " 
          variant="outlined" size="small" 
          value={inputValue}
          inputRef={filterRef}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(event) => {
            if (event) {
              handleSearch(event);
            }
          }} 
          sx={{
              width: 350, 
              fontSize: 16, 
              fontWeight: 600 ,
              "& fieldset": { border: 'none' },
              borderWidth: '1px', borderStyle: 'solid', borderColor: 'secondary.main', borderRadius: '10px',
              marginRight: '1rem',
            }}
          />
        <IconButton  onClick={toggleLightDark} sx={{borderWidth: '1px', borderStyle: 'solid', borderColor: 'secondary.main', borderRadius: '10px'}}>
          {darkMode ?
          <LightModeIcon sx={{color:'primary.main'}}/>
           : <DarkModeIcon sx={{color:'primary.main'}}/>
          }
        </IconButton>
        <Spacer />

      <Box sx={{  display: { xs: 'none', md: 'flex' } }}>
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
        <Link to='wall' style={killLinkStyle}>
          <Button variant={window.location.href.includes('wall') ? "contained" : "outlined"} 
                  size="large"
                  sx={window.location.href.includes('wall') ?
                   {fontWeight: 600, mr: '0.5rem', backgroundColor: 'secondary.light' }
                  : {fontWeight: 600, mr: '0.5rem', color: 'secondary.light' }
                  }
                  >Wall
          </Button>
          </Link> 
        }
        {loggedInStatus.value && 
        <Link to='post' style={killLinkStyle}>
          <Button variant={window.location.href.includes('post') ? "contained" : "outlined"} 
                  size="large"
                  sx={window.location.href.includes('post') ?
                   {fontWeight: 600, mr: '0.5rem', backgroundColor: 'secondary.light' }
                  : {fontWeight: 600, mr: '0.5rem', color: 'secondary.light' }
                  }
                  >Post
          </Button>
          </Link>  
        }
        {loggedInStatus.value && 
        <Link to='profile' style={killLinkStyle}>
          <Button variant={window.location.href.includes('profile') ? "contained" : "outlined"} size="large" 
          sx={window.location.href.includes('profile') ?
          {fontWeight: 600, mr: '0.5rem', backgroundColor: 'secondary.light' }
         : {fontWeight: 600, mr: '0.5rem', color: 'secondary.light' }
         }
                  >
            Profile
          </Button>
        </Link>  
        }
        {loggedInStatus.value && 
          <Button variant="text" size="large"  sx={{color: 'secondary.light' }}
                  onClick={handleLogout}
                  >Logout
          </Button>
        }

      </Box>

        {/* // CHANGE TO HAMBURGER */}
       {!loggedInStatus.value && 
        <LoggedOutNav 
        />
       }
        {loggedInStatus.value && 
        <LoggedInNav 
        handleLogout={handleLogout}
        />
       }

    {!updateSelector.value.bool && window.location.href.includes('profile') && 
      <AppBar position="fixed"  
              sx={{display: { xs: 'flex', md: 'none' }, mt: '80px', }} >
        <Container maxWidth={false} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button  onClick={() => navigate('/profile')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > Post        
        </Button>
        <Button  
                onClick={() => navigate('/profile/personal')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >Profile        
        </Button>
        <Button  onClick={() => navigate('/profile/draft')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >Draft        
        </Button>

        </Container>
      </AppBar>
      }


      </Container>
    </AppBar>
    </HideOnScroll>
  </React.Fragment>
  )
}


const Spacer = styled.div`
  display: flex;
  flex: 1;
`
const Logo = styled.div`
  background-image: url(${logo});
  width: 40px;
  height: 40px;
  background-size: contain;
  min-width: 40px;
`