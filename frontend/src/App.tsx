import {Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./features/login/Login";
import Landing from "./features/Landing";
import Register from "./features/login/Register";
import Wall from './features/wall/Wall';
import Post from './features/posts/Post';
import Profile from './features/profile/Profile';
import styled from 'styled-components';
import {   useLayoutEffect, useState } from 'react'; 
import PersonalDetails from './features/profile/personal/PersonalDetails';
import YourPosts from './features/profile/yourposts/YourPosts';
import Draft from './features/profile/drafts/Draft';
import YourPostsUpdateBlog from './features/profile/yourposts/YourPostsUpdateBlog';
import { useWindowSize } from '@react-hook/window-size';
import DraftUpdate from './features/profile/drafts/DraftUpdate';
import Layout from './components/Layout';


function App() {
  const [ onlyWidth, onlyHeight ] = useWindowSize();
  const [managePageSize, setManagePageSize] = useState<boolean>(false)
  const navigate = useNavigate()

  useLayoutEffect(() => { //* SEPARATE NON-SCROLLING PAGES
    let help = window.location.pathname.includes(
      'login'
      || 'register'
      || 'post'
      || 'profile/personal')
    setManagePageSize(help)
  }, [navigate])
  

  return (
 
    <Wrapper 
      style={{
        width: `${onlyWidth}px`, 
        height: managePageSize ? `${onlyHeight}px` : '100%',
        overflowY: managePageSize ? 'hidden' : 'auto',     
        }}>

      
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} /> 
          <Route path='wall' element={ <Wall /> } />   
          <Route path='login' element={ <Login  /> } /> 
          <Route path='register' element={ <Register /> } /> 
          <Route path='post' element={ <Post /> } />

          <Route path='profile' element={ <Profile /> }>
            <Route path='your-posts' element={ <YourPosts /> } /> 
            <Route path='your-posts/update-post' element={<YourPostsUpdateBlog />} />
            
                
            <Route path='personal' element={<PersonalDetails />} /> 
              
            <Route path='draft'>
              <Route index element={<Draft />} />
              <Route path='update-post' element={ <DraftUpdate   /> } /> 
            </Route> 

          </Route>  
                        
        </Route>
          
      </Routes> 


    </Wrapper>
  );
}

export default App;


const Wrapper = styled.main`
  min-height: 100%;
  top: 0;
  left: 0;
  position: relative;
`