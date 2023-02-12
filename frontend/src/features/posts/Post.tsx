import { Container,CssBaseline } from "@mui/material";
import * as React from "react";
import { useEffect, useRef, useState } from 'react'; 
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useWindowSize} from "@react-hook/window-size";
import usePerfectWindowHeight from "../../hooks/usePerfectWindowHeight";
import AreYouSure from "./AreYouSure";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import BackGround from './PostBackground'
import AddNewPost from "./AddNewPost";
import { selectBlogsStatus, statusIdle } from "../wall/wallSlice";
import PostFinish from "../../components/PostFinish";


export default function Post() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [onlyWidth, onlyHeight] = useWindowSize(); 
  let screenHeight = usePerfectWindowHeight(onlyHeight)
  const refFocus = useRef<any>(null)

  const [ confirmDeletePost, setConfirmDeletePost ] = useState(false)

  const blogsStatus: string = useAppSelector(selectBlogsStatus)

  useEffect(() => {
    dispatch(statusIdle())
    if(refFocus.current?.focus)
      refFocus.current?.focus()
  },[dispatch])

  function resetFormInputs() {
    setConfirmDeletePost(false)
    navigate(0)
  }


  return (
  <React.Fragment>
  <CssBaseline />
    {blogsStatus === 'loading' && <Loading /> }
    {blogsStatus === 'post succeeded' && <PostFinish  name='post' />}
      
    <Container maxWidth="xl" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `${screenHeight}px`,
        mt: 10
    }}>

    <AddNewPost setConfirmDeletePost={setConfirmDeletePost} /> 

    {confirmDeletePost && <AreYouSure resetFormInputs={resetFormInputs} />}
        
    <BackGround onlyHeight={onlyHeight} />
    
  </Container>
  </React.Fragment>
  );
}