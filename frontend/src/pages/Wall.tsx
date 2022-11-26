import Card from "../components/blog_posts/Card"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import * as React from 'react';
import { Typography, Box, Button, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useAppDispatch } from "../app/hook";
import { deleteWallPosts, getWallPosts } from "../features/wallPostsSlice";
import Footer from "../components/Footer";
import WallBtn from "../components/WallBtn";
import Loading from "../components/Loading";

type IProps = { 
  setBlogContent: React.Dispatch<React.SetStateAction<any | null>>;
  blogContent: any | null;
  blogFilter: any;
  setBlogFilter: React.Dispatch<React.SetStateAction<any | null>>;
  clearListings: boolean;
  setClearListings: React.Dispatch<React.SetStateAction<any | null>>;
}

export default function Wall( {setBlogContent, blogContent, blogFilter, setBlogFilter, clearListings , setClearListings}: IProps) {

  const [ counter, setCounter ] = useState<number>(0);
  const [ loader , setLoader ] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  function checkBodies() {//TRIGGERS RERENDER ON CARD COMPONENT
    setCounter(prev => prev += 1 )
  }


async function getPosts()  {
  setLoader(true)
  const controller = new AbortController()
  try {
    const data = await axios.get('/api/bloggers', {
      signal: controller.signal
    }) 
    let helper = data.data.filter(function( obj:any ) { // remove any that belong with the drafts
      return obj.isDraft !== true || obj.isDraft === null;
    });
    dispatch(getWallPosts(helper))
    setBlogContent(helper)
    console.log('Blog content retrieved')
    setLoader(false)
    return () => {
      controller.abort()
    }
  } catch (error) {
    console.log(error)
    setLoader(false)
  }
}
// CLEARS STATE AND RUNS GET REQUEST
  useEffect(() => {
    dispatch(deleteWallPosts())
    getPosts()
    // eslint-disable-next-line
  }, [])
  
  // escapes search results
  useEffect(() => {
    function escape(e: any){
      if (e.key === 'Escape'){
        setClearListings(false)}
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup',  (e) => escape(e)) ;
  }, [setClearListings] )

  function handleClearListings() { 
    setClearListings(false)
  }


  function handleTagClick(str: string) { // SEARCH VIA TAG
    setClearListings(true)
    let helper = [];
    for (let i =0; i < blogContent.length; i++) {
      if (blogContent[i].tag.toString().toLowerCase().includes(str.toLowerCase()) || 
      blogContent[i].tag2.toString().toLowerCase().includes(str.toLowerCase())) {
        helper.push(blogContent[i])
      }
    }
    setBlogFilter(helper)
    helper = [];
  }

  return (
    <React.Fragment >
      <CssBaseline />
      <Container maxWidth="lg" sx={{minHeight: 'calc(100vh - 136px)'}}>

      {loader && <Loading />}

        <Box sx={{ 
            transition: 'background-color 0.2s',
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
                mb: 12,
                mt: 2
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

    {blogContent &&  // PINNED CONTENT - FROM [0] & [1] 
      <Box sx={{
        display: clearListings ? 'none':'grid',
        gap: 4,
        mb: 10,
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%/1, max(300px, 100%/3)), 1fr))`  
      }}>
      {!clearListings && blogContent 
        .filter((item: any, index: number) => index <= 1)
        .map((item: object) => {
          return <Card  
                checkBodies={checkBodies}
                counter={counter}
                content={item}
                pinned={true}
              />
            }
          )
        }
      </Box>
    }  
    {blogContent &&  // REMAINING CONTENT
      <Box sx={{ //COLUMN 1111111
        display: 'flex',
        columnGap: {xs: '0', md: '80px'},
        gridTemplateColumns: '1fr 380px'}}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          mb: 10,
          mt: clearListings ? 0 : 4,
          maxWidth: '800px',
          flex: '1'
        }}>
        <Typography variant='h1' sx={{pl: 2}}>
          Posts 
        </Typography>
        {clearListings && blogFilter.length === 0 
        ? <Typography variant='h1'>Search has 0 results</Typography>
        :
        (!clearListings ? 
          [...blogContent].filter((item: any, index: number) => index > 1) 
          : [...blogFilter])
          .reverse().map((item: object) => {
            return <Card  
            checkBodies={checkBodies}
            counter={counter}
            content={item}
            pinned={false}
          />
          })
        }
        </Box>
        <Box sx={{ display: {xs: 'none', md: 'flex'}, width: '30%'}}>
          <Paper //COLUMN 2222222
            sx={{
              display: {xs: 'none', md: 'flex'},
              height: '300px',
              width: '100%',
              flexWrap: 'wrap',
              borderRadius: '20px',
              border: '1px solid lightgrey',
              flexDirection: 'column',
            }}
          > 
          <Typography sx={{pl: 2, pt: 2, mb: 2, color: 'text.secondary', fontWeight: 600}}>Filter by popular tag</Typography>
            <Box sx={{pl: 2, display: 'flex', flexWrap: 'wrap'}}>
              <div onClick={() => handleTagClick('ninja')}><WallBtn text={'Ninja'} /></div>
              <div onClick={() => handleTagClick('MUI')}><WallBtn text={'MUI'} /></div>
              <div onClick={() => handleTagClick('twitter')}><WallBtn text={'twitter'} /></div>
              <div onClick={() => handleTagClick('Development')}><WallBtn text={'Development'} /></div>
              <div onClick={() => handleTagClick('blog')}><WallBtn text={'blog'} /></div>
              <div onClick={() => handleTagClick('How To')}><WallBtn text={'How To'} /></div>
            </Box>
          </Paper>
        </Box>
      </Box>
      }


        </Box>
      </Container>
      <Footer />
    </React.Fragment>
      
      
   
  )
}