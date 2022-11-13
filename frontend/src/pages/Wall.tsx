import Card from "../components/blog_posts/Card"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import * as React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useAppDispatch } from "../app/hook";
import { deleteWallPosts, getWallPosts } from "../features/wallPostsSlice";
import Footer from "../components/Footer";

type IProps = { 
  setBlogContent: React.Dispatch<React.SetStateAction<any | null>>;
  blogContent: any | null;
  blogFilter: any;
  clearListings: boolean;
  setClearListings: React.Dispatch<React.SetStateAction<any | null>>;
}

export default function Wall( {setBlogContent, blogContent, blogFilter, clearListings , setClearListings}: IProps) {

  const [ counter, setCounter ] = useState<number>(0);
  const dispatch = useAppDispatch();
  
  function checkBodies() {//TRIGGERS RERENDER ON CARD COMPONENT
    setCounter(prev => prev += 1 )
  }


async function getPosts()  {
  const controller = new AbortController()
  try {
    const data = await axios.get('/api/bloggers', {
      signal: controller.signal
    }) 
    dispatch(getWallPosts(data.data))
    setBlogContent(data.data)
    return () => {
      controller.abort()
    }
  } catch (error) {
    console.log(error)
  }
}
// CLEARS STATE AND RUNS GET REQUEST
  useEffect(() => {
    dispatch(deleteWallPosts())
    getPosts()
    // eslint-disable-next-line
  }, [])
  
  function handleClearListings() {
    setClearListings(false)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{minHeight: 'calc(100vh - 136px)'}}>
        <Box sx={{ 
            transition: 'background-color 0.5s',
            position: 'relative'
          }}>
            
          {clearListings && <Button 
                variant="contained"
                sx={{bgcolor:'error.main',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    mt: 3
              }}
                onClick={handleClearListings}
                >Clear search</Button>}

          <Box sx={{
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 10,
                mb: 12
                }}>
            <Typography variant='body2' 
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: '#0072E5'
                  }}>
              Blog
            </Typography>
            <Typography variant='h1' >
              The 
              <span style={{
                background: 'linear-gradient(to right, #007FFF, #0059B2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700'
              }}> latest </span> 
              made up stuff
            </Typography>
          </Box>

    {blogContent &&  
        <Box sx={{
              display: 'grid',
              gap: 4,
              mb: 10,
              transition: 'all 5s',
              gridTemplateColumns: `repeat(auto-fit, minmax(min(100%/1, max(300px, 100%/3)), 1fr))`
             
        }}>
      
        {clearListings && blogFilter.length === 0 
        ? <Typography variant='h1' >Search has 0 results</Typography>
        :
        (!clearListings ? [...blogContent] : [...blogFilter]) 
          .map((article: any, index) => {
          return <Card  key={index} 
                        checkBodies={checkBodies} 
                        counter={counter} 
                        tag={article.tag}
                        tag2={article.tag2}
                        header={article.header}
                        body={article.body}
                        date={article.createdAt}
                        name={[article.firstName, article.lastName]}
                        />
          })
        }
        </Box>
      }



        </Box>
      </Container>
      <Footer />
    </React.Fragment>
      
      
   
  )
}