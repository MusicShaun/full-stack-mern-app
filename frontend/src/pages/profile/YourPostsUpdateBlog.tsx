import { Box, Button, TextField } from '@mui/material'
import React , {useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { updateBlog } from "../../actions/userActions";
import { useNavigate, useOutletContext  } from 'react-router-dom';
import { showUpdateFalse } from '../../features/showUpdateSlice';

interface IProps  {
  updateNumber: number;
}

export default function YourPosts_UpdateBlog({updateNumber, }: IProps ) {
  const {usersPosts} = useOutletContext<{ usersPosts: any[]}>();
  const [ tag, setTag ] = useState(usersPosts[updateNumber].tag);
  const [ tag2, setTag2 ] = useState(usersPosts[updateNumber].tag2);
  const [ header, setHeader ] = useState(usersPosts[updateNumber].header);
  const [ body, setBody ] = useState(usersPosts[updateNumber].body);
  const [ id, setId ] = useState(usersPosts[updateNumber]._id)

  const navigate = useNavigate();
  const refFocus = useRef<any>(null);
  const dispatch = useAppDispatch();
  const finishSelector = useAppSelector(state => state.patheticBoolean);

  useEffect(() => { setId(usersPosts[updateNumber]._id)}, [usersPosts, updateNumber])

  async function handleUpdateBlog(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    dispatch(updateBlog({
      id: id,
      tag: tag,
      tag2: tag2,
      header: header,
      body: body
    }))
  }



  useEffect(() => {
    if(refFocus.current?.focus) {
      refFocus.current?.focus();
      }
  }, [])

  function handleCancel() {
    navigate('../')
    dispatch(showUpdateFalse())
  }

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
    defaultValue={usersPosts[updateNumber].tag}
    type="text"
    name="tag"
    variant="outlined"
    sx={{
      maxWidth: '150px',
    }}
  />
  <TextField
    onChange={(e) => setTag2(e.target.value)}
    defaultValue={usersPosts[updateNumber].tag2}
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
    defaultValue={usersPosts[updateNumber].header}
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
    defaultValue={usersPosts[updateNumber].body}
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