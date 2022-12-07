import { Typography,TextField,Button,Box,Container,CssBaseline, Paper
} from "@mui/material";
import * as React from "react";
import { useState, useEffect, useRef } from 'react'; 
import { useAppDispatch, useAppSelector } from '../../app/hook';
import PostFinish from "../../components/PostFinish";
import { postBlog } from "../../actions/blogActions";
import { useWindowSize} from "@react-hook/window-size";
import usePerfectWindowHeight from "../../hooks/usePerfectWindowHeight";
import AreYouSure from "./AreYouSure";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function Post() {
  const [onlyWidth, onlyHeight] = useWindowSize(); 

  const [ areYouSure, setAreYouSure ] = useState(false);
  const [ postFinish, setPostFinish ] = useState<boolean>(false);
  const refFocus = useRef<any>(null);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.loadingState.value.booly)
  const navigate = useNavigate();
  let screenHeight = usePerfectWindowHeight(onlyHeight);

  // get first and last names from store
  const [ firstName, setFirstName ] = useState<any>("");
  const [ lastName, setLastName ] = useState<any>("");
    useEffect(() => {  
    if (localStorage.getItem('userInfo')){
      let helper: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
      setFirstName(helper.firstName)
      setLastName(helper.lastName)
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

    if (document.activeElement!.id === 'post') {
      dispatch(postBlog({
        tag: formData.get('tag')!,
        tag2: formData.get('tag2')!,
        header:  formData.get('header')!,
        body:  formData.get('content')!,
        firstName:  firstName,
        lastName:  lastName,
        isDraft: false,
      }))
    }
    else if (document.activeElement!.id === 'draft') {
      dispatch(postBlog({
        tag: formData.get('tag')!,
        tag2: formData.get('tag2')!,
        header:  formData.get('header')!,
        body:  formData.get('content')!,
        firstName:  firstName,
        lastName:  lastName,
        isDraft: true,
      }))
    }
    setPostFinish(true)
  }

  function resetFormInputs() {
    setAreYouSure(false)
    navigate(0)
  }

  return (
  <React.Fragment>
  <CssBaseline />
    {loading && <Loading /> }

    <Container maxWidth="xl" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background',
        height: `${screenHeight}px`,
        mt: 10
        
    }}>

    {postFinish && 
      <PostFinish setPostFinish={setPostFinish} name='post'
      />}

      <Paper elevation={3} sx={{
        position: 'relative',
        width: onlyWidth > 500 ? `80%` : '95%', 
        minWidth: '350px',
        height: '90%',
        minHeight: '550px',
        p: onlyWidth > 500 ? 3 : 0, 
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

      <Box component="form"  onSubmit={handleBlogPost}   
          sx={{
            marginTop: onlyWidth > 500 ? 4 : 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '300px',
            width: onlyWidth > 500 ? `70%` : '95%', 
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
          inputProps={{
            style: { padding: onlyWidth < 500 ? 10 : '16.5px 14px' },
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
          inputProps={{
            style: { padding: onlyWidth < 500 ? 10 : '16.5px 14px' },
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
          inputProps={{
            style: { padding: onlyWidth < 500 ? 10 : '16.5px 14px' },
          }}
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
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Button variant="contained" color="primary"  id='draft' type="submit"
                    sx={{
                      backgroundColor: 'success.main', 
                      fontWeight: 600,
                    }}>Save To Drafts
          </Button>
          <Button id='post'
                  variant="contained" color="primary" type="submit" size="large" 
                  sx={{
                    backgroundColor: 'primary.light', 
                    fontWeight: 600,
                  }}>
            POST
          </Button>
          <Button variant='contained' color="primary" id='delete' onClick={() => setAreYouSure(true)}
                            sx={{
                              backgroundColor: 'error.main', 
                              fontWeight: 600,
                            }}>DELETE </Button>
        </Box>
      </Box>
      </Paper>

    {areYouSure && <AreYouSure resetFormInputs={resetFormInputs}/> }

  </Container>
  </React.Fragment>
  );
}