import { Button, Grid, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { SetStateAction, useEffect, useState } from 'react'


interface IProps {
  setFirstName?: React.Dispatch<SetStateAction<string>>;
  setLastName?: React.Dispatch<SetStateAction<string>>;
  setEmail?: React.Dispatch<SetStateAction<string>>;
  attribute: string;
  textFieldString: string;
  counter: number;
  type?: string;

}

export default function DetailSlots( 
  {setFirstName, setLastName, setEmail, attribute, textFieldString,  counter ,type
  } : IProps) {

  const [ openWindow, setOpenWindow ] = useState<boolean>(false);

  useEffect(() => { //close the pop ups 
    setOpenWindow(false)
  }, [counter])

  useEffect(() => {
    function escape(e: any){
      if (e.key === 'Escape'){
      setOpenWindow(false)}
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup',  (e) => escape(e)) ;
  }, [] )

  function handleDataInput(e: any) {
    if (attribute === 'First Name' && setFirstName){
      setFirstName(e.currentTarget.value)
    } else if (attribute === 'Last Name' && setLastName){
      setLastName(e.currentTarget.value)
    } else if (attribute === 'Email' && setEmail){
      setEmail(e.currentTarget.value)
    } 
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
        onChange={(e) => handleDataInput(e)}
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

    </Grid>
  }


  </Grid>


  </>)
}
