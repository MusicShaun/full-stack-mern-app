import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/login/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Header from "./components/header/Header";
import Wall from './pages/wall/Wall';
import Post from './pages/posts/Post';
import Profile from './pages/profile/Profile';
import { ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import {   useLayoutEffect, useState } from 'react'; 
import PersonalDetails from './pages/profile/personal/PersonalDetails';
import darkTheme  from './mui-themes/DARK_THEMES';
import  theme  from './mui-themes/LIGHT_THEMES';
import YourPosts from './pages/profile/yourposts/YourPosts';
import Draft from './pages/profile/drafts/Draft';
import YourPostsUpdateBlog from './pages/profile/yourposts/YourPostsUpdateBlog';
import { useWindowSize } from '@react-hook/window-size';
import DraftUpdate from './pages/profile/drafts/DraftUpdate';


function App() {
  const [ onlyWidth, onlyHeight ] = useWindowSize();
  const [ blogFilter , setBlogFilter ] = useState<any>();
  const [ darkMode, setDarkMode ] = useState(false);
  const [ clearListings, setClearListings ] = useState(false);

  const [ managePageSize, setManagePageSize ] = useState<boolean>(false)
  
  function toggleLightDark() {
    setDarkMode(prev => !prev)
  }



  useLayoutEffect(() => { //* SEPARATE NON-SCROLLING PAGES
    let help = window.location.pathname.includes(
      'login'
      || 'register'
      || 'post'
      || 'profile/personal')
      setManagePageSize(help)
  }, [])
  

  return (
  <ThemeProvider theme={darkMode ? darkTheme : theme}>
    <Wrapper 
      style={{
        width: `${onlyWidth}px`, 
        height: managePageSize ? `${onlyHeight}px` : '100%',
        overflowY: managePageSize ? 'hidden' : 'auto', 
        
        }}>
      <Router>

        <Header 
          toggleLightDark={toggleLightDark}
          darkMode={darkMode}
          setBlogFilter={setBlogFilter}
          setClearListings={setClearListings}
          clearListings={clearListings}
        /> 

        
        <Routes>
            <Route path='/' element={<Landing />} />

          <Route path='wall' element={ <Wall 
              blogFilter={blogFilter}
              setBlogFilter={setBlogFilter}
              clearListings={clearListings}
              setClearListings={setClearListings}
            /> } 
          />   
          

          <Route path='login' element={ <Login  /> } /> 
          <Route path='register' element={ <Register /> } /> 
          <Route path='post' element={ <Post /> } />

          <Route path='profile' element={ <Profile /> }>
            <Route path='' element={ <YourPosts /> }>
              <Route path='updatepost' element={ <YourPostsUpdateBlog /> } />
            </Route> 

            <Route path='personal' element={ <PersonalDetails /> } /> 
            <Route path='draft' element={ <Draft /> }>
              <Route path='updatepost' element={ <DraftUpdate   /> } /> 
            </Route> 

          </Route> 

        </Routes> 


      </Router>
    </Wrapper>
  </ThemeProvider>
  );
}

export default App;


const Wrapper = styled.main`
  min-height: 100%;
  top: 0;
  left: 0;
  position: relative;
`