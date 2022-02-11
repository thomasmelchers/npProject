import React from 'react'
import { Box, Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import SpaIcon from '@mui/icons-material/Spa'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import AuthContext from '../../context/AuthContext'
import { useContext } from 'react'
import customTheme from '../../assets/theme'

const SearchCard = (props) => {
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn
  const user = authContext.user

  return (
    <ThemeProvider theme={customTheme}>
    <Paper
      elevation={5}
      /* variant='outlined' */>
    <Grid
      container
      direction="row"
      height="25vh"
      
      /* style={{ borderStyle: 'dotted', borderColor: 'black' }} */
    >
      <Grid item xs={4} /* style={{ borderStyle: 'dotted', borderColor: 'red' }} */>
        <img src={props.picture} alt={props.cottageName} width="100%" />
      </Grid>
      <Grid item xs={8} padding={3}/* style={{ borderStyle: 'dotted', borderColor: 'green' }} */>
        <Grid container direction="row" justifyContent="space-between" >
          <Grid item /* style={{ borderStyle: 'dotted', borderColor: 'blue' }} */>
            <Typography variant="h4" color='primary'>{props.cottageName}</Typography>
          </Grid>
          {(isLoggedIn && user.role === 'guest') && 
            <Grid item /* style={{ borderStyle: 'dotted', borderColor: 'orange' }} */>
              <SpaOutlinedIcon fontSize="large" />
            </Grid>
           } 
        </Grid>
        <Grid
          container
          direction="column"
          /* style={{ borderStyle: 'dotted', borderColor: 'orange' }} */
        >
          <Grid item xs={12}>
            <Typography variant='h6' color='secondary'>{props.city}</Typography>
          </Grid>
          <Grid item xs={12} sx={{display:{xs: 'none', md: 'block'}}}>
            <Typography textAlign='justify'>{props.summary}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          /* style={{ borderStyle: 'dotted', borderColor: 'olive' }} */
        >
          <Grid item>
            <Typography>Rating: <span color='primary'>{props.rating}/5</span></Typography>
          </Grid>
          <Grid item sx={{display:{xs: 'none', md: 'block'}}}>
            <Typography>Number of Comments: <span color='primary'>{props.comments}</span></Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          /* style={{ borderStyle: 'dotted', borderColor: 'violet' }} */
        >
          <Grid item>
            <Typography>Price: {props.price}/night</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Paper>
    </ThemeProvider>
  )
}

export default SearchCard
