import { Paper, styled, Button } from "@mui/material";
import shadows from "@mui/material/styles/shadows";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { showUpdateFalse } from "../../features/showUpdateSlice";

interface IProps {
  text: string;
  destination: string;
}
export default function ProfileMUIButtons( {text, destination} : IProps) {
  
  const dispatch = useAppDispatch();
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  const navigate = useNavigate();

  function handleNavigationButton() {
    navigate(`${destination}`)
    dispatch(showUpdateFalse())
  }
  
  return (
    <Button sx={{height: '15%', 
                maxHeight: '80px', 
                display: 'flex', 
                alignItems: 'center', 
                color: 'text.main',
                borderTopRightRadius: '0px',  
                borderEndEndRadius: '0px', 
                boxShadow: shadows[3], 
                '&:hover': {
                  background: "lightgrey"}  
                 }} 
      onClick={handleNavigationButton}>
      <Item sx={{display: 'flex',  
                height: '100%', 
                width: '100%', 
                padding: '0 0 0 32px',
                alignItems: 'center', 
                color: 'text.primary', 
                fontSize: '1.3rem',
                }}>
        {text}
      </Item>
  </Button>
  )
}
