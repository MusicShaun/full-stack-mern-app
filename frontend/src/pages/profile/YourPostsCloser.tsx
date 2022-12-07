
import { Typography,Button,Box, Container, Paper } from "@mui/material";
import axios from "axios";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { falseBoolean } from "../../features/patheticBooleanSlice";
import { showUpdateFalse } from "../../features/showUpdateSlice";
import { deleteWallPosts, getWallPosts } from "../../features/wallPostsSlice";



export default function YourPosts_Finish( ) {

  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  const finalMessage = useAppSelector(state => state.loaderState.value.message)

  async function handleFinish() {
    dispatch(falseBoolean())
    dispatch(showUpdateFalse())
    dispatch(deleteWallPosts())

    setTimeout(() => {
      getUpdatedWallPosts()
    }, 50)

  }
async function getUpdatedWallPosts () {
  try { 
    const res = await axios.get('/api/bloggers', {
    }) 
    dispatch(getWallPosts(res.data.blogs))
    console.log('Post update complete')
    navigate('./')
  } catch (error) {
    console.log(error)
  } 
}
  


  return (

      <Container  
          sx={{
          position: 'absolute',
          left: 0, 
          top: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          zIndex: 20,
          
      }}>
        <Paper elevation={3} sx={{
          position: 'relative',
          width: `50%`, 
          minWidth: '200px',
          height: '50%',
          maxHeight: '400px',
          p: 3, 
          borderRadius: 3, 
          color: '#1A2027', 
          bgcolor: 'rgba(255,255,255,0.5)',
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
                    sx={{
                      
                    }}>
                {finalMessage} 
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
                  onClick={handleFinish}
                  component={RouterLink} to='/profile' 
                  variant="contained" color="primary" type="submit" size="large" 
                  sx={{
                    backgroundColor: 'primary.light', 
                    fontWeight: 600,
                  }}
              
              >
            Okay
          </Button>
        </Box>
        </Paper>
    </Container>


  )
}