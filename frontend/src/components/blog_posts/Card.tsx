import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Avatar, Typography, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState , useEffect, useRef } from 'react'; 
import useMatchPicture from '../../hooks/usePicturesAndBlogMatcher';


type IProps = {
  checkBodies?: () => void; 
  counter?: number;
  content: any;
  pinned: boolean;
}


export default function Card( { checkBodies, counter = 0,content, pinned }: IProps) {

  const [ showBody, setShowBody ] = useState<boolean>(false)
  const [ delayText, setDelayText ] = useState<boolean>(false)
  const scrollRef = useRef<HTMLDivElement>(null);

  const match = useMatchPicture({ content })

  function handleExpandPost() {
    if (!showBody && checkBodies) {
      checkBodies();
    }
    // eslint-disable-next-line 
    const renderAfteruseEffect = setTimeout(() => {
      setShowBody(prev => !prev)
    }, 5) 

    if (!delayText) {
      const timer = setTimeout(() => {
        setDelayText(prev => !prev)
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, 250);
    return () => clearTimeout(timer);
    } else {
      setDelayText(prev => !prev)
    }
  }

  useEffect(() => {
    setShowBody(false)
    setDelayText(false)
  }, [counter])
  

  return (
    <Paper ref={scrollRef} elevation={2}
          sx={{
          position: 'relative',
          p: 3, 
          borderRadius: 3, 
          color: '#1A2027', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'width 0.4s, max-height 0.6s, box-shadow 0.2s, transform 0.2s ',
          backgroundColor: 'secondary.contrastText',
          ":hover": {
            boxShadow: 3,
            transform: 'scale(1.01)',
            transition: 'all 0.2s ease',
            },
          }}          
          >
      {pinned && <Box sx={{
        position: 'absolute',
        transform: 'translate(-33px, -40px)',
        borderColor: 'secondary.light',
        borderWidth: '2px',
        borderStyle: 'solid',
        backgroundColor: 'secondary.contrastText',
        color: 'text.secondary',
        p: 0.5,
        borderRadius: '14px',
        fontSize: '0.8rem'
      }}>
        Pinned
      </Box>}      
      <Box           
           sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mb: 2,
            fontWeight: '500',
            
          }}>
        <Chip label={content.tag.toUpperCase()} 
          sx={{color: 'text.primary', height: '22px'}}/>
        <Chip label={content.tag2.toUpperCase()} 
          sx={{color: 'text.primary', height: '22px'}}/>     
      </Box>


        <Typography variant='h2' 
            sx={{mb: '5px', 
                  fontSize: !showBody ? '1.125rem' : '1.6rem', 
                  color: 'text.secondary',
                  }}>
        {content.header}
        </Typography>
      
        {!delayText ?
        <Typography variant='body1' sx={{color: 'text.primary',}}>
          {`${content.body.substring(0, 110)} . . . . .`}
        </Typography>
        :
        <Box >
          <Typography variant='body1' sx={{mb: 1, color: 'text.primary', whiteSpace: 'pre-line' }}>{content.body}</Typography>
        </Box>
        }

      <Avatar alt="https://res.cloudinary.com/dyneqi48f/image/upload/v1669686479/qqsmbl9quuhnvbrs7daw.jpg"
        src={match} 
          sx={{
            mt: '20px',
            mb: '10px',
            height: '34px',
            width: '34px'
            }}>
        </Avatar> 

      <Box  sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '45px'
            }}>
        <Box >
          <Typography variant='body2' sx={{color: 'text.secondary',}} 
          > 
          {`${content.firstName} ${content.lastName}`}
          </Typography>
          <Typography sx={{
            fontSize: '0.75rem',
            color: 'text.secondary',
          }}> 
            {content.createdAt.substring(0, 10)}
          </Typography>
        </Box>
          <Button 
            onClick={handleExpandPost}
            sx={{
            fontSize: '0.825rem',
            fontWeight: '700',
            textTransform: 'none',
          }}>
            {!showBody ? 'Read More' :'Read Less'}
            <ArrowForwardIosIcon sx={{fontSize: 'small'}}/>
          </Button> 
      </Box>

    </Paper>

  )
}
 


