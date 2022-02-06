import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Stack,
  ThemeProvider,
  Paper,
  Link,
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'
import customTheme from '../assets/theme'
import ButtonMui from '../components/Button/Button'

const Dashboard = () => {
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn
  console.log(isLoggedIn)
  const user = authContext.user
  const role = user.role

  /* const date = new date (user.createdAt) */
  /* const year = date.getYear() */
  /* console.log(date) */
  return (
    <main>
      <ThemeProvider theme={customTheme}>
        <Container>
          <Paper elevation={5}>
            <Grid container mt={15} padding={5} sx={{xs: {direction: 'column'}}}>
              <Grid item xs={6}>
                <Typography variant="h3" color="secondary">
                  Hi {user.firstname}
                </Typography>
                <Typography mt={2}>
                  <span color="primary"> Member since: </span> {user.createdAt}
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <Grid container justifyContent='center' alignItems='center'>
                  <Grid item p={5} style={{borderStyle: 'solid', borderRadius: 8, borderColor:'#FFC074'}}>
                  {user.role === 'guest' ? (
                  <Typography variant='h5' color='primary' textAlign='center'>You've already done travel</Typography>
                  ) : (
                  <Typography variant='h5' color='primary' textAlign='center'>You've already hosted green travellers</Typography>
                  )}
                  </Grid>
                </Grid>
                
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={5}>
            <Grid container mt={5} padding={5}>
              <Grid item xs={12}>
                <Typography variant="h4" mb={5} color="secondary">
                  About Me
                </Typography>
              </Grid>

              <Grid container justifyContent="space-around">
                <Grid item xs={3}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Avatar
                      alt={user.name}
                      src="../../default-user.png"
                      sx={{ width: 150, height: 150 }}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={7}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography>
                        <EmailOutlinedIcon color="primary" /> {user.email}
                      </Typography>
                      <Typography>
                        <LocalPhoneOutlinedIcon color="primary" />
                        {user.phoneNb}
                      </Typography>
                      <Typography>
                        <QuestionAnswerOutlinedIcon color="primary" />
                        {user.languagesSpoken}
                      </Typography>
                    </Grid>
                    <Grid item mt={3}>
                      <Link
                        href={`/UpdateProfile/${user._id}`}
                        underline="none"
                      >
                        <ButtonMui buttonName={'Edit Profile'}></ButtonMui>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {user.role === 'guest' ? (
            // GUEST AREA

            <Paper elevation={5}>
              <Grid container mt={5} p={5}>
                <Grid item xs={12}>
                  <Typography variant="h4" mb={5} color="secondary">
                    My Reservations
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Paper>
                    <Grid container padding={5}>
                      <Grid item xs={5}>
                        <img /* src={} label={} */ />
                      </Grid>
                      <Grid item={7}>
                        <Grid container direction="column">
                          <Grid item> Contenu </Grid>
                          <Grid item mt={3}>
                            <Link
                              /*  href={`/UpdateProfile/${user._id}`} */
                              underline="none"
                            >
                              <ButtonMui
                                buttonName={'See My Reservation'}
                              ></ButtonMui>
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            // HOST AREA

            <Paper elevation={5}>
              <Grid container mt={5} p={5}>
                <Grid item xs={12}>
                  <Typography variant="h4" mb={5} color="secondary">
                    Managing my Green Cottage
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                <Paper variant ='outlined' 
                borderColor='secondary'>
                  <Grid container padding={5}>
                    <Grid item xs={5}>
                      <img /* src={} label={} */ />
                    </Grid>
                    <Grid item={7}>
                      <Grid container direction="column">
                        <Grid item> Contenu </Grid>
                        <Grid item mt={3}>
                          <Link
                            /*  href={`/UpdateProfile/${user._id}`} */
                            underline="none"
                          >
                            <ButtonMui
                              buttonName={'See My Reservation'}
                            ></ButtonMui>
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
                </Grid>
                
              </Grid>
            </Paper>
          )}

          {user.role === 'host' && (
            <Paper elevation={5}>
              <Grid container mt={5} p={5}>
                <Grid item xs={12}>
                  <Typography variant="h4" mb={5} color="secondary">
                    All the Bookings 
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                <Paper variant ='outlined' 
                borderColor='secondary'>
                  <Grid container padding={5}>
                    <Grid item xs={5}>
                      <img /* src={} label={} */ />
                    </Grid>
                    <Grid item={7}>
                      <Grid container direction="column">
                      <Grid item> <Typography variant='h4' color='primary'>CottageName {/* {accomodations.cottageName} */}</Typography> </Grid>
                        <Grid item mt={2}> Number of upcomming bookings </Grid>
                        <Grid item mt={3}>
                          <Link
                            /*  href={`/UpdateProfile/${user._id}`} */
                            underline="none"
                          >
                            <ButtonMui
                              buttonName={'See My Bookings'}
                            ></ButtonMui>
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
                </Grid>

              </Grid>
            </Paper>
          )}
        </Container>
      </ThemeProvider>
    </main>
  )
}

export default Dashboard
