import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Container from '@mui/material/Container';
const settings = [
  { name: 'Gestionar peliculas', route: '/editMovies' },
  { name: 'Gestionar usuarios', route: '/manageUsers' },
  { name: 'Historial de compras', route: '/purchaseHistory' }
];

function Appbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (route) => {
    handleCloseUserMenu();
    navigate(route);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#424769' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img 
            onClick={() => navigate('/')} 
            className='Logo' 
            src='https://ironfilms.s3.us-east-2.amazonaws.com/Ironfilms.png' 
            alt="Logo" 
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, bgcolor: '#424769' }}>
            {/* Other navigation items can be added here */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <img className='MenuIcon' alt="Menu Icon" src="/static/menu.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => handleMenuItemClick(setting.route)}
                >
                  <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LoginForm />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Appbar;
