import { CssBaseline, Container, Box, Stack, Divider,Typography, Button } 
from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import usePerfectWindowHeight from "../../hooks/usePerfectWindowHeight";
import { useWindowSize} from "@react-hook/window-size";
import ProfileMUIButtons from "./ProfileMUIButtons";
import { useAppDispatch } from "../../app/hook";
import { updateUser } from '../../actions/userActions';
import { getWallPosts } from "../../features/wallPostsSlice";
import axios from "axios";

interface IProps {
  setBlogContent: React.Dispatch<SetStateAction<any | null>>;
  blogContent: object[];
}

export default function Profile( { setBlogContent, blogContent } : IProps ) {
  
  const [onlyWidth, onlyHeight] = useWindowSize(); 
  let screenHeight = usePerfectWindowHeight(onlyHeight);
  const dispatch = useAppDispatch() ; 
  const [ localData , setLocalData ] = useState<any>({});

  useEffect(() => { // SORT OUT WHERE THE PROFILE PICTURE IS LOCATED BECAUSE THIS IS A HACKY PILE OF SHIT NOW 
    setLocalData(JSON.parse(localStorage.getItem('userInfo') || ""))
    if (!profilePicture && localData) {
      setProfilePicture(localData.profilePicture)
    }
    // eslint-disable-next-line
  }, [])
  const [ profilePicture, setProfilePicture ] = useState<string>('');
  
  async function openWidget (e: React.SyntheticEvent) {
    e.preventDefault();
    const widget = await window.cloudinary.createUploadWidget({
        cloudName: 'dyneqi48f',
        uploadPreset: 'pnxfhczl',
        sources: ['local', 'url', 'camera'],
        secure: true
    }, 
     (error: any, result:  any) => {
        try {
          if (result.event === 'success' ) {
            setProfilePicture(`https://res.cloudinary.com/dyneqi48f/image/upload/${result.info.path}`)
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
            profilePicture: profilePicture ? profilePicture : localData.profilePicture, 
          })
          )
          getUpdatedWallPosts();
        }
      }
    })
    widget.open(); 
  }


  async function getUpdatedWallPosts() {
    try { 
      const data = await axios.get('/api/bloggers', {
      }) 
      dispatch(getWallPosts(data.data))
      setBlogContent(data.data)
    } catch (error) {
      console.log(error)
    } 
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
        backgroundImage: `url(${localData.profilePicture})`, backgroundSize: 'contain'}}>
          <Button variant='contained' onClick={openWidget}>Choose image </Button>
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