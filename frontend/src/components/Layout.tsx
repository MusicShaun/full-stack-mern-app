import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme  from '../mui-themes/DARK_THEMES';
import theme from '../mui-themes/LIGHT_THEMES';
import Loading from './Loading';
import { useAppSelector } from '../app/hook';
import { selectUserStatus } from '../features/users/usersSlice';
import { selectBlogsStatus } from '../features/wall/wallSlice';


const Layout = () => {
  const [ darkMode, setDarkMode ] = useState(false);
  const userStatus = useAppSelector(selectUserStatus)
  const blogStatus = useAppSelector(selectBlogsStatus)

  const [ DOMLoad , setDOMLoad ] = useState(true)

  useEffect(() => {
    setDOMLoad(false)
  }, [])

  function toggleLightDark() {
    setDarkMode(prev => !prev)
  }

  let stillLoading = userStatus === 'loading' || blogStatus === 'loading' || DOMLoad


  return (
    <>
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <Header
        toggleLightDark={toggleLightDark}
        darkMode={darkMode}
        />
        {stillLoading && <Loading />}
        <Outlet />
    </ThemeProvider>  
  </>
    )
}

export default Layout