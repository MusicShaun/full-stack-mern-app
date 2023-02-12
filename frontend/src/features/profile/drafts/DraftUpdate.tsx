import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { selectDraftBlogsById, updateUsersBlog } from '../../wall/wallSlice';
import { selectUser } from '../../users/usersSlice';
import { RootState } from '../../../app/store';


export default function DraftUpdate() {

  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const refFocus = useRef<any>(null);

  const _id: string = searchParams.get("id") || ''
  const selectDraftsById = useAppSelector((state: RootState) => selectDraftBlogsById({ state, _id }))
  const user = useAppSelector(selectUser)

  const [ tag, setTag ] = useState<string>(selectDraftsById['0'].tag || '')
  const [ tag2, setTag2 ] = useState<string>(selectDraftsById['0'].tag2 || '')
  const [ header, setHeader ] = useState<string>(selectDraftsById['0'].header || '')
  const [ body, setBody ] = useState<string>(selectDraftsById['0'].body || '')

  let blogUpdateObject = {
    tag,
    tag2,
    header,
    body,
    _id,
  }

  function handleCancel() {
    navigate('../')
  }

  function handleUpdateDraft(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
      dispatch(updateUsersBlog({
        ...blogUpdateObject,
        token: user.token,
        isDraft: document.activeElement!.id === 'post' ? false : true,
        firstName: user.firstName!,
        lastName: user.lastName!,
      })
      )
      navigate('../')
  }

    // escapes search results // Also checks if the blogcontents are empty 
  useEffect(() => {
    if (Object.keys(selectDraftsById).length === 0) {
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
      marginTop: true ? 4 : 0, //! fix
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '300px',
      width: '70%',
      // filter: closePopUpWindow.value ? 'blur(5px)' : 'null',

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
    defaultValue={selectDraftsById['0'].tag}
    type="text"
    name="tag"
    variant="outlined"
    sx={{
      maxWidth: '150px',
    }}
  />
  <TextField
    onChange={(e) => setTag2(e.target.value)}
    defaultValue={selectDraftsById['0'].tag2}
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
    defaultValue={selectDraftsById['0'].header}
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
    defaultValue={selectDraftsById['0'].body}
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
