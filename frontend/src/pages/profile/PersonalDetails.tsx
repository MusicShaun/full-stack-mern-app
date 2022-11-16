import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField,  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { updateUser } from '../../actions/userActions';
import { useAppDispatch } from '../../app/hook';
import DetailSlots from './PersonalDetailsSlots';

export default function PersonalDetails() {

  const [ localData , setLocalData ] = useState<any>({});
  const [ firstName, setFirstName ] = useState(localData.firstName);
  const [ lastName, setLastName ] = useState(localData.lastName);
  const [ email, setEmail ] = useState(localData.email);
  const [ password, setPassword ] = useState("");
  const [ counter , setCounter ] = useState(0); 
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem('userInfo') || ""))
  }, [])

  function handleUpdateUser(e: React.SyntheticEvent) {
    e.preventDefault();
    if(!password) {
      alert('Please enter your password')
    } else {
      dispatch(updateUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        _id: localData._id,
        password: password, 
      })
      )
      setPassword("")
      setCounter(prev => prev += 1)
    }
  }

  return (
    <Container  maxWidth='xl'
    sx={{position: 'relative', 
        height: '100%',
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
      height: '100%',
      minHeight: '500px',
      bgcolor: 'primary.contrastText',
      borderRadius: '10px'
    }}
    >
    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
    </Avatar>
    <Box component="form" noValidate sx={{ mt: 3,}} >
    <Grid container >

      <DetailSlots 
        setFirstName={setFirstName}
        attribute='First Name'
        textFieldString={localData.firstName} 
        counter={counter}
        type='name'
      />
      <DetailSlots 
        setLastName={setLastName}
        attribute='Last Name'
        textFieldString={localData.lastName} 
        counter={counter}
        type='surname'
      />
      <DetailSlots 
        setEmail={setEmail}
        attribute='Email'
        textFieldString={localData.email} 
        counter={counter}
        type='email'
      />

      <Grid item xs={12}>
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          autoComplete="new-password"
        />
      </Grid>

    </Grid>
    <Button
      onClick={handleUpdateUser}
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2, p: 2 }}
    >
      Update details
    </Button>
    </Box>
    </Box>
</Container>
  )
}
