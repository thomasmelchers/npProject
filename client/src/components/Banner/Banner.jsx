import React from 'react'
import treehousePicture from '../../assets/pictures/application/treehouse.jpg'
import { Box, Grid, } from '@mui/material'
import SearchBar from '../SearchBar/SearchBar'

const bannerImage = {
    backgroundImage: `url(${treehousePicture})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: 'auto'
}

function Banner() {
  
  return (
    <Box>
      <Grid container>
      <Grid item xs={12} sx={bannerImage}>
        <SearchBar />
      </Grid>
      </Grid>
      
    </Box>
  )
}

export default Banner
