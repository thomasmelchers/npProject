import { Container, ThemeProvider, Typography, Grid } from '@mui/material';
import React from 'react';
import customTheme from '../assets/theme';


const ErrorPage = () => {
  return (
  <main>
  <Container>
    <ThemeProvider theme='customTheme'>
    <Grid container direction='row' justifyContent='center' alingItems='center' height='100vh'>
      <Grid item>
        <Typography color='primary'> Sorry, your request doesn't exist</Typography>
        <Typography color='error'> Error 404 </Typography>
      </Grid>
    </Grid>
    </ThemeProvider>
  </Container>
</main>)
};

export default ErrorPage