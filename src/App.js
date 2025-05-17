import React from 'react';
import AdmissionDashboard from './views/AdmissionDashboard';
import { CssBaseline, Container, Typography } from '@mui/material';

const App = () => (
  <>
    <CssBaseline />
    <Container>
      <Typography variant="h4" align="center" gutterBottom mt={2}>Admission Analytics Dashboard</Typography>
      <AdmissionDashboard />
    </Container>
  </>
);

export default App;
