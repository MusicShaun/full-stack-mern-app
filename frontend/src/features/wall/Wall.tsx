import Card from "../../components/Card"
import * as React from 'react';
import { Typography, Box, Container, CssBaseline} from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Footer from "../../components/Footer";
import { useWindowHeight } from '@react-hook/window-size';
import WallBanner from "./WallBanner";
import WallClearSearch from "./WallClearSearch";
import {usePipe} from '../../hooks/usePipe'
import { selectAllBlogs, selectFilteredBlogs } from "./wallSlice";
import { searchBarState } from "../searchBarSlice";
import { endSearch } from "../searchBarSlice";
import { useSelector } from "react-redux";
import WallRightColumn from "./WallRightColumn";

export default function Wall( ) {

  const dispatch = useAppDispatch()
  const searchBarEngaged = useSelector(searchBarState)
  
  const onlyHeight = useWindowHeight()

  const blogs = useAppSelector(selectAllBlogs)
  const filteredBlogs = useAppSelector(selectFilteredBlogs)

  useEffect(() => { // ESCAPES SEARCH RESULTS
    function escape(e: any){
      if (e.key === 'Escape') {
        dispatch(endSearch())
      }
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup',  (e) => escape(e)) ;
  }, [searchBarEngaged, dispatch])
  


  const wallPipe = usePipe( //! this can all be removed soon 
    reverse,
    filtered
  )
  function reverse(arr: []) { //! PUT A SUB TIMESTAMP ON THIS AND USE SORT INSTEAD 
    return arr.reverse()
  }
  type obj = {isDraft: boolean}
  function filtered(arr: []) {
    // eslint-disable-next-line
    return [...arr].filter((item: obj) => item!.isDraft === false || !('isDraft' in item)) 
  }

  const pinnedBlogPosts = (
    <Box sx={{
      display: searchBarEngaged ? 'none':'grid', gap: 4, mb: 10,
      gridTemplateColumns: `repeat(auto-fit, minmax(min(100%/1, max(300px, 100%/3)), 1fr))`  
    }}>
    {!searchBarEngaged && blogs[1] &&
      <><Card key={2001} content={blogs[0]} pinned={false}/>
      <Card key={2002} content={blogs[1]} pinned={false}/>
      </>}
  </Box>)

  const blogPosts =  (!searchBarEngaged
    ? wallPipe([...blogs].filter((item: any, index: number) => index > 1))  //SHOW FULL ARRAY
    : wallPipe([...filteredBlogs]) // SHOW FILTERED ARRAY
    ).map((item: object, index: number) => {
      return <Card
        key={index + 2000}
        content={item}
        pinned={false}
        />
    })


  return (
  <React.Fragment >
    <CssBaseline />
      
    <Container maxWidth="lg" sx={{minHeight: `calc(${onlyHeight}px - 80px)`, mt: 10}}>
      <Box sx={{ 
          transition: 'background-color 0.2s',
          position: 'relative'
        }}>

    {searchBarEngaged && <WallClearSearch />}
          
    <WallBanner />
          
{/* PINNED CONTENT - [0] TO [1] */}          
    {blogs && pinnedBlogPosts }  
          
{/* BLOG CONTAINER */} 
    {blogs &&  
      <Box sx={{ 
        display: 'flex',
        columnGap: {xs: '0', md: '80px'},
        gridTemplateColumns: '1fr 380px'}}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          mb: 10,
          mt: searchBarEngaged ? 0 : 4,
          maxWidth: '800px',
          flex: '1'
        }}>
        <Typography variant='h1' sx={{pl: 2}}>Posts</Typography>
                
{/* SHOW BLOG RESULTS */}           
        {searchBarEngaged && filteredBlogs.length === 0 &&
          <Typography variant='h1'>Search has 0 results</Typography>}
          {blogPosts}
      </Box>
              
{/* SHOW RIGHT COLUMN */}           
        <WallRightColumn />           
      </Box>
      }

        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  )
}