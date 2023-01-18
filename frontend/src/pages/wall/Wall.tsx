import Card from "../../components/Card"
import * as React from 'react';
import { Typography, Box, Container, CssBaseline} from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { deleteWallPosts } from "../../features/wallPostsSlice";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import { getBlogs } from "../../actions/blogActions";
import { useWindowHeight } from '@react-hook/window-size';
import WallRightColumn from "./WallRightColumn";
import WallBanner from "./WallBanner";
import WallClearSearch from "./WallClearSearch";
import {usePipe} from '../../hooks/usePipe'

type IProps = { 
  blogFilter: any;
  setBlogFilter: React.Dispatch<React.SetStateAction<any | null>>;
  clearListings: boolean;
  setClearListings: React.Dispatch<React.SetStateAction<any | null>>;
}

export default function Wall( {blogFilter, setBlogFilter, clearListings , setClearListings}: IProps) {

  const [ counter, setCounter ] = useState<number>(0);
  const dispatch = useAppDispatch();
  const onlyHeight = useWindowHeight();
  const blogPostsArray = useAppSelector(state => state.getWallPostState.value)
  const loading = useAppSelector(state => state.loadingState.value.booly)


  useEffect(() => {// CLEARS STATE AND RUNS GET BLOGS REQUEST
    dispatch(deleteWallPosts())
    dispatch(getBlogs())
    // eslint-disable-next-line
  }, [])

  
  
  useEffect(() => { // ESCAPES SEARCH RESULTS
    function escape(e: any){
      if (e.key === 'Escape'){
        setClearListings(false)}
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup',  (e) => escape(e)) ;
  }, [setClearListings])
  

    
  function checkBodies() {//TRIGGERS RERENDER ON CARD COMPONENT
    setCounter(prev => prev += 1 )
  }


  function handleTagClick(str: string) { // SEARCH VIA TAG
    setClearListings(true)
    let helper = [];
    for (let i =0; i < blogPostsArray.length; i++) {
      if (setTagSearch(`${blogPostsArray[i]['tag' as keyof typeof blogPostsArray[0]]}`, str)
        || setTagSearch(`${blogPostsArray[i]['tag2' as keyof typeof blogPostsArray[0]]}`, str)) {
        helper.push(blogPostsArray[i])
      }
    }
    setBlogFilter(helper)
  }
  function setTagSearch(arg: any, str: string) {
    return arg.toString().toLowerCase().includes(str.toLowerCase())
  }

  

  const wallPipe = usePipe(
    reverse,
    filtered
  )
  function reverse(arr: []) {
    return arr.reverse()
  }
  type obj = {isDraft: boolean}
  function filtered(arr: []) {
    // eslint-disable-next-line
    return [...arr].filter((item: obj) => item!.isDraft === false || !('isDraft' in item))
  }

  return (
  <React.Fragment >
    <CssBaseline />
      {loading && <Loading />}
      
    <Container maxWidth="lg" sx={{minHeight: `calc(${onlyHeight}px - 80px)`, mt: 10}}>
      <Box sx={{ 
          transition: 'background-color 0.2s',
          position: 'relative'
        }}>

          
      {clearListings &&
      <WallClearSearch setClearListings={setClearListings} />}

      <WallBanner />
          
{/* PINNED CONTENT - [0] TO [1] */}          
    {blogPostsArray && 
      <Box sx={{
        display: clearListings ? 'none':'grid',
        gap: 4,
        mb: 10,
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%/1, max(300px, 100%/3)), 1fr))`  
      }}>
      {!clearListings && blogPostsArray[1] &&
        <><Card
          key={2001}
          checkBodies={checkBodies}
          counter={counter}
          content={blogPostsArray[0]}
          pinned={false}/>
        <Card
          key={2002}
          checkBodies={checkBodies}
          counter={counter}
          content={blogPostsArray[1]}
          pinned={false}/>
        </>}
      </Box>
    }  
          

{/* BLOG CONTAINER */} 
    {blogPostsArray &&  
      <Box sx={{ 
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
                

{/* SHOW BLOG RESULTS */}           
        {clearListings && blogFilter.length === 0 &&
          <Typography variant='h1'>Search has 0 results</Typography>}
                
        {(!clearListings
            ? [...blogPostsArray].filter((item: any, index: number) => index > 1)  //SHOW FULL ARRAY
            : wallPipe([...blogFilter]) // SHOW FILTERED ARRAY
            ).map((item: object, index: number) => {
              return <Card
                key={index + 2000}
                checkBodies={checkBodies}
                counter={counter}
                content={item}
                pinned={false}
                />
            })
        }
      </Box>
              
{/* SHOW RIGHT COLUMN */}           
        <WallRightColumn handleTagClick={handleTagClick} />           
      </Box>
      }

        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  )
}