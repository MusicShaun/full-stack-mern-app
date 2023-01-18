import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { updateBlog } from '../../../actions/blogActions';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { showUpdateFalse } from '../../../features/showUpdateSlice';


export default function DraftUpdate() {
  const {usersDrafts} = useOutletContext<{ usersDrafts: any[]}>();
  const [ tag, setTag ] = useState<string | undefined>()
  const [ tag2, setTag2 ] = useState<string | undefined>()
  const [ header, setHeader ] = useState<string | undefined>()
  const [ body, setBody ] = useState<string | undefined>()
  const [ id, setId ] = useState<number | undefined>()

  const dispatch = useAppDispatch();
  const closePopUpWindow = useAppSelector(state => state.booleanPopUpWindow);
  const draftUpdateSelector = useAppSelector(state => state.showUpdateSlice.value)
  const refFocus = useRef<any>(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (usersDrafts.length > 0) {
      setId(usersDrafts[draftUpdateSelector.counter]._id)
    }
  }, [usersDrafts, draftUpdateSelector.counter])

  function handleCancel() {
    navigate('../')
    dispatch(showUpdateFalse())
  }

  function handleUpdateDraft(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    if (document.activeElement!.id === 'post') {
      dispatch(updateBlog({
        id, tag, tag2, header, body, isDraft: false,
      }))
    } else if (document.activeElement!.id === 'save') {
      dispatch(updateBlog({
        id, tag, tag2,  header, body, isDraft: true,
      }))
    }
  }

    // escapes search results // Also checks if the blogcontents are empty 
  useEffect(() => {
    if (Object.keys(usersDrafts).length === 0 || usersDrafts.length ===0) {
      navigate('../')
    }  
    function escape(e: any){
      if (e.key === 'Escape'){
        handleCancel()}
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup',  (e) => escape(e)) ;
    // eslint-disable-next-line
  }, [] )

  
  return (
    <Box component="form"  onSubmit={handleUpdateDraft}  sx={{
      marginTop: !draftUpdateSelector.bool ? 4 : 0,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '300px',
      width: '70%',
      filter: closePopUpWindow.value ? 'blur(5px)' : 'null',

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
    defaultValue={usersDrafts.length > 0 && usersDrafts[draftUpdateSelector.counter]['tag' as keyof typeof usersDrafts[0]]}
    type="text"
    name="tag"
    variant="outlined"
    sx={{
      maxWidth: '150px',
    }}
  />
  <TextField
    onChange={(e) => setTag2(e.target.value)}
    defaultValue={usersDrafts.length > 0 && usersDrafts[draftUpdateSelector.counter]['tag2' as keyof typeof usersDrafts[0]]}
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
    defaultValue={usersDrafts.length > 0 && usersDrafts[draftUpdateSelector.counter]['header' as keyof typeof usersDrafts[0]] }
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
    defaultValue={usersDrafts.length > 0 && usersDrafts[draftUpdateSelector.counter]['body'  as keyof typeof usersDrafts[0]]}
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
    <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
  <Button 
          variant="contained" color="primary" type="submit" size="large" id='save'
          sx={{
            backgroundColor: 'success.main', 
            fontWeight: 600,
          }}
      
      >
    Save Draft
  </Button>
  <Button 
          variant="contained" color="primary" type="submit" size="large" id='post'
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
</Box>
  )
}
