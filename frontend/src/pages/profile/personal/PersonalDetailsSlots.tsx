import { Button, Grid, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { SetStateAction, useEffect, useState } from 'react'


interface IProps {
  attribute: string;
  textFieldString: string;
  counter: number;
  type?: string;
  handlePatchUpdate: (updatedItem: any) => void
}

export default function DetailSlots( 
  { attribute, textFieldString,  counter ,type, handlePatchUpdate
  } : IProps) {

  const [ openWindow, setOpenWindow ] = useState<boolean>(false);
  const [fieldState, setFieldState ] = useState('')

  useEffect(() => { //close the pop ups 
    setOpenWindow(false)
  }, [counter])


  useEffect(() => { // escapes out of window
    function escape(e: any){
      if (e.key === 'Escape'){
      setOpenWindow(false)}
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup',  (e) => escape(e)) ;
  }, [] )

  function sortAttributeNames(attribute: string) {
    if (attribute === 'First Name') return {firstName: fieldState}
    if (attribute === 'Last Name') return {lastName: fieldState}
    if (attribute === 'email') return {email: fieldState}
  }

  return (
    <>
    <Grid item xs={12} 
          sx={{
              display: 'flex', 
              flex: 1 , 
              height: '80px',
              minHeight: '80px',
              borderBottom: `1px solid ${grey[300]}`,
              alignItems: 'center',
               }}>
    

    <Typography variant='h6' sx={{color: 'text.secondary', flex: 0.3, fontWeight: '700', minWidth: '85px'}} 
      >{attribute}
    </Typography>

    {textFieldString && !openWindow && 
      <Typography  variant='h6' sx={{flex: 1, fontWeight: '600'}}>
        {textFieldString}
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
        onChange={(e) => setFieldState(e.currentTarget.value)}
        placeholder={textFieldString}
        autoComplete={type}
        name={attribute}
        fullWidth
        id={attribute}
        autoFocus
        type={type}
      />
      <Button onClick={() => setOpenWindow(false)}  
      >undo
    </Button> 
      <Button onClick={() => handlePatchUpdate(sortAttributeNames(attribute))} 
      >save
    </Button> 

    </Grid>
  }


  </Grid>


  </>)
}
