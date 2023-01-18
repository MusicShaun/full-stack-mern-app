import { Button } from "@mui/material";

interface IProps {
  setClearListings: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WallClearSearch({ setClearListings }: IProps) {

  return (
    <Button 
    variant="contained"
    sx={{bgcolor:'error.main',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        mt: 3
    }}
      onClick={() => setClearListings(false)}>
    Clear search
  </Button>
  )
}
