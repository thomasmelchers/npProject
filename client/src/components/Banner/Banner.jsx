import React from 'react'
import treehousePicture from '../../assets/pictures/application/treehouse.jpg'
import { Box, Grid, Link } from '@mui/material'
import SearchBar from '../SearchBar/SearchBar'
import ButtonMui from '../Button/Button'

const bannerImage = {
  backgroundImage: `url(${treehousePicture})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: 'auto',
}

function Banner() {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sx={bannerImage}>
          <Grid container justifyContent='center' alignItems='center' style={{height: '100vh'}}>
            <Grid item>
              <Link href='/Accomodations' underline='none'>
              <ButtonMui buttonName={"Let's Discover our Green Cottages"} color={'secondary'}/>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Banner
