import { CardMedia, useTheme } from '@mui/material';
import paintStuff from '../components/art/paint-utensils.jpg';
import { Container } from '@mui/material'
import usePerfectWindowHeight from '../hooks/usePerfectWindowHeight';

interface WTF {
  onlyHeight: number;
}

export default function LoginBackground({onlyHeight}: WTF) {

  let isDarkTheme = useTheme().palette.mode === 'dark';
  let screenHeight = usePerfectWindowHeight(onlyHeight)

  return (
    <Container  maxWidth={false}
    sx={{
      position: 'absolute',
      height: `${screenHeight}px`,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      mt: 10,
      p: '0 !important',
      zIndex: 0,
      left: 0,
      top: 0
    }}>

<CardMedia src={paintStuff} 
        component="img"
        height="100%"
        sx={{filter: `blur(6px)
                      ${isDarkTheme ? 'grayscale(50%)' : 'grayscale(0%)'}  
                      ${isDarkTheme ? 'brightness(0.5)' : 'brightness(1.2)'}  
                      `}}
        /> 



      </Container>
  )
}
