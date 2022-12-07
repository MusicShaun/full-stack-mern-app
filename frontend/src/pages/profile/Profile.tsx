import { CssBaseline, Container, Box, Stack, Divider,Typography, Button } 
from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import usePerfectWindowHeight from "../../hooks/usePerfectWindowHeight";
import { useWindowSize} from "@react-hook/window-size";
import ProfileMUIButtons from "./ProfileMUIButtons";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { updateUser } from '../../actions/userActions';
import { getPictures, postPicture } from "../../actions/pictureActions";
import { deletePictures } from "../../features/picturesSlice";
import { getBlogs } from "../../actions/blogActions";
import { deleteWallPosts } from "../../features/wallPostsSlice";


export default function Profile() {


  const [onlyWidth, onlyHeight] = useWindowSize(); 
  let screenHeight = usePerfectWindowHeight(onlyHeight);
  const dispatch = useAppDispatch() ; 
  const [ localData , setLocalData ] = useState<any>({});
  const wallPostState = useAppSelector(state => state.getWallPostState.value)
  const picturesForUsers = useAppSelector(state => state.picturesState.value)
  const [match, setMatch] = useState('');
  const [resetProfilePic, setResetProfilePic] = useState(0);
  const [disableWidgetButton, setDisableWidgetButton] = useState(false);

  useEffect(() => { 
    setLocalData(JSON.parse(localStorage.getItem('userInfo') || ""))
    dispatch(deletePictures())
    dispatch(getPictures())
    dispatch(deleteWallPosts())
    dispatch(getBlogs())
    // eslint-disable-next-line
  }, [resetProfilePic])

  useEffect(() => {
    getProfilePicture()
        // eslint-disable-next-line
  }, [localData, wallPostState, picturesForUsers])


  function getProfilePicture() { //* FINDS PROFILE PICTURE MATCH
    let helper = wallPostState.find((item: any) => {
      return item.firstName === localData.firstName && item;
    })
    if (Object.keys(picturesForUsers).length === 0 || picturesForUsers.length === 0 || !helper) {
      console.log('empty object refused')
      return;
    }
    if (Object.keys(helper).length !== 0 && helper) {
      picturesForUsers.pictures.find((pic: any) => {
        return pic.user === helper.user && setMatch(pic.profilePicture.toString());
      })
    } else {
      return setMatch('alt');
    }
    return match
  }
  


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
          if (result.event === 'success' ) {
            dispatch(postPicture({
              profilePicture: `https://res.cloudinary.com/dyneqi48f/image/upload/${result.info.path}`,
              id: localData._id
            })
          )
        }
      } catch {
        console.log(error)
      } finally {
        if (result.event === 'close' ) {
          dispatch(updateUser({
            firstName: localData.firstName,
            lastName: localData.lastName,
            email: localData.email,
            _id: localData._id,
            password: '', 
          })
          )
          getUpdatedWallPosts();
        }
        setDisableWidgetButton(false)
      }
    })
    widget.open(); 
  }


  async function getUpdatedWallPosts() {
    dispatch(getBlogs())
    setResetProfilePic(prev => prev +=1 )
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
        p: onlyWidth > 600 ? "lg" : 0,
        transition: 'all 0.1s', ///// WHY ARE THERE WEIRD SLOW TRANSITIONS?!
      }}>
      <Box sx={{
        width: '30%',
        maxWidth: '400px',
        display: { xs: 'none', md: 'flex' } ,
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


        <div style={{width: '100%', aspectRatio: '1/1', borderRadius: '50%', border: '1px solid lightgrey',
            backgroundImage: `url(${match})`,
             backgroundSize: 'contain'
          }}>
          <Button variant='contained' onClick={openWidget} disabled={disableWidgetButton}>Choose image </Button>
        </div>
        
          <ProfileMUIButtons text='YOUR POSTS' destination='/profile' />
          <ProfileMUIButtons text='PERSONAL DETAILS' destination='/profile/personal' />
          <ProfileMUIButtons text='DRAFT' destination='/profile/draft' />
          <div style={{flexGrow: 1}}></div>
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