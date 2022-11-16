import { Box, Button, TextField } from '@mui/material'
import React , {useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { updateBlog } from "../../actions/userActions";
import { trueBoolean } from '../../features/patheticBooleanSlice';

interface IProps  {
  usersPosts: any[];
  updateNumber: number;
}

export default function YourPosts_UpdateBlog({usersPosts, updateNumber, }: IProps ) {
  const [ tag, setTag ] = useState(usersPosts[updateNumber].tag);
  const [ tag2, setTag2 ] = useState(usersPosts[updateNumber].tag2);
  const [ header, setHeader ] = useState(usersPosts[updateNumber].header);
  const [ body, setBody ] = useState(usersPosts[updateNumber].body);
  const [ id, setId ] = useState(usersPosts[updateNumber]._id)

  const refFocus = useRef<any>(null);
  const dispatch = useAppDispatch();
  const finishSelector = useAppSelector(state => state.patheticBoolean);

  useEffect(() => { setId(usersPosts[updateNumber]._id)}, [usersPosts, updateNumber])

  async function handleUpdateBlog(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    console.log('post button clicked')

    dispatch(updateBlog({
      id: id,
      tag: tag,
      tag2: tag2,
      header: header,
      body: body
    }))

    dispatch(trueBoolean())
  }

  useEffect(() => {
    if(refFocus.current?.focus) {
      refFocus.current?.focus();
      }
  }, [])


  return (
    <Box component="form"  onSubmit={handleUpdateBlog}  sx={{
      marginTop: 4,
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
    type="text"
    name="tag"
    variant="outlined"
    label={usersPosts[updateNumber].tag}
    sx={{
      maxWidth: '150px',
    }}
  />
  <TextField
    onChange={(e) => setTag2(e.target.value)}
    type="text"
    name="tag2"
    variant="outlined"
    label={usersPosts[updateNumber].tag2}
    sx={{
      maxWidth: '150px',
    }}
  />
</Box>
<br />
  <TextField
    onChange={(e) => setHeader(e.target.value)}
    type="text"
    name='header'
    variant="outlined"
    label={usersPosts[updateNumber].header}
    sx={{
      width: '100%',
      minWidth: '300px',
    }}
  />
  <br />
  <TextField
    onChange={(e) => setBody(e.target.value)}
    type="text"
    name="content"
    label={usersPosts[updateNumber].body}
    variant="outlined"    
    multiline
    rows={10}
    sx={{
      width: '100%',
      minWidth: '300px',
    }}
  />
  <br />
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
</Box>
  )
}
