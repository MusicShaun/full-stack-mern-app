import { CssBaseline, Container, Box, Stack, Divider,Typography, Button } 
from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import usePerfectWindowHeight from "../../hooks/usePerfectWindowHeight";
import { useWindowHeight} from "@react-hook/window-size";
import ProfileMUIButtons from "./ProfileMUIButtons";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getBlogs } from "../../actions/blogActions";
import { deleteWallPosts } from "../../features/wallPostsSlice";
import { getUserPicture } from "../../actions/pictureActions";
import { updateUser } from '../../actions/userActions'


export default function Profile() {
  
  const onlyHeight = useWindowHeight(); 
  let screenHeight = usePerfectWindowHeight(onlyHeight);
  const dispatch = useAppDispatch() ; 
  const userProfilePicture = useAppSelector(state => state.userProfilePicture.value)
  const [disableWidgetButton, setDisableWidgetButton] = useState(false);

  useEffect(() => { 
    dispatch(getUserPicture())
    dispatch(deleteWallPosts())
    dispatch(getBlogs())
    // eslint-disable-next-line
  }, [])


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
            dispatch(updateUser({ profilePicture: `https://res.cloudinary.com/dyneqi48f/image/upload/${result.info.path}`}))
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
  <React.Fragment>
  <CssBaseline />
    <Container maxWidth="lg"
      sx={{
        minHeight: `${screenHeight - 40}px`,
        mt: {xs: '120px', md : 10},
        display: 'flex',
        bgcolor: 'background',
        flexDirection: {xs: 'column', md: 'row' },
        p: { xs: 0, md: 0 },
        transition: 'all 0.1s', ///// WHY ARE THERE WEIRD SLOW TRANSITIONS?!
      }}>
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
            backgroundImage: `url(${userProfilePicture})`, 
             backgroundSize: 'contain'
          }}>
          <Button variant='contained' onClick={openWidget} disabled={disableWidgetButton}>Choose image </Button>
        </div>
        
          <ProfileMUIButtons text='YOUR POSTS' destination='/profile' />
          <ProfileMUIButtons text='PERSONAL DETAILS' destination='/profile/personal' />
          <ProfileMUIButtons text='DRAFT' destination='/profile/draft' />
          <ProfileMUIButtons text='' destination='/profile/' flexer={true}  />
        </Stack>
      </Box>


      <Box sx={{
        position: 'relative',
        height: '100%',
        maxWidth: {sm: '95%', md: '100%'},
        width: '100%',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Outlet />
      </Box>

    </Container>
  </React.Fragment>
)
}