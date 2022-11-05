import { BottomNavigation, BottomNavigationAction, Paper, CssBaseline, Box } from '@mui/material';
import { Restore, Archive, Favorite } from '@mui/icons-material';



export default function Footer() {
  


  return (

    <Box sx={{  bgcolor:'secondary.main'}}>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 , bgcolor:'secondary.main'}} elevation={3}  >
      <CssBaseline />
       <BottomNavigation
          showLabels
          sx={{ bgcolor:'secondary.main'}} 
        >
          <BottomNavigationAction label="inactive" sx={{color:'primary.dark'}} icon={<Restore color='primary'/>} />
          <BottomNavigationAction label="inactive" sx={{color:'primary.dark'}} icon={<Favorite color='primary' />} />
          <BottomNavigationAction label="inactive" sx={{color:'primary.dark'}} icon={<Archive color='primary' />} />
        </BottomNavigation>
      </Paper>
      </Box>
   
  )
}

