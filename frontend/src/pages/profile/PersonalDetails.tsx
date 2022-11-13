import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography,  } from '@mui/material'
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { updateUser } from '../../actions/userActions';
import { useAppDispatch } from '../../app/hook';
import DetailSlots from './DetailSlots';

export default function PersonalDetails() {

  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ localData , setLocalData ] = useState<any>({});

  const dispatch = useAppDispatch();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem('userInfo') || ""))
  }, [])

  function editPersonalDetails() {

  }
  function handleUpdateUser() {
    dispatch(updateUser({
      firstName: 'biggo',
      lastName: 'biggo',
      email: 'biggo',
    })
    )
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
    {/* <LockOutlinedIcon /> */}
    </Avatar>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3,}} >
    <Grid container >

      <DetailSlots 
        attribute='First Name'
        detail={localData.firstName} 
        editPersonalDetails={editPersonalDetails}
      />
      <DetailSlots 
        attribute='Last Name'
        detail={localData.lastName} 
        editPersonalDetails={editPersonalDetails}
      />
      <DetailSlots 
        attribute='Email'
        detail={localData.email} 
        editPersonalDetails={editPersonalDetails}
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
