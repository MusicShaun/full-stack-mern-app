import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useWindowHeight } from "@react-hook/window-size";
import { Link as RouterLink } from 'react-router-dom';

interface IProps {
  resetFormInputs: () => void
}

export default function AreYouSure({ resetFormInputs }: IProps) {
  const onlyHeight = useWindowHeight();

  return (
  <Container  maxWidth={false}
    sx={{
    position: 'absolute',
    width: '100%',
    height: `calc(${onlyHeight}px - 80px)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    zIndex: 20,
    
}}>
  <Paper elevation={3} sx={{
    position: 'relative',
    width: {xs: '95%', md: '80%'}, 
    minWidth: '300px',
    height: '60%',
    maxHeight: '700px',
    p: 3, 
    borderRadius: 3, 
    color: '#1A2027', 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 5,
    ":hover": {
      boxShadow: 8,
      },
    }}
    >
    <Typography variant='h1' 
        sx={{ maxWidth: '400px', textAlign: 'center'
          
        }}>
        Are you sure you want to delete your progress? <br /><br/> It will not delete the draft.
      </Typography>

  <Box component="form"  sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '300px',
        width: '70%',
      }}>

    <Button 
      onClick={() => resetFormInputs()}
      component={RouterLink} to='../post' 
      variant="contained" color="primary" type="submit" size="large" 
      sx={{
        backgroundColor: 'error.main', 
        fontWeight: 600,
        width: '100px',
        mb: 2
      }}
      >
      DELETE
    </Button>
    <Button 
      variant="contained" color="primary" type="submit" size="large" 
      sx={{
        backgroundColor: 'primary.light', 
        fontWeight: 600,
        width: '100px'
      }}
       >
      Cancel
    </Button>
  </Box>
  </Paper>
</Container>


  )
}
