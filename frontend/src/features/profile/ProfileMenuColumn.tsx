import React, { useState } from 'react'
import ProfileMUIButtons from './ProfileMUIButtons'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { UserType, selectUser, updateUser } from '../users/usersSlice';

export default function ProfileMenuColumn() {

  const dispatch = useAppDispatch()
  const [disableWidgetButton, setDisableWidgetButton] = useState(false);
  const user: UserType = useAppSelector(selectUser)

  async function openWidget (e: React.SyntheticEvent) {
    e.preventDefault();
    setDisableWidgetButton(true)
    const widget = await window.cloudinary.createUploadWidget({
        cloudName: 'dyneqi48f',
        uploadPreset: 'pnxfhczl',
        sources: ['local', 'url', 'camera'],
        secure: true
    }, 
     (error: any, result:  any) => {
       try {
         if (result.event === 'success') {
           dispatch(updateUser({
             firstName: user.firstName,
             lastName: user.lastName,
             email: user.email,
             _id: user._id,
             profilePicture: `https://res.cloudinary.com/dyneqi48f/image/upload/${result.info.path}`
           }))
        }
      } catch {
        console.log(error)
      } finally {
        setDisableWidgetButton(false)
      }
    })
    widget.open(); 
  }





  return (
    <Box sx={{
      width: '30%',
      maxWidth: '400px',
      display: { xs: 'none', md: 'flex' },
      borderRight: '1px solid lightgrey',
      borderRightColor: 'secondary.main'
    }}>
    
      <Stack
        direction="column"
        justifyContent="flex-start"
        divider={<Divider orientation="horizontal" flexItem />}
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
      <Typography variant='h1' 
        sx={{ color: 'text.secondary', width: '100%', p: 4 }}>
            YOUR PROFILE
      </Typography>       


        <div style={{
          width: '100%',
          aspectRatio: '1/1',
          borderRadius: '50%',
          border: '1px solid lightgrey',
          borderColor: 'secondary.main',
          backgroundImage: `url(${user.profilePicture})`, 
           backgroundSize: 'contain'
        }}>
          <Button variant='contained'
            onClick={openWidget} 
            disabled={disableWidgetButton}>
            Choose image
          </Button>
      </div>
      
        <ProfileMUIButtons text='YOUR POSTS' destination='/profile/your-posts' />
        <ProfileMUIButtons text='PERSONAL DETAILS' destination='/profile/personal' />
        <ProfileMUIButtons text='DRAFT' destination='/profile/draft' />
        <ProfileMUIButtons text='' destination='/profile/' flexer={true}  />
      </Stack>
    </Box>
  )
}
