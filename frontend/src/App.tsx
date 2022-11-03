import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wall from './pages/Wall';
import Post from './pages/Post';
import Profile from './pages/Profile';
import { useState, useEffect } from 'react'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

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
      dark: '#1565c0'
    }
    
  }
});

// END OF EPISODE 13 TO GET THE SEARCH BAR FUNCTIONALITY 
function App() {

  const [ loggedIn, setLoggedIn ] = useState<boolean>(true);
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
        setLoggedIn(true)
        console.log('Logged in')
    } 
  }, [])


  return (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Router>

        <Header 
        // loggedIn={loggedIn}
        // setLoggedIn={setLoggedIn}
        /> 

        
        <Routes>
          <Route path='/' element={ <Landing /> } />
          <Route path='login' element={ <Login /> } /> 
          <Route path='register' element={ <Register /> } /> 

          <Route path='wall' element={ <Wall /> } /> 
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