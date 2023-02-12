import { CssBaseline, Container, Box } from "@mui/material";
import React, { useEffect  } from "react";
import usePerfectWindowHeight from "../../hooks/usePerfectWindowHeight";
import { useWindowHeight} from "@react-hook/window-size";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchUsersBlogs } from "../wall/wallSlice";
import { Outlet } from "react-router-dom";
import { UserType, selectUser, userStatusIdle } from "../users/usersSlice";
import ProfileMenuColumn from "./ProfileMenuColumn";


export default function Profile() {
  
  const onlyHeight = useWindowHeight(); 
  let screenHeight = usePerfectWindowHeight(onlyHeight);
  const dispatch = useAppDispatch(); 
  
  const user: UserType = useAppSelector(selectUser)

  useEffect(() => { 
    dispatch(fetchUsersBlogs(user._id!))
  }, [dispatch, user])
  useEffect(() => {
    dispatch(userStatusIdle())
  },[dispatch])



  
return (
  <React.Fragment>
  <CssBaseline />
    <Container maxWidth="lg"
      sx={{
        minHeight: `${screenHeight }px`,
        mt: {xs: '120px', md : 10},
        display: 'flex',
        bgcolor: 'background',
        flexDirection: {xs: 'column', md: 'row' },
        p: { xs: 0, md: 0 },
        transition: 'all 0.1s', ///// WHY ARE THERE WEIRD SLOW TRANSITIONS?!
      }}>

      <ProfileMenuColumn /> {/*//* left hand side  */}

      <Box sx={{ //* Right hand side 
        position: 'relative',
        transform: 'translateZ(0)',
        height: '100%',
        minHeight: `${screenHeight }px`,
        width: '100%',
        maxWidth: {sm: '95%', md: '100%'},
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Outlet />
      </Box>

    </Container>
  </React.Fragment>
)
}