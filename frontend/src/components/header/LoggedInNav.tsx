import React from 'react'
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const killLinkStyle = {
  textDecoration: 'none',
  underline: 'none',
  color: 'inherit',
  width: '100%', height: '100%'
}


type IProps = {
  handleLogout: () => void;
}


export default function LoggedInNav( {handleLogout } : IProps) {

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleOpenOutMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseOutMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <Box sx={{  display: { xs: 'flex', md: 'none' } }}>
    <IconButton
          size='large'
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenOutMenu}
          color="primary"
          sx={{pt: 0, pb: 0}}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
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
        <MenuItem onClick={handleCloseOutMenu}>
        <Button variant={window.location.href.includes('wall') ? "contained" : "outlined"} 
                  size="large"
                  sx={{ fontWeight: 600, mr: '0.5rem', flex: '1',
                      backgroundColor: window.location.href.includes('wall') ? 'primary.light' : 'inherit',
                      color: window.location.href.includes('wall') ? 'contrastText' : 'secondary.light'
                  }}
                  onClick={() => navigate('/wall')}                  
                  >Wall
          </Button>
        </MenuItem>

        <MenuItem onClick={handleCloseOutMenu}>
        <Button variant={window.location.href.includes('post') ? "contained" : "outlined"} 
                  size="large"
                  sx={{ fontWeight: 600, mr: '0.5rem', flex: '1',
                      backgroundColor: window.location.href.includes('post') ? 'primary.light' : 'inherit',
                      color: window.location.href.includes('post') ? 'contrastText' : 'secondary.light'
                  }}
                  onClick={() => navigate('/post')}                  
                  >Post
          </Button>
        </MenuItem>

        <MenuItem onClick={handleCloseOutMenu}>
        <Button variant={window.location.href.includes('profile') ? "contained" : "outlined"} size="large" 
                  sx={{ fontWeight: 600, mr: '0.5rem', flex: '1',
                  backgroundColor: window.location.href.includes('profile') ? 'primary.light' : 'inherit',
                  color: window.location.href.includes('profile') ? 'contrastText' : 'secondary.light'
              }}
                  >
            <Link to='profile' style={killLinkStyle}>Profile</Link>  
          </Button>
        </MenuItem>

        <MenuItem onClick={handleCloseOutMenu}>
        <Button variant="text" size="large"  sx={{color: 'secondary.light', flex: 1 }}
                  onClick={handleLogout}
                  >Logout
          </Button>
        </MenuItem>
        </Menu>
      </Box>

    )
}
