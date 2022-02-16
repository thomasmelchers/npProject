import React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'
import SpaIcon from '@mui/icons-material/Spa'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import AuthContext from '../../context/AuthContext'
import { useContext } from 'react'
import InfoCottage from '../Typography/InfoCottage'

const SearchCard = ({
  cottageName,
  city,
  summary,
  ratings,
  price,
  comments,
  picture,
}) => {
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn
  const user = authContext.user

  return (
    <Paper elevation={5}>
      <Grid container direction="row" height={{ md: '30vh', sx: '50vh' }}>
        <Grid item xs={12} md={4} height="100%">
          <img
            src="images/accomodations/faro.jpg"
            alt={cottageName}
            height="100%"
            width="100%"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          /* pl={{md: 3}} */
          p={4}
          height="100%" /* style={{ borderStyle: 'dotted', borderColor: 'green' }} */
        >
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="h4"
                color="primary"
                textTransform="uppercase"
              >
                {cottageName}
              </Typography>
            </Grid>
            {isLoggedIn && user.role === 'guest' && (
              <Grid item>
                <SpaOutlinedIcon fontSize="large" />
              </Grid>
            )}
          </Grid>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography variant="h6" color="secondary" mb={0.5}>
                {city}
              </Typography>
            </Grid>
            <Grid
              container
              direction="column"
              item
              xs={12}
              sx={{ display: { xs: 'none', md: 'flex' } }}
              mb={0.5}
            >
              <Typography
                color="primary"
                textTransform="uppercase"
                fontWeight={500}
              >
                description:
              </Typography>
              <Typography textAlign="justify">{summary}</Typography>
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Grid item>
              <InfoCottage
                valueLabel={'Rating Average:'}
                colorLabel={'primary'}
                value={`${ratings}/5`}
                colorValue={'black'}
              />
            </Grid>
            <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
              <InfoCottage
                valueLabel={'Number of Comments'}
                colorLabel={'primary'}
                value={comments}
                colorValue={'black'}
              />
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item>
              <InfoCottage
                valueLabel={'Price/Night:'}
                colorLabel={'primary'}
                value={`${price}€`}
                colorValue={'black'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SearchCard
