import {  Box, Button, Container, CssBaseline, Grid, TextField, Typography,  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { updateUser } from '../../actions/userActions';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import Loader from '../../components/Loader';
import PostFinish from '../../components/PostFinish';
import DetailSlots from './PersonalDetailsSlots';
import {  useWindowSize} from "@react-hook/window-size";
import usePerfectWindowHeight from "../../hooks/usePerfectWindowHeight";

export default function PersonalDetails() {
  const [ onlyWidth, onlyHeight] = useWindowSize(); 

  const [ localData , setLocalData ] = useState<any>({});
  const [ firstName, setFirstName ] = useState(localData.firstName);
  const [ lastName, setLastName ] = useState(localData.lastName);
  const [ email, setEmail ] = useState(localData.email);
  const [ password, setPassword ] = useState("");
  const [ counter , setCounter ] = useState(0); 
  const dispatch = useAppDispatch();
  const [ postFinish, setPostFinish ] = useState<boolean>(false);
  const loading = useAppSelector(state => state.loadingState.value.booly)

  let screenHeight = usePerfectWindowHeight(onlyHeight);

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem('userInfo') || ""))
  }, [])

  async function handleUpdateUser(e: React.SyntheticEvent) {
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
      setPostFinish(true)
    }
  }

  return (
    <Container  
        maxWidth='xl'
      sx={{position: 'relative', 
          height: `${screenHeight - 40}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'primary.contrastText',
        }}> 
  <CssBaseline />

  {loading  && <Loader /> }
  {postFinish && 
      <PostFinish setPostFinish={setPostFinish}
      />}

    <Box
      sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: onlyWidth < 600 ? 0 : '2rem',
      height: 'auto',
      maxWidth: '1200px',
      width: '100%',
      borderColor: 'text.primary',
      borderWidth: '0px 0px 1px 0px',
      borderStyle: 'solid',
      borderRadius: '0px',
      pt: 1,
    }}
    >
    <Typography variant='h1' 
        sx={{ color: 'text.secondary', width: '100%', 
          borderColor: 'text.primary',
          borderWidth: '0px 0px 1px 0px',
          borderStyle: 'solid', pb: 4}}>
      Personal Details
    </Typography>

    <Box component="form" noValidate sx={{width: '100%',}} >
    <Grid container sx={{flexWrap: 'none', flexDirection: 'column', 
        }}>

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
      variant="outlined"
      sx={{ mt: 3, mb: 2, p: 2, fontWeight: '700'}}
    >
      Update details
    </Button>
    </Box>
    </Box>
</Container>
  )
}
