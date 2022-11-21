import { Button } from '@mui/material'

interface IProps {
  text: string; 
}
export default function WallBtn({text}: IProps) {
  return (
    <Button
      sx={{
      textTransform: 'none',
      height: '22px', 
      backgroundColor:'secondary.contrastText', 
      fontSize: '1.2rem', 
      p: 1.6, 
      borderRadius: '20px',
      borderColor: 'secondary.main', 
      borderWidth: '1px', 
      borderStyle: 'solid',
      color: 'text.secondary',
      mr: 1,
      mb: 1
    }}>
      {text}
      </Button>
  )
}
