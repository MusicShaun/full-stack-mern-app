import { Button } from "@mui/material";
import { endSearch } from "../searchBarSlice";
import { useDispatch } from "react-redux";


export default function WallClearSearch() {
  const dispatch = useDispatch()
  
  return (
    <Button 
    variant="contained"
    sx={{bgcolor:'error.main',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        mt: 3
    }}
      onClick={() => dispatch(endSearch())}>
    Clear search
  </Button>
  )
}
