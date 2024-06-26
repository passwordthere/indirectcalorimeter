// src/pages/DataDisplay.js
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, CssBaseline } from '@mui/material';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [subjectInfo, setSubjectInfo] = useState({});
  const [systemInfo, setSystemInfo] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const { authToken } = useAuth();

  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:8000/api/data/', {
        headers: {
          'Authorization': `Token ${authToken}`
        }
      })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

      // Fetch subject and system info
      axios.get('http://localhost:8000/api/subject-info/', {
        headers: {
          'Authorization': `Token ${authToken}`
        }
      })
      .then(response => {
        setSubjectInfo(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

      axios.get('http://localhost:8000/api/system-info/', {
        headers: {
          'Authorization': `Token ${authToken}`
        }
      })
      .then(response => {
        setSystemInfo(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }
  }, [authToken]);

  const handleStart = () => {
    setIsRunning(true);
    // Implement the start logic
  };

  const handleStop = () => {
    setIsRunning(false);
    // Implement the stop logic
  };

  const scatterData = {
    datasets: [
      {
        label: 'Sample Data',
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 25 },
          { x: 20, y: 30 },
          { x: 25, y: 35 },
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <Container component="main" sx={{ flexGrow: 1, mt: 10 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Data Display
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Button variant="contained" color="primary" onClick={handleStart} disabled={isRunning}>
                Start
              </Button>
              <Button variant="contained" color="secondary" onClick={handleStop} disabled={!isRunning} sx={{ ml: 2 }}>
                Stop
              </Button>
            </Box>
            <Box>
              <Typography variant="body1">Name: {subjectInfo.name}</Typography>
              <Typography variant="body1">Gender: {subjectInfo.gender}</Typography>
              <Typography variant="body1">Age: {subjectInfo.age}</Typography>
              <Typography variant="body1">Height: {subjectInfo.height}</Typography>
              <Typography variant="body1">Weight: {subjectInfo.weight}</Typography>
              <Typography variant="body1">Admission Time: {subjectInfo.admission_time}</Typography>
              <Typography variant="body1">Elapsed Time: {subjectInfo.elapsed_time} minutes</Typography>
              <Typography variant="body1">Remarks: {subjectInfo.remarks}</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Room Volume: {systemInfo.room_volume}</Typography>
              <Typography variant="body1">Airflow: {systemInfo.airflow}</Typography>
              <Typography variant="body1">Algorithm: {systemInfo.algorithm}</Typography>
              <Typography variant="body1">Temperature: {systemInfo.temperature} °C</Typography>
              <Typography variant="body1">Humidity: {systemInfo.humidity} %</Typography>
            </Box>
          </Box>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper>
                <Scatter data={scatterData} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Scatter data={scatterData} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Scatter data={scatterData} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Scatter data={scatterData} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default DataDisplay;