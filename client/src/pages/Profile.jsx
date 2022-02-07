import React, { useContext, useState } from 'react'
import {
  ThemeProvider,
  Container,
  Paper,
  Grid,
  Typography,
  Avatar,
} from '@mui/material'
import customTheme from '../assets/theme'
import AuthContext from '../context/AuthContext'
import ButtonMui from '../components/Button/Button'

const Profile = () => {
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn
  console.log(isLoggedIn)
  const user = authContext.user

  return (
    <main>
      <ThemeProvider theme={customTheme}>
        <Container>
          <Grid container mt={15}>
            <Grid item xs={12}>
              <Paper eleavation={5}>
                <Grid Container direction="column">
                  <Grid item p={5} style={{borderStyle:'dashed', borderColor: 'green'}}>
                    <Typography variant="h2" color='secondary'>
                      Profile of {user.firstname}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} px={5} style={{borderStyle:'dashed', borderColor: 'orange'}}>
                    <Paper variant="outlined">
                      df
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </main>
  )
}

export default Profile
