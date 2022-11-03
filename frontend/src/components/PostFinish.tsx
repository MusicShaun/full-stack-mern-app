
import { Typography,Button,Box, Container, Paper } from "@mui/material";
// import * as React from "react";
import React from 'react'; 
import { Dispatch, SetStateAction } from "react";
import { Link as RouterLink } from 'react-router-dom';

interface IProps  {
  setPostFinish: Dispatch<SetStateAction<boolean>>
}

export default function PostFinish( {setPostFinish}:IProps) {



  return (

      <Container  maxWidth={false}
          sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightgrey',
          zIndex: 20,
      }}>
        <Paper elevation={3} sx={{
          position: 'relative',
          width: `80%`, 
          minWidth: '400px',
          maxHeight: '700px',
          p: 3, 
          borderRadius: 3, 
          color: '#1A2027', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 5,
          ":hover": {
            boxShadow: 8,
            },
          }}
          >
            <Typography variant='h1' 
                    sx={{
                      
                    }}>
                Post successful!
              </Typography>
  
        <Box component="form"  sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '300px',
              width: '70%',
            }}>
  
          <Button 
                  onClick={() => setPostFinish(false)}
                  component={RouterLink} to='/wall' 
                  variant="contained" color="primary" type="submit" size="large" 
                  sx={{
                    backgroundColor: 'primary.light', 
                    fontWeight: 600,
                  }}
              
              >
            Okay
          </Button>
        </Box>
        </Paper>
    </Container>


  )
}