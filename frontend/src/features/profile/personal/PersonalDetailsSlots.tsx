import { Button, Grid, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hook';
import { selectBlogsStatus } from '../../wall/wallSlice';


interface IProps {
  attribute: string;
  textFieldString: string;
  type?: string;
  handlePutUpdate: (updatedItem: any) => void
}

export default function DetailSlots({ attribute, textFieldString ,type, handlePutUpdate} : IProps) {

  const [fieldState, setFieldState ] = useState('')
  const [openWindow, setOpenWindow] = useState(false)
  
  const status = useAppSelector(selectBlogsStatus)

  useEffect(() => {
    if (status === 'idle') {
      setOpenWindow(false)
    }
  }, [status])

  useEffect(() => { // escapes out of window
    function escape(e: any){
      if (e.key === 'Escape'){
        setOpenWindow(false)}
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup',  (e) => escape(e)) ;
  }, [setOpenWindow] )

  function sortAttributeNames(attribute: string) {
    if (attribute === 'First Name') return {firstName: fieldState}
    if (attribute === 'Last Name') return {lastName: fieldState}
    if (attribute === 'email') return { email: fieldState }
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
      <Button onClick={() => setOpenWindow(true)}  
      >undo
    </Button> 
      <Button onClick={() => handlePutUpdate(sortAttributeNames(attribute))} 
      >save
    </Button> 

    </Grid>
  }


  </Grid>


  </>)
}
