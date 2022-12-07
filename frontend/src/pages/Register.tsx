
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  useEffect } from 'react'; 
import { useNavigate, Link as RouterLink, } from 'react-router-dom';
import { useAppDispatch , useAppSelector } from '../app/hook';
import { registerUser } from '../actions/userActions';
import usePerfectWindowHeight from '../hooks/usePerfectWindowHeight';
import { useWindowHeight } from '@react-hook/window-size';
import LoginBackground from '../components/LoginBackground';



export default function Register() {
  const onlyHeight = useWindowHeight(); 
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedInStatus = useAppSelector((state) => state.loggedInState);

  useEffect(() => {
    if (loggedInStatus.value) {
      navigate('/wall')
    }
    // eslint-disable-next-line
  }, [loggedInStatus])


  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData.get('firstName') || !formData.get('lastName') || !formData.get('email') || !formData.get('password') ){
      alert('Please fill in the missing field')
    }
    dispatch(registerUser({
      firstName: formData.get('firstName')!, 
      lastName: formData.get('lastName')!, 
      email: formData.get('email')!, 
      password: formData.get('password')!
    }));
  };

  return (
      <Container  maxWidth="xs" 
        sx={{
          // position: 'relative', 
          height: `${usePerfectWindowHeight(onlyHeight)}px`,
          mt: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
            }}> 
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: '2rem',
            height: '60%',
            minHeight: '480px',
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
          <Typography component="h1" variant="h5" sx={{color: 'text.secondary'}}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to='/login' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <LoginBackground onlyHeight={onlyHeight} />
        
      </Container>
  );
}