import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wall from './pages/Wall';
import Post from './pages/Post';
import Profile from './pages/profile/Profile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { useState } from 'react'; 
import { grey } from '@mui/material/colors';

// LIGHT THEME 
const theme: any = createTheme({
  typography: {
    fontFamily: [
      "IBM Plex Sans", "Segoe UI",'Roboto',"Helvetica Neue"
    ].join(',')
    ,
    h1: {
      fontSize: '2rem',
      fontWeight: '800',
      lineHeight: '1.22',
      color: '#132F4C'
    },  
    h2: {
      fontSize: '1.125rem',
      fontWeight: '700',
      lineHeight: '1.33',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#3E5060',
      scrollMarginTop: `32px`,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.5',
    }
  },
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff'
    },
    secondary: {
      main: grey[300],
      light: '#42a5f5',
      dark: '#1565c0',
      // contrastText: ''
    },
    background: {
      default: grey[100],
    },
    text: {
      primary: '#434b53',
      secondary: '#1a2027',
      // disabled: ''
    },
    error: {
      main: '#d32f2f',
    },
    // success: {
    //   main: '',
    // }
  },

});


const darkTheme = createTheme({
  typography: {
    fontFamily: [
      "IBM Plex Sans", "Segoe UI",'Roboto',"Helvetica Neue"
    ].join(',')
    ,
    h1: {
      fontSize: '2rem',
      fontWeight: '800',
      lineHeight: '1.22',
      color: '#fff'
    },  
    h2: {
      fontSize: '1.125rem',
      fontWeight: '700',
      lineHeight: '1.33',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#3E5060',
      scrollMarginTop: `32px`,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.5',
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#42a5f5',
      light: '#1565c0',
      dark: '#1565c0',
      contrastText: '#1a2027'
    },
    secondary: {
      main: '#001e3c',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: ''
    },
    background: {
      default: '#0a1929',
    },
    divider:  'rgb(19, 47, 76)',
    text: {
      primary: grey[100],
      secondary: grey[200],
    },
    error: {
      main: '#e57373'
    },
  }
});







// END OF EPISODE 13 TO GET THE SEARCH BAR FUNCTIONALITY 
function App() {

  // const [ loggedIn, setLoggedIn ] = useState<boolean>(true);
  // useEffect(() => {
  //   if (localStorage.getItem('userInfo')) {
  //       setLoggedIn(true)
  //       console.log('Logged in')
  //   } 
  // }, [])
  const [ blogContent, setBlogContent ] = useState<any | null>();
  const [ blogFilter , setBlogFilter ] = useState<any>();
  const [ darkMode, setDarkMode ] = useState(false);
  const [ clearListings, setClearListings ] = useState(false);

  function toggleLightDark() {
    setDarkMode(prev => !prev)
    console.log(darkMode)
  }

  return (
  <ThemeProvider theme={darkMode ? darkTheme : theme}>
    <Wrapper>
      <Router>

        <Header 
          toggleLightDark={toggleLightDark}
          darkMode={darkMode}
          blogContent={blogContent}
          setBlogFilter={setBlogFilter}
          setClearListings={setClearListings}
        // loggedIn={loggedIn}
        // setLoggedIn={setLoggedIn}
        /> 

        
        <Routes>
          <Route path='/' element={ <Landing 
                          setBlogContent={setBlogContent}
                          blogContent={blogContent}
                          blogFilter={blogFilter}
                          clearListings={clearListings}
                          setClearListings={setClearListings}
                          /> } />
          <Route path='login' element={ <Login  /> } /> 
          <Route path='register' element={ <Register /> } /> 

          <Route path='wall' element={ <Wall 
                    setBlogContent={setBlogContent}
                    blogContent={blogContent}
                    blogFilter={blogFilter}
                    clearListings={clearListings}
                    setClearListings={setClearListings}
                    /> } 
          /> 
          <Route path='post' element={ <Post /> } /> 
          <Route path='profile' element={ <Profile /> } /> 
        </Routes> 

        <Footer />
      </Router>
    </Wrapper>
  </ThemeProvider>
  );
}

export default App;


const Wrapper = styled.main`

  width: 100%;
  min-height: 100%;
  top: 0;
  left: 0;
  position: relative;
  margin-top: 80px;
`