import { CardMedia, Container, Paper, Typography, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import backdrop from '../components/art/backdrop.webp';
import arrow from '../components/art/icons8-up-arrow-100.png';
import { useWindowHeight } from '@react-hook/window-size';
import usePerfectWindowHeight from '../hooks/usePerfectWindowHeight';
import styled from 'styled-components';

export default function Landing( ) {
  const onlyHeight = useWindowHeight();
  let screenHeight = usePerfectWindowHeight(onlyHeight);
  let isDarkTheme = useTheme().palette.mode === 'dark';

  return (
    <Container  maxWidth={false}
    sx={{
      position: 'relative',
      height: window.location.href.includes('wall') ? '100%' : `${screenHeight}px`,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      mt: 10
    }}>


    {!window.location.href.includes('wall') &&   
    <><CardMedia src={backdrop} 
        component="img"
        height="100%"
        sx={{position: 'absolute',
        filter:`${isDarkTheme ? 'grayscale(50%)' : 'grayscale(0%)'}  
        ${isDarkTheme ? 'brightness(0.5)' : 'brightness(1.2)'}`  
        }}
        /> 

    <Paper  elevation={2}
      sx={{
      position: 'relative',
      p: 3, 
      borderRadius: 23, 
      color: '#1A2027', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'width 0.4s, max-height 0.6s, box-shadow 0.2s, transform 0.2s ',
      backgroundColor: 'secondary.contrastText',
      minHeight: '300px',
      maxWidth: '330px',
      justifyContent: 'center',
      filter: '',
      ":hover": {
        boxShadow: 3,
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease',
        },
      }}          
      >

    <Typography variant='h2' 
        sx={{mb: '5px', 
              fontSize: '2.2em', 
              color: 'text.secondary',
              textAlign: 'center'
              }}>
      This site is for example purposes. <br /><br /> 
      Please do not enter your personal contact information. 
    </Typography>

    </Paper>

    <Container  maxWidth='lg' sx={{position: 'absolute', height: '100%', }}>
    <Anime />
    </Container>
    </>}

      <Outlet />
      
  </Container>
  )
}


const Anime = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 5%;
  right:5%;
  background-image: url(${arrow});
  background-size: 100%;
  animation: direct 1s cubic-bezier(0.14, 0.42, 0.39, 0.87) alternate infinite; 
  filter: invert(1);
  border: none;

  @keyframes direct {
    0% {
      top: 0%;
    } 100% {
      top: 7%;
    }
  }
`