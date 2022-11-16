import { Typography,TextField,Button,Box,Container,CssBaseline, Paper
} from "@mui/material";
import * as React from "react";
import { useState, useEffect, useRef } from 'react'; 
import { useAppDispatch, useAppSelector } from '../app/hook';
import PostFinish from "../components/PostFinish";
import { postBlog } from "../actions/userActions";
import Loader from "../components/Loader";

export default function Post() {

  const [ postFinish, setPostFinish ] = useState<boolean>(false);
  const refFocus = useRef<any>(null);
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state: any) => state.loaderState.value[0]);

  // get first and last names from store
  const userCredentialsSelector = useAppSelector((state) => state.loginUserState.value)
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
    useEffect(() => {  
    if (userCredentialsSelector[0]){
      setFirstName(Object.values(userCredentialsSelector[0])[1])
      setLastName(Object.values(userCredentialsSelector[0])[2])
    }
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    if(refFocus.current?.focus)
    refFocus.current?.focus();
  },[])



  async function handleBlogPost(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    dispatch(postBlog({
      tag: formData.get('tag')!,
      tag2: formData.get('tag2')!,
      header:  formData.get('header')!,
      body:  formData.get('content')!,
      firstName:  firstName,
      lastName:  lastName
    }))
    setPostFinish(true)
  }


  return (
  <React.Fragment>
  <CssBaseline />
    {loading && loading.booly && <Loader /> }

    <Container maxWidth="xl" sx={{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        bgcolor: 'background',
        minHeight: 'calc(100vh - 136px)',
        height: 'auto',
    }}>

    {postFinish && 
      <PostFinish setPostFinish={setPostFinish}
      />}

      <Paper elevation={3} sx={{
        position: 'relative',
        width: `80%`, 
        minWidth: '350px',
        height: '86%',
        minHeight: '600px',
        p: 3, 
        mt: 5,
        mb: 10,
        borderRadius: 3, 
        color: '#1A2027', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
        ":hover": {
          boxShadow: 8,
          },
          
        }}
        >
          <Typography variant='h1' 
                  sx={{
                    
                  }}>
              Create your 
              <span style={{
                background: 'linear-gradient(to right, #007FFF, #0059B2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700'
              }}> BLOG </span> 
            </Typography>

      <Box component="form"  onSubmit={handleBlogPost}  sx={{
            marginTop: 4,
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
          required
          type="text"
          label="Tag 1"
          name="tag"
          variant="outlined"
          sx={{
            maxWidth: '150px',
          }}
        />
        <TextField
          required
          type="text"
          name="tag2"
          label="Tag 2"
          variant="outlined"
          sx={{
            maxWidth: '150px',
          }}
        />
      </Box>
      <br />
        <TextField
          required
          type="text"
          name='header'
          label="Catchy heading"
          variant="outlined"
          sx={{
            width: '100%',
            minWidth: '300px',
          }}
        />
        <br />
        <TextField
          required
          type="text"
          name="content"
          label="Write article"
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
      <Button variant='outlined'>ADD SAVE AS DRAFT BUTTON</Button>
      <Button variant='outlined'>ADD TO LOCAL STORAGE IN CASE OF PAGE REFRESH </Button>
      </Paper>

  </Container>
  </React.Fragment>
  );
}