import { Box, Paper, Typography } from '@mui/material'
import WallBtn from '../../components/WallBtn'


interface IProps {
  handleTagClick: (str: string) => void
}

export default function WallRightColumn({ handleTagClick }: IProps ) {
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
        <div onClick={() => handleTagClick('ninja')}><WallBtn text={'Ninja'} /></div>
        <div onClick={() => handleTagClick('MUI')}><WallBtn text={'MUI'} /></div>
        <div onClick={() => handleTagClick('Shaun')}><WallBtn text={'Shaun'} /></div>
        <div onClick={() => handleTagClick('Development')}><WallBtn text={'Development'} /></div>
        <div onClick={() => handleTagClick('blog')}><WallBtn text={'blog'} /></div>
        <div onClick={() => handleTagClick('Rules')}><WallBtn text={'Rules'} /></div>
      </Box>
  </Paper>
  </Box>
  )
}
