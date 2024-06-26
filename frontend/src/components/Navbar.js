import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Navbar = () => {
  const { authToken, user, setUser, logout } = useAuth(); // Ensure setUser is destructured from useAuth
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login'); // Navigate to login page after logout
  };

  const handleProfile = () => {
    navigate('/profile'); // Assuming there is a profile route
    handleMenuClose();
  };

  const handleChangePassword = () => {
    navigate('/change-password'); // Assuming there is a change password route
    handleMenuClose();
  };

  const handleCloseApp = () => {
    window.close();
  };

  // Fetch the current user info
  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:8000/api/user/', {
        headers: {
          'Authorization': `Token ${authToken}`
        }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user info!', error);
      });
    }
  }, [authToken, setUser]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Medical Analysis Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/patients">
          Patients
        </Button>
        <Button color="inherit" component={Link} to="/data-display">
          Data Display
        </Button>
        <Button color="inherit" component={Link} to="/analysis">
          Analysis
        </Button>
        {authToken && user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleMenuOpen}>
              <Avatar src={user.avatar ? `http://localhost:8000${user.avatar}` : ''} alt={user.username} />
            </IconButton>
            <Typography variant="body1" sx={{ marginRight: 2 }}>{user.username}</Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem onClick={handleCloseApp}>Close App</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;