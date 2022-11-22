import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';


interface IProps {
  resetFormInputs: () => void;
}


export default function AreYouSure({resetFormInputs} : IProps) {
  return (

    <Container  maxWidth={false}
    sx={{
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    zIndex: 20,
    
}}>
  <Paper elevation={3} sx={{
    position: 'relative',
    width: `80%`, 
    minWidth: '400px',
    height: '86%',
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
            sx={{ maxWidth: '400px',
              
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
            }}
        >
      Okay
    </Button>
    <Button 
            // onClick={finishButton}
            // component={RouterLink} to='./' 
            variant="contained" color="primary" type="submit" size="large" 
            sx={{
              backgroundColor: 'primary.light', 
              fontWeight: 600,
            }}
        
        >
      Cancel
    </Button>
  </Box>
  </Paper>
</Container>


  )
}
