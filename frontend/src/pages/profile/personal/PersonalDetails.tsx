import {  Box, Container, CssBaseline, Grid, Typography,  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { updateUser } from '../../../actions/userActions';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import Loader from '../../../components/Loader';
import PostFinish from '../../../components/PostFinish';
import DetailSlots from './PersonalDetailsSlots';
import {  useWindowSize} from "@react-hook/window-size";
import usePerfectWindowHeight from "../../../hooks/usePerfectWindowHeight";

export default function PersonalDetails() {
  const [ onlyWidth, onlyHeight] = useWindowSize(); 

  const [ localData , setLocalData ] = useState<any>({});
  const [ counter , setCounter ] = useState(0); 
  const dispatch = useAppDispatch();
  const [ postFinish, setPostFinish ] = useState<boolean>(false);
  const loading = useAppSelector(state => state.loadingState.value.booly)

  let screenHeight = usePerfectWindowHeight(onlyHeight);

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem('userInfo') || ""))
  }, [])

  function handlePatchUpdate(updatedItem: any) {
      dispatch(updateUser({
        _id: localData._id,
        ...updatedItem
      }))
      setCounter(prev => prev += 1)
      setPostFinish(true)
  }

  return (
    <Container  
        maxWidth='xl'
      sx={{position: 'relative', 
          height: `${screenHeight}px`,
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
      pt: 0,
    }}
    >
    <Typography variant='h1' 
        sx={{ color: 'text.secondary', width: '100%', 
          borderColor: 'text.primary',
          borderWidth: '0px 0px 1px 0px',
          borderStyle: 'solid', pb: 4, pt: 4}}>
      Personal Details
    </Typography>

    <Box component="form" noValidate sx={{width: '100%',}} >
    <Grid container sx={{flexWrap: 'none', flexDirection: 'column', 
        }}>

      <DetailSlots 
        attribute='First Name'
        textFieldString={localData.firstName} 
        counter={counter}
        type='name'
        handlePatchUpdate={handlePatchUpdate}
      />
      <DetailSlots 
        attribute='Last Name'
        textFieldString={localData.lastName} 
        counter={counter}
        type='surname'
        handlePatchUpdate={handlePatchUpdate}
      />
      <DetailSlots 
        attribute='Email'
        textFieldString={localData.email} 
        counter={counter}
        type='email'
        handlePatchUpdate={handlePatchUpdate}
      />


    </Grid>

    </Box>
    </Box>
</Container>
  )
}
