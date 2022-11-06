import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function PersonalDetails() {

  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
console.log(firstName, lastName, email, password)
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    <Grid container spacing={6}>
      <Grid item xs={12} >
        <TextField
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name"
          name="firstName"
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
      </Grid>
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
      <Grid item xs={12}>
        <TextField
        onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          name="password"
          label="Confirm Password"
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
      sx={{ mt: 3, mb: 2, p: 2 }}
    >
      Update details
    </Button>
    </Box>
    </Box>
</Container>
  )
}
