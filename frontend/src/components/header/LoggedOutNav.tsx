import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';


const killLinkStyle = {
  textDecoration: 'none',
  underline: 'none',
  color: 'inherit',
  width: '100%', height: '100%'
}


export default function LoggedOutNav( ) {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleOpenOutMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseOutMenu = () => {
    setAnchorElNav(null)
  }

  return (

    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    <IconButton
          size='large'
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenOutMenu}
          color="primary"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          sx={{ mt: '45px',}}
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseOutMenu}
        >
        <MenuItem onClick={handleCloseOutMenu}  sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" size="large"
              sx={{fontSize: 16, fontWeight: 600, width: '100%'}} 
              >
          <Link to='login' style={killLinkStyle} >Login</Link>  
        </Button>
        </MenuItem>
        <MenuItem onClick={handleCloseOutMenu}>
            <Button variant="outlined"  size="large"
                sx={{fontSize: 16, fontWeight: 600 }} 
                >
          <Link to='register' style={killLinkStyle}>Create Account</Link>  
        </Button>
        </MenuItem>
          
        </Menu>
      </Box>
   

    )
}
