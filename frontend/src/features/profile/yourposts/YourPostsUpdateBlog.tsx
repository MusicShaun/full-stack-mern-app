import { Box, Button, TextField } from '@mui/material'
import React , {useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { selectSingleBlogByID, updateUsersBlog } from '../../wall/wallSlice';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import { UserType, selectUser } from '../../users/usersSlice';
import { RootState } from '../../../app/store';


export default function YourPosts_UpdateBlog() {
  
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refFocus = useRef<any>(null);
  
  const _id: string = searchParams.get("id") || ''
  const selectBlogsByIds = useAppSelector((state: RootState) => selectSingleBlogByID({ state, _id }))
  
  const user: UserType = useAppSelector(selectUser)

  const [ tag, setTag ] = useState<string>(selectBlogsByIds['0'].tag)
  const [ tag2, setTag2 ] = useState<string>(selectBlogsByIds['0'].tag2)
  const [ header, setHeader ] = useState<string>(selectBlogsByIds['0'].header)
  const [ body, setBody ] = useState<string>(selectBlogsByIds['0'].body)

  let blogUpdateObject = {
    tag,
    tag2,
    header,
    body,
    _id,
  }


  useEffect(() => {// escapes search results // auto focus   // redirects if refreshed 
    if(refFocus.current?.focus) {
      refFocus.current?.focus();
    }
    function escape(e: any){
      if (e.key === 'Escape'){
        handleCancel()}
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup', (e) => escape(e));
  // eslint-disable-next-line
  }, [])


  
  function handleUpdateBlog(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    
      dispatch(updateUsersBlog({
        ...blogUpdateObject,
        token: user.token,
        isDraft: document.activeElement!.id === 'post' ? false : true,
        firstName: user.firstName!,
        lastName: user.lastName!,
      })
      )
      navigate('../your-posts')
  }

  function handleCancel() {
    navigate('../your-posts')
  }


  return (
    <Box component="form"  onSubmit={handleUpdateBlog}  sx={{
      marginTop:  0 , 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '300px',
      width: '70%',
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
    defaultValue={selectBlogsByIds['0'].tag}
    type="text"
    name="tag"
    variant="outlined"
    sx={{
      maxWidth: '150px',
    }}
  />
  <TextField
    onChange={(e) => setTag2(e.target.value)}
    defaultValue={selectBlogsByIds['0'].tag2}
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
    defaultValue={selectBlogsByIds['0'].header}
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
    defaultValue={selectBlogsByIds['0'].body}
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

  <Button id='post'
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
