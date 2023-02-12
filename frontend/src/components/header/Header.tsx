import styled from 'styled-components';
import { TextField, Button, AppBar, useScrollTrigger, Slide, IconButton, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../art/logo.png';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoggedOutNav from './LoggedOutNav';
import LoggedInNav from './LoggedInNav';
import { useRef, useEffect, useState } from 'react';
import { filterBlogs } from '../../features/wall/wallSlice';
import { useSelector } from 'react-redux';
import { beginSearch, searchBarState } from '../../features/searchBarSlice';
import { selectUser } from '../../features/users/usersSlice';


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
}



export default function Header( {toggleLightDark, darkMode} : IProps ) {

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const user = useAppSelector(selectUser)
  const searchBarEngaged = useSelector(searchBarState)

  const filterRef = useRef<HTMLInputElement>(null);
  
  const [searchEntry, setSearchEntry] = useState('')
  const [storedToken, setStoredToken] = useState(false)

  useEffect(() => { // FOCUS 
    if (filterRef.current) { filterRef.current.focus() }
  }, [])
  useEffect(() => { // KEEP LOCAL STORAGE UP TO DATE
    window.localStorage.setItem('userInfo', JSON.stringify({...user}))
    console.log('localStorage set')
  }, [user])
  useEffect(() => { // CHECK LOGGED ON
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    if (userInfo.token) {
      setStoredToken(true)
    } else if (window.location.pathname !== '/register' && window.location.pathname !== '/') {
      navigate('/login')
    }
  }, [navigate])
  useEffect(() => { 
    if (!searchBarEngaged && filterRef.current) {
      setSearchEntry('')
      filterRef.current.focus()
    }
  }, [searchBarEngaged])

  function handleLogout() {
    localStorage.removeItem('userInfo')
    setStoredToken(false)
    navigate('/login')
  }

  function handleSearch() {
    dispatch(beginSearch())
    dispatch(filterBlogs(searchEntry))
  }
  

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
          value={searchEntry}
          inputRef={filterRef}
          onChange={(e) => setSearchEntry(e.target.value)}
          onKeyUp={() => handleSearch()} 
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

{/* NOT LOGGED IN  */}
      <Box sx={{  display: { xs: 'none', md: 'flex' } }}>
        {!storedToken && 
          <Link to='login' style={killLinkStyle}>
            <Button variant="text" size="large"
                  sx={{fontSize: 16, fontWeight: 600, }} 
                  >
Login  
            </Button>
          </Link>
        }
        {!storedToken && 
        <Link to='register' style={killLinkStyle}>
          <Button variant="outlined"  size="large"
                  sx={{fontSize: 16, fontWeight: 600, }} 
                  >
Create Account
          </Button>
        </Link> 
        }

{/* LOGGED IN */}
        {storedToken && 
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
        {storedToken && 
        <Link to='post' style={killLinkStyle}>
          <Button variant={window.location.href.endsWith('post') ? "contained" : "outlined"} 
                  size="large"
                  sx={window.location.href.endsWith('post') ?
                   {fontWeight: 600, mr: '0.5rem', backgroundColor: 'secondary.light' }
                  : {fontWeight: 600, mr: '0.5rem', color: 'secondary.light' }
                  }
                  >Post
          </Button>
          </Link>  
        }
        {storedToken && 
        <Link to='profile/your-posts' style={killLinkStyle}>
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
        {storedToken && 
          <Button variant="text" size="large"  sx={{color: 'secondary.light' }}
                  onClick={handleLogout}
                  >Logout
          </Button>
        }

      </Box>

        {/* // CHANGE TO HAMBURGER */}
       {!storedToken && 
        <LoggedOutNav 
        />
       }
        {storedToken && 
        <LoggedInNav 
        handleLogout={handleLogout}
        />
       }

    {window.location.href.includes('profile') && 
      <AppBar position="fixed"  
              sx={{display: { xs: 'flex', md: 'none' }, mt: '80px', height: '40px'}} >
        <Container maxWidth={false} sx={{display: 'flex', flexDirection: 'row', 
        justifyContent: 'space-around' ,  alignItems: 'center', height: '100%'}}>
        <Button  onClick={() => navigate('/profile/')}
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
              >Drafts        
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