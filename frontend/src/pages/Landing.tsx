import { Button, CardMedia, Container, Paper, Typography, useTheme } from '@mui/material';
import backdrop from '../components/art/backdrop.webp';
import { useWindowHeight } from '@react-hook/window-size';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const onlyHeight = useWindowHeight();
  let isDarkTheme = useTheme().palette.mode === 'dark';
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  return (
    <Container
      
      maxWidth={false}
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: `${onlyHeight}px`,
        width: '100%',
        display: 'flex',
        filter: loading ? 'blur(30px)' : 'blur(0px)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        zIndex: 9999
      }}>


        <CardMedia
          onLoad={() => setLoading(false)}
          src={backdrop}
          component="img"
          height="100%"
          sx={{
            position: 'absolute',
            filter: `${isDarkTheme ? 'grayscale(50%)' : 'grayscale(0%)'}  
        ${isDarkTheme ? 'brightness(0.5)' : 'brightness(1.2)'}`
          }}
        />

      <Paper elevation={2}
        sx={{
          position: 'relative',
          p: 3,
          borderRadius: 5,
          color: '#1A2027',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'secondary.contrastText',
          minHeight: '300px',
          maxWidth: '330px',
          justifyContent: 'center',
        }}
      >

        <Typography variant='h2'
          sx={{
            mb: '5px',
            fontSize: '2em',
            color: 'text.secondary',
            textAlign: 'center'
          }}>
          This site is for example purposes only. <br /><br />
      Please do not enter your personal contact information.
            <Button variant='outlined' sx={{p: 5, fontSize: '2rem', border: 2}} onClick={() => navigate('/wall')}>Enter</Button>
        </Typography>

      </Paper>

  </Container>
    
  )
}

