import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { addNewBlog } from '../wall/wallSlice'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useWindowSize } from '@react-hook/window-size'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { selectUser } from '../users/usersSlice'

interface IProps {
  setConfirmDeletePost: Dispatch<SetStateAction<boolean>>
}

function AddNewPost( {setConfirmDeletePost}: IProps) {

  const dispatch = useAppDispatch()
  const [onlyWidth, onlyHeight] = useWindowSize(); 
  const refFocus = useRef<any>(null)
  
  const [ firstName, setFirstName ] = useState<any>("")
  const [ lastName, setLastName] = useState<any>("")
  const [ tag, setTag ] = useState<any>("")
  const [ tag2, setTag2 ] = useState<any>("")
  const [ header, setHeader ] = useState<any>("")
  const [ body, setBody ] = useState<any>("")
  const [ addRequestStatus, setAddRequestStatus ] = useState('idle')
  
  const userDetails = useAppSelector(selectUser)
  console.log('am i rendering')
  
  useEffect(() => {  
    if (localStorage.getItem('userInfo')){
      let helper: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
      setFirstName(helper.firstName)
      setLastName(helper.lastName)
    }
    // eslint-disable-next-line
  }, [])

    //* CHECK IF ALL FIELDS ARE FILLED IN 
    const canSave = [tag, tag2, header, body, firstName, lastName, ].every(Boolean) && addRequestStatus === 'idle';
  
    async function handleBlogPost(event: React.FormEvent<HTMLFormElement>) { 
      event.preventDefault();
      let isDraft = document.activeElement!.id === 'draft' ? true : false
      if (canSave) {
        try {
          setAddRequestStatus('pending')
          dispatch(addNewBlog({ tag, tag2, header, body, firstName, lastName, isDraft, token: userDetails.token})).unwrap()
        } catch (err: any) {
          console.log(err.message)
        } finally {
          setAddRequestStatus('idle')
          setTag('')
          setTag2('')
          setHeader('')
          setBody('')
          setFirstName('')
          setLastName('')
        }
      }
    }
  
  return (
    <Paper elevation={3} sx={{
      position: 'relative',
      width: { xs:  `92%` , md: '80%'}, 
      minWidth: '350px',
      height: { xs:  '70%' , md: '90%'},
      minHeight: '550px',
      p: { xs:  0 , md: 3}, 
      borderRadius: 3, 
      color: '#1A2027', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
        alignItems: 'center',
      zIndex: 1,
      
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
          width: { xs: `95%`, md: '70%' }, 
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
        onChange={(e) => setTag(e.target.value)}    
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
        onChange={(e) => setTag2(e.target.value)}    
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
        onChange={(e) => setHeader(e.target.value)}    
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
        onChange={(e) => setBody(e.target.value)}    
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
        <Button variant='contained' color="primary" id='delete' onClick={() => setConfirmDeletePost(true)}
                          sx={{
                            backgroundColor: 'error.main', 
                            fontWeight: 600,
                          }}>DELETE </Button>
      </Box>
    </Box>
    </Paper>
  )
}

export default AddNewPost