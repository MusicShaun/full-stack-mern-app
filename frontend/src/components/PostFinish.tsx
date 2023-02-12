import { Typography,Button,Box, Container, Paper } from "@mui/material";
import {  useNavigate } from 'react-router-dom';
import {  useAppDispatch, useAppSelector } from "../app/hook";
import { selectBlogsMessage, statusIdle } from "../features/wall/wallSlice";
import { selectUserMessage, userStatusIdle } from "../features/users/usersSlice";

interface IProps  {
  name?: string; 
}

export default function PostFinish( { name}:IProps) {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const postMessage = useAppSelector(selectBlogsMessage)
  const userMessage = useAppSelector(selectUserMessage)

  function finishButton(e: any) {
    e.preventDefault()  
    dispatch(statusIdle())
    if (name === 'post') {
      navigate('/wall')
    } else if (name === 'personal details') {
      dispatch(userStatusIdle())
    }
  }
  
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
        <Typography variant='h1'>
          {name === 'post' ? postMessage : userMessage}
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
          onClick={(e) => finishButton(e)}
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