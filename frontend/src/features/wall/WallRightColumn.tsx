import { Box, Paper, Typography } from '@mui/material'
import WallBtn from '../../components/WallBtn'
import { beginSearch } from '../searchBarSlice'
import { filterBlogs } from './wallSlice'
import { useDispatch } from 'react-redux'




export default function WallRightColumn() {
  
  const dispatch = useDispatch()

  function handleTagClick(str: string) {
    dispatch(beginSearch())
    dispatch(filterBlogs(str))
  }

  return (
    <Box sx={{ display: {xs: 'none', md: 'flex'}, width: '30%'}}>
    <Paper 
      sx={{
        display: {xs: 'none', md: 'flex'},
        height: '300px',
        width: '100%',
        flexWrap: 'wrap',
        borderRadius: '20px',
              border: '1px solid lightgrey',
        borderColor: 'secondary.main',
        flexDirection: 'column',
      }}
    > 
      <Typography sx={{ pl: 2, pt: 2, mb: 2, color: 'text.secondary', fontWeight: 600 }}>Filter by popular tag</Typography>
      
      <Box sx={{pl: 2, display: 'flex', flexWrap: 'wrap'}}>
        <div onClick={() => handleTagClick('droid')}><WallBtn text={'Droid'} /></div>
        <div onClick={() => handleTagClick('Fry')}><WallBtn text={'Fry'} /></div>
        <div onClick={() => handleTagClick('Blog')}><WallBtn text={'Blog'} /></div>
        <div onClick={() => handleTagClick('Development')}><WallBtn text={'Development'} /></div>
        <div onClick={() => handleTagClick('redux')}><WallBtn text={'Redux'} /></div>
        <div onClick={() => handleTagClick('Rules')}><WallBtn text={'Rules'} /></div>
      </Box>
  </Paper>
  </Box>
  )
}
