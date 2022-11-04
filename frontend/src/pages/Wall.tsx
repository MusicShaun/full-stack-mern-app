import Card from "../components/blog_posts/Card"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import * as React from 'react';
import { Typography, Box,  } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { deleteWallPosts, getWallPosts } from "../features/wallPostsSlice";


export default function Wall() {

  const [ counter, setCounter ] = useState<number>(0);
  const [ blogContent, setBlogContent ] = useState<[] | null>();

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
  }, [])
  

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" >
        <Box sx={{ 
            bgcolor:  '#f4f5f8'  , 
            transition: 'background-color 0.5s',

          }}>

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
            <Typography variant='h1' 
                  sx={{
                    
                  }}>
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
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              mb: 10,
              transition: 'all 5s'
             
        }}>
      
        {[...blogContent].map((article: any, index) => {
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
    </React.Fragment>
      
      
   
  )
}