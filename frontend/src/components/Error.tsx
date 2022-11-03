import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Dispatch } from 'react';


type IProps = {
  setError: Dispatch<React.SetStateAction<boolean>>
}

export default function Error( {setError} : IProps) {



  return (
    <Alert severity="error" onClick={() =>setError(false)}>
       <AlertTitle>Error</AlertTitle>
       Something went wrong with your sign in<strong>check your spelling!</strong>
    </Alert>
  )
}