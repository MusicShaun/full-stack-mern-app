import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useWindowHeight } from '@react-hook/window-size';
import usePerfectWindowHeight from '../../hooks/usePerfectWindowHeight';
import LoginBackground from './LoginBackground';
import { useEffect } from 'react';
import { loginUser, selectUserStatus } from '../users/usersSlice';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Shaun's Practice Full Stack
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}





export default function Login(  )  {
  const onlyHeight = useWindowHeight();

  let navigate = useNavigate();
  const dispatch = useAppDispatch()
  const userStatus = useAppSelector(selectUserStatus)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    dispatch(loginUser({
      email: (formData.get('email')!).toString(), 
      password: (formData.get('password')!).toString()
    }))
  }

  useEffect(() => {
    if (userStatus === 'succeeded') {
      navigate('/wall',  { replace: true })}
  }, [userStatus, navigate])


  useEffect(() => { // CHECK LOGGED ON
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    if (userInfo.token) {
    } else if (window.location.pathname !== '/register' && window.location.pathname !== '/') {
      navigate('/login')
    }
  }, [navigate])

  return (
      <Container  maxWidth="xs"
        sx={{
          height: `${usePerfectWindowHeight(onlyHeight)}px`,
          mt: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // position: 'relative'
        }}>
      
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60%',
            minHeight: '480px',
            p: '2rem',
            bgcolor: 'primary.contrastText',
            borderRadius: '10px',
            borderWidth: '2px ',
            borderStyle: 'solid ',
            borderColor: 'secondary.main',
            zIndex: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{color: 'text.secondary'}} >
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {/* Forgot password? */}
                </Link>
              </Grid>
              <Grid item>
                  <Link component={RouterLink} to='/register' 
                        variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>  
              </Grid>
            </Grid>
          </Box>
        </Box>

        <LoginBackground onlyHeight={onlyHeight} />

        <Copyright />
      </Container>
  );
}

