import { Box, Typography } from '@mui/material'




export default function Banner() {
  return (
    <Box sx={{
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      pt: 10,
      mb: 12,
      mt: 2
    }}>
      
    <Typography variant='body2' 
          sx={{
            fontSize: '0.875rem',
            fontWeight: '700',
            color: '#0072E5'
          }}>
      Blog
    </Typography>
        
    <Typography variant='h1' >
      The 
      <span style={{
        background: 'linear-gradient(to right, #007FFF, #0059B2)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '700'
      }}> latest </span> 
      made up stuff
    </Typography>
      
  </Box>
  )
}
