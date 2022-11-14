import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Header from "./components/header/Header";
import Wall from './pages/Wall';
import Post from './pages/Post';
import Profile from './pages/profile/Profile';
import { ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { useState } from 'react'; 
import PersonalDetails from './pages/profile/PersonalDetails';
import darkTheme  from './mui-themes/DARK_THEMES';
import  theme  from './mui-themes/LIGHT_THEMES';




function App() {

  const [ blogContent, setBlogContent ] = useState<any | null>();
  const [ blogFilter , setBlogFilter ] = useState<any>();
  const [ darkMode, setDarkMode ] = useState(false);
  const [ clearListings, setClearListings ] = useState(false);
  
  function toggleLightDark() {
    setDarkMode(prev => !prev)
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
          clearListings={clearListings}
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
          <Route path='post' element={ <Post /> }>
            <Route path='personaldetails' element={ <PersonalDetails /> } /> 
          </Route> 
          <Route path='profile' element={ <Profile setBlogContent={setBlogContent} /> } /> 
        </Routes> 


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