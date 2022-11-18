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
import {  useState } from 'react'; 
import PersonalDetails from './pages/profile/PersonalDetails';
import darkTheme  from './mui-themes/DARK_THEMES';
import  theme  from './mui-themes/LIGHT_THEMES';
import YourPosts from './pages/profile/YourPosts';
import { useAppSelector } from "./app/hook";
import Draft from './pages/profile/Draft';
import YourPostsUpdateBlog from './pages/profile/YourPostsUpdateBlog';
import { useWindowSize } from '@react-hook/window-size';



function App() {
  const [ onlyWidth, onlyHeight ] = useWindowSize();
  const [ blogContent, setBlogContent ] = useState<any | null>();
  const [ blogFilter , setBlogFilter ] = useState<any>();
  const [ darkMode, setDarkMode ] = useState(false);
  const [ clearListings, setClearListings ] = useState(false);
  const updateSelector = useAppSelector(state => state.showUpdateSlice)

  function toggleLightDark() {
    setDarkMode(prev => !prev)
  }


  

  return (
  <ThemeProvider theme={darkMode ? darkTheme : theme}>
    <Wrapper 
      style={{
        width: `${onlyWidth}px`, 
        height: window.location.href.includes('login' || 'register' || 'post' || 'profile/personal')
          ? `${onlyHeight}px` : '100%',
        overflowY: window.location.href.includes('login' || 'register' || 'post' || 'profile/personal')
        ? 'hidden' : 'scroll' 
        }}>
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

          </Route> 
          <Route path='profile' element={ <Profile /> }>
            <Route path='' element={ <YourPosts setBlogContent={setBlogContent} blogContent={blogContent}/> }>
              <Route path='updatepost' element={ <YourPostsUpdateBlog   updateNumber={updateSelector.value.counter} /> } />
            </Route> 

            <Route path='personal' element={ <PersonalDetails /> } /> 
            <Route path='draft' element={ <Draft /> } /> 

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