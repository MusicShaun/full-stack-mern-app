

import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material";

const shadowKeyUmbraOpacity = 0.05;
const shadowKeyPenumbraOpacity = 0.035;
const shadowAmbientShadowOpacity = 0.03;

function createShadow(...px: number[]) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(100,100,100,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`,
  ].join(',');
}


const darkTheme = createTheme({
  shadows: [
    'none',
    `2px 2px 3px ${grey[900]} `, //header
    `#1a202 -2px -3px 1px 0px, rgb(0,157, 255, 15%) 0px 3px 3px 2px, rgb(0,0,0,20%) 3px 4px 4px 0px`, //card 
    '#1a202 -2px -3px 0px 0px, rgb(0,0, 0, 20%) 2px 5px 5px -3px, #1a202 -20px 19px 10px 2px', //card hover
    'rgb(0,0, 0, 20%) 2px 5px 5px -3px, #1a202  -12px 12px 6px 2px', //button hover left
    ' rgb(0,0, 0, 20%) 2px 5px 5px -3px, #1a202  12px 12px 6px 2px', //button hover right
    createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],

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
    h6: {
      fontSize: '1.3rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
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
      contrastText: 'rgb(19, 47, 76)'
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



export default darkTheme ;