import { useState } from 'react'
import { TextField, Box, Grid, Button, ThemeProvider } from '@mui/material'
import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from 'axios';
import customTheme from '../../assets/theme';


const SearchBar = () => {
  const [city, setCity] = useState('')
  const cityChangeHandler = (event) => {
    setCity(event.target.value)
  }

  const submitHandler = async () => {
    if (!city) {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/v1/users/accomodations`,
            param: city
        })
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
    <Box component="form" noValidate onSubmit={submitHandler}>
      <Grid container direction='row' justifyContent='center' alignItems='center' height='100vh'>
        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2} /* style={{borderStyle:'dashed'}} */>
          <Grid item sx={8} md={4}>
          <TextField
            id="city"
            name="city"
            fullWidth
            variant="filled"
            value={city}
            onChange={cityChangeHandler}
            style={{backgroundColor: 'rgba(255, 192, 116, 0.4)', borderRadius: 12, border:14, borderColor: 'rgba(255, 192, 116)', underline:'none'}}
          ></TextField>
          </Grid>
          <Grid item sx={4} md={2}><Button variant="outlined" size='large' startIcon={< SearchOutlinedIcon/>} /></Grid>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
  )
}

export default SearchBar
