import { Box, Button, TextField } from '@mui/material'
import React , {useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { updateBlog } from "../../actions/blogActions";
import { useNavigate  } from 'react-router-dom';
import { showUpdateFalse } from '../../features/showUpdateSlice';

interface IProps  {
  updateNumber: number;
}

export default function YourPosts_UpdateBlog({updateNumber, }: IProps ) {
  // const { profileBlogs } = useOutletContext<{ profileBlogs: any[] }>();
  const usersPosts = useAppSelector(state => state.profileBlogState.value)
  const [ tag, setTag ] = useState(usersPosts[updateNumber].tag);
  const [ tag2, setTag2 ] = useState(usersPosts[updateNumber].tag2);
  const [ header, setHeader ] = useState(usersPosts[updateNumber].header);
  const [ body, setBody ] = useState(usersPosts[updateNumber].body);
  const [ id, setId ] = useState(usersPosts[updateNumber]._id)
  // const [local, setLocal] = useState<any>();
  
  const navigate = useNavigate();
  const refFocus = useRef<any>(null);
  const dispatch = useAppDispatch();
  const finishSelector = useAppSelector(state => state.patheticBoolean);
  const updateSelector = useAppSelector(state => state.showUpdateSlice)

  useEffect(() => { setId(usersPosts[updateNumber]._id)}, [usersPosts, updateNumber])

  // useEffect(() => {      
  //   if (localStorage.getItem('userInfo')){
  //     setLocal(JSON.parse(localStorage.getItem('userInfo') || "")); 
  //     }
  // }, [] ) 
   
  async function handleUpdateBlog(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    dispatch(updateBlog({
      id: id,
      tag: tag,
      tag2: tag2,
      header: header,
      body: body,
      isDraft: false,
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
  // escapes search results // TURN THIS INTO A HOOK      
  useEffect(() => {
    function escape(e: any){
      if (e.key === 'Escape'){
        handleCancel()}
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup', (e) => escape(e));
  // eslint-disable-next-line
  }, [] )

  return (
    <Box component="form"  onSubmit={handleUpdateBlog}  sx={{
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
