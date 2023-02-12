import {  Box, Container, CssBaseline, Grid, Typography,  } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import PostFinish from '../../../components/PostFinish';
import DetailSlots from './PersonalDetailsSlots';
import {  useWindowSize} from "@react-hook/window-size";
import usePerfectWindowHeight from "../../../hooks/usePerfectWindowHeight";
import { UserType, selectUser, selectUserStatus, updateUser } from '../../users/usersSlice';

export default function PersonalDetails() {
  
  const [ onlyWidth, onlyHeight] = useWindowSize(); 
  let screenHeight = usePerfectWindowHeight(onlyHeight);

  const dispatch = useAppDispatch()

  const user: UserType = useAppSelector(selectUser)
  const userStatus: string = useAppSelector(selectUserStatus)

  function handlePutUpdate(updatedItem: any) { 
    const { firstName, lastName, email } = updatedItem
    dispatch(updateUser({
      _id: user._id,
      token: user.token,
      firstName: firstName || user.firstName, 
      lastName: lastName || user.lastName, 
      email: email || user.email, 
      profilePicture: user.profilePicture
    }))
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

  {userStatus === 'succeeded' && <PostFinish  name='personal details' />}

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
        textFieldString={user.firstName!} 
        type='name'
        handlePutUpdate={handlePutUpdate}
      />
      <DetailSlots 
        attribute='Last Name'
        textFieldString={user.lastName!} 
        type='surname'
              handlePutUpdate={handlePutUpdate}
      />
      <DetailSlots 
        attribute='Email'
        textFieldString={user.email} 
        type='email'
              handlePutUpdate={handlePutUpdate}
      />


    </Grid>
    </Box>
      </Box>
</Container>
  )
}
