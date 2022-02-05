import React from 'react'
import { Typography, Box, Grid } from '@mui/material'
import customTheme from '../../assets/theme'
import { ThemeProvider } from '@mui/material'

const Jumbo = () => {
  const jumbo = {
    display: 'flexbox',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <Box mt={4}>
      <Grid container heigth='30vh'>
        <Grid item xs={12} sx={jumbo} >
          <ThemeProvider theme={customTheme}>
            <Typography
              variant="h1"
              color="primary"
              textAlign="center"
              fontWeight={700}
            >
              Welcome to Green Cottages
            </Typography>
            <Typography
              textAlign="center"
              color="primary"
              fontSize={'2em'}
              sx={{ padding: { xs: 3 } }}
            >
              Green Cottages is a way to change our travel habits into
              eco-friendly travel habits. Let's travel sustainably and reduce
              our footprint. Let's travel green, respecting nature, communities,
              and wildlife !
            </Typography>
          </ThemeProvider>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Jumbo
