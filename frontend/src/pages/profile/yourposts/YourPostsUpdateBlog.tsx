import { Box, Button, TextField } from '@mui/material'
import React , {useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { updateBlog } from "../../../actions/blogActions";
import { useNavigate  } from 'react-router-dom';
import { showUpdateFalse } from '../../../features/showUpdateSlice';


export default function YourPosts_UpdateBlog() {
  const postUpdateSelector = useAppSelector(state => state.showUpdateSlice.value)
  const navigate = useNavigate();

  const usersPosts = useAppSelector(state => state.profileBlogState.value)
  if (!usersPosts) navigate('../')
  const [tag, setTag] = useState<string | undefined>()
  const [ tag2, setTag2 ] = useState<string | undefined>()
  const [ header, setHeader ] = useState<string | undefined>()
  const [ body, setBody ] = useState<string | undefined>()
  const [ id, setId ] = useState<number | undefined>()
  

  const refFocus = useRef<any>(null);
  const dispatch = useAppDispatch();
  const finishSelector = useAppSelector(state => state.booleanPopUpWindow);

  useEffect(() => {
    if (usersPosts.length !== 0 ) {
      setId(usersPosts[postUpdateSelector.counter]['id' as keyof typeof usersPosts[0]])
    }
  }, [usersPosts, postUpdateSelector.counter])


  useEffect(() => {// escapes search results // auto focus   // redirects if refreshed 
    if(refFocus.current?.focus) {
      refFocus.current?.focus();
    }
    if (Object.keys(usersPosts).length === 0 || usersPosts.length ===0) {
      navigate('../')
    }  
    function escape(e: any){
      if (e.key === 'Escape'){
        handleCancel()}
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup', (e) => escape(e));
  // eslint-disable-next-line
  }, [])


  
  async function handleUpdateBlog(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    dispatch(updateBlog({
      id,
      tag,
      tag2,
      header,
      body,
      isDraft: false,
    }))
  }


  function handleCancel() {
    navigate('../')
    dispatch(showUpdateFalse())
  }


  return (
    <Box component="form"  onSubmit={handleUpdateBlog}  sx={{
      marginTop: !postUpdateSelector.bool ? 4 : 0,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '300px',
      width: '70%',
      filter: finishSelector.value ? 'blur(5px)' : 'null',

    }}>

  <Box sx={{
    display: 'flex',
    gap: '2rem',
    width: '100%',
    justifyContent: 'flex-start',
  }}>
    <TextField
    inputRef={refFocus}
    onChange={(e) => setTag(e.target.value)}
    defaultValue={usersPosts.length > 0 && usersPosts[postUpdateSelector.counter]['tag' as keyof typeof usersPosts[0]]}
    type="text"
    name="tag"
    variant="outlined"
    sx={{
      maxWidth: '150px',
    }}
  />
  <TextField
    onChange={(e) => setTag2(e.target.value)}
    defaultValue={usersPosts.length > 0 && usersPosts[postUpdateSelector.counter]['tag2' as keyof typeof usersPosts[0]]}
    type="text"
    name="tag2"
    variant="outlined"
    sx={{
      maxWidth: '150px',
    }}
  />
</Box>
<br />
  <TextField
    onChange={(e) => setHeader(e.target.value)}
    defaultValue={usersPosts.length > 0 && usersPosts[postUpdateSelector.counter]['header' as keyof typeof usersPosts[0]]}
    type="text"
    name='header'
    variant="outlined"
    sx={{
      width: '100%',
      minWidth: '300px',
    }}
  />
  <br />
  <TextField
    onChange={(e) => setBody(e.target.value)}
    defaultValue={usersPosts.length > 0 && usersPosts[postUpdateSelector.counter]['body' as keyof typeof usersPosts[0]]}
    type="text"
    name="content"
    variant="outlined"    
    multiline
    rows={10}
    sx={{
      width: '100%',
      minWidth: '300px',
    }}
  />
  <br />

  <Button 
          variant="contained" color="primary" type="submit" size="large" 
          sx={{
            backgroundColor: 'primary.light', 
            fontWeight: 600,
          }}
      
      >
    POST
  </Button>
  <Button onClick={handleCancel}
          variant="contained" type="submit" size="large" 
          sx={{
            backgroundColor: 'error.main', 
            fontWeight: 600,
          }}
      
      >
    Cancel
  </Button>
</Box>
  )
}
