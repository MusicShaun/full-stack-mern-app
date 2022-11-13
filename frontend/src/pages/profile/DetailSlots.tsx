import { Button, Grid, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'

interface IProps {
  attribute: string;
  detail: string;
  editPersonalDetails: () => void;
}

export default function DetailSlots( {attribute, detail, editPersonalDetails } : IProps) {

  const [ openWindow, setOpenWindow ] = useState<boolean>(false);
  
  useEffect(() => {
    function escape(e: any){
      if (e.key === 'Escape'){
      setOpenWindow(false)}
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup',  (e) => escape(e)) ;
  }, [] )

  return (
    <>
    <Grid item xs={12} 
          sx={{display: 'flex', 
              flex: 1 , 
              padding: 3,
              borderTop: `1px solid ${grey[300]}`, 
              borderBottom: `1px solid ${grey[300]}`,
              alignItems: 'center'
               }}>
    

    <Typography variant='h6' sx={{color: 'text.secondary', flex: 0.3}} 
      >{attribute}
    </Typography>

    {detail && !openWindow && 
      <Typography  variant='h6' sx={{flex: 1}}>
        {detail}
      </Typography>
    }

    {!openWindow && 
      <Button onClick={() => setOpenWindow(true)}  
        >edit
      </Button> 
    }

  {openWindow && 
    <Grid 
      sx={{
          display: 'flex', flex: 1
      }}>
      <TextField
        // onChange={(e)}
        autoComplete={attribute}
        name={attribute}
        fullWidth
        id={attribute}
        label={attribute}
        autoFocus
        
      />
      <Button onClick={() => setOpenWindow(false)}  
      >save
    </Button> 

    </Grid>
  }


  </Grid>


  </>)
}
