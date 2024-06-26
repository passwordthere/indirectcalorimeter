import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, IconButton, CssBaseline } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const { authToken, user, setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(''); // New state for preview URL

  useEffect(() => {
    if (authToken && user) {
      setUsername(user.username);
      setEmail(user.email);
      setAvatar(user.avatar);
    }
  }, [authToken, user]);

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setNewAvatar(e.target.files[0]);
      setAvatarPreview(URL.createObjectURL(e.target.files[0])); // Update preview URL
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    if (newAvatar) {
      formData.append('avatar', newAvatar);
    }

    try {
      const response = await axios.put('http://localhost:8000/api/user/', formData, {
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(response.data); // Update context user
      setAvatar(response.data.avatar); // Update avatar URL
      setAvatarPreview(''); // Clear preview URL
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('There was an error updating the profile!', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Avatar src={avatarPreview || (avatar ? `http://localhost:8000${avatar}` : '')} sx={{ width: 100, height: 100, mt: 2 }} />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="avatar-upload"
          type="file"
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar-upload">
          <IconButton color="primary" component="span">
            <Button variant="contained" component="span" sx={{ mt: 2 }}>
              Change Avatar
            </Button>
          </IconButton>
        </label>
        <form onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;