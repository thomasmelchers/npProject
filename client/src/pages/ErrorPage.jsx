import { Container, ThemeProvider, Typography, Grid, Link } from '@mui/material';
import React from 'react';
import customTheme from '../assets/theme';


const ErrorPage = () => {
  return (
  <main>
  <Container height='100vh'>
    <ThemeProvider theme={customTheme}>
    <Grid container height= '100vh' direction='row' justifyContent='center' alignItems='center'>
      <Grid item>
        <Typography color='primary' textAlign='center' variant='h3'> Sorry, your request is unavailable.</Typography>
        <Typography color='error' textAlign='center' variant='h4' mt={2}> Error 404 </Typography>
        <Typography  mt={3}> The link you have followed is maybe broken or the page doesn't exist anymore. <Link href={'/'} underline='none' color='primary'>Come back to Green Cottages</Link></Typography>

      </Grid>
    </Grid>
    </ThemeProvider>
  </Container>
</main>)
};

export default ErrorPage