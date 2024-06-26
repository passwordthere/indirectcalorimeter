import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, CssBaseline } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const { authToken } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword1 !== newPassword2) {
      setErrors(['New password and confirm password do not match']);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/password/change/', {
        old_password: oldPassword,
        new_password1: newPassword1,
        new_password2: newPassword2,
      }, {
        headers: {
          'Authorization': `Token ${authToken}`,
        }
      });

      if (response.status === 200) {
        alert('Password changed successfully');
        navigate('/profile'); // Redirect to profile page after successful password change
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(Object.values(error.response.data).flat());
      } else {
        setErrors(['Failed to change password']);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        {errors.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {errors.map((error, index) => (
              <Typography key={index} color="error">
                {error}
              </Typography>
            ))}
          </Box>
        )}
        <form onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="oldPassword"
            label="Old Password"
            name="oldPassword"
            type="password"
            autoComplete="current-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword1"
            label="New Password"
            name="newPassword1"
            type="password"
            autoComplete="new-password"
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword2"
            label="Confirm New Password"
            name="newPassword2"
            type="password"
            autoComplete="new-password"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePassword;