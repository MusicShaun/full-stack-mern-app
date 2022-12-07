import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { updateBlog } from '../../actions/blogActions';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { showUpdateFalse } from '../../features/showUpdateSlice';

interface IProps  {
  updateNumber: number;
}


export default function DraftUpdate({ updateNumber  } : IProps) {

  const {usersDrafts} = useOutletContext<{ usersDrafts: any[]}>();
  const [ tag, setTag ] = useState(usersDrafts[updateNumber].tag);
  const [ tag2, setTag2 ] = useState(usersDrafts[updateNumber].tag2);
  const [ header, setHeader ] = useState(usersDrafts[updateNumber].header);
  const [ body, setBody ] = useState(usersDrafts[updateNumber].body);
  const [ id, setId ] = useState(usersDrafts[updateNumber]._id)

  const dispatch = useAppDispatch();
  const finishSelector = useAppSelector(state => state.patheticBoolean);
  const updateSelector = useAppSelector(state => state.showUpdateSlice)
  const refFocus = useRef<any>(null);
  const navigate = useNavigate();
  useEffect(() => { setId(usersDrafts[updateNumber]._id)}, [usersDrafts, updateNumber])

  function handleUpdateDraft(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    if (document.activeElement!.id === 'post') {
      dispatch(updateBlog({
        id: id,
        tag: tag,
        tag2: tag2,
        header: header,
        body: body,
        isDraft: false,
        // profilePicture: usersDrafts[updateNumber].profilePicture
      }))
    } else if (document.activeElement!.id === 'save') {
      dispatch(updateBlog({
        id: id,
        tag: tag,
        tag2: tag2,
        header: header,
        body: body,
        isDraft: true,
        // profilePicture: usersDrafts[updateNumber].profilePicture
      }))
    }
  }
  function handleCancel() {
    navigate('../')
    dispatch(showUpdateFalse())
  }
    // escapes search results // TURN THIS INTO A HOOK      
    useEffect(() => {
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
      marginTop: !updateSelector.value.bool ? 4 : 0,
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
    defaultValue={usersDrafts[updateNumber].tag}
    type="text"
    name="tag"
    variant="outlined"
    sx={{
      maxWidth: '150px',
    }}
  />
  <TextField
    onChange={(e) => setTag2(e.target.value)}
    defaultValue={usersDrafts[updateNumber].tag2}
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
    defaultValue={usersDrafts[updateNumber].header}
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
    defaultValue={usersDrafts[updateNumber].body}
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
