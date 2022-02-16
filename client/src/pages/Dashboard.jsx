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
import jwt_decode from 'jwt-decode'
import { useState, useEffect } from 'react'
import axios from 'axios'
import averageRatings from '../actions/averageRatings'
import InfoCottage from '../components/Typography/InfoCottage'

const Dashboard = () => {
  // USER DATAS
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn

  const isToken = localStorage.getItem('token')
  const userId = {
    id: '',
  }
  const [user, setUser] = useState([])

  if (isToken) {
    const decodedToken = jwt_decode(isToken)
    userId.id = decodedToken.id
  }

  const getUserData = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/users/${userId.id}`
    )
    setUser(data.data.data.user)
  }

  useEffect(() => {
    getUserData()
  }, [])

  // DATA ACCOMODATIONS

  const [accomodationByUser, setAccomodationByUser] = useState('')

  const getAccomodation = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/accomodations?user_id=${userId.id}`
    )
    setAccomodationByUser(data.data.data.Accomodations)
  }

  useEffect(() => {
    getAccomodation()
  }, [])

  console.log(accomodationByUser)

  return (
    <main>
      <ThemeProvider theme={customTheme}>
        <Container>
          <Paper elevation={5}>
            <Grid
              container
              mt={15}
              padding={5}
              sx={{ xs: { direction: 'column' } }}
            >
              <Grid item xs={12} md={6}>
                <Typography variant="h3" color="secondary">
                  Hi {user.firstname}
                </Typography>
                <Typography mt={2}>
                  <span color="primary"> Member since: </span> {user.createdAt}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid
                    item
                    p={5}
                    style={{
                      borderStyle: 'solid',
                      borderRadius: 8,
                      borderColor: '#FFC074',
                    }}
                  >
                    {user.role === 'guest' ? (
                      <Typography
                        variant="h5"
                        color="primary"
                        textAlign="center"
                      >
                        You've already done travel
                      </Typography>
                    ) : (
                      <Typography
                        variant="h5"
                        color="primary"
                        textAlign="center"
                      >
                        You've already hosted green travellers
                      </Typography>
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
                <Grid item xs={12} md={3}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Avatar
                      alt={user.name}
                      src={`/images/users/${user.picture}`}
                      sx={{ width: 150, height: 150 }}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={7}>
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
                      <Link href={`/profile`} underline="none">
                        <ButtonMui buttonName={'Edit Profile'}></ButtonMui>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {user.role === 'guest' && (
            // GUEST AREA

            <Paper elevation={5}>
              <Grid container mt={5} p={5}>
                <Grid item xs={12}>
                  <Typography variant="h4" mb={5} color="secondary">
                    My Reservations
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Paper variant="outlined">
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

          {/* //LIKE PARTS */}

          {user.role === 'guest' && (
            <Paper elevation={5}>
              <Grid container mt={5} p={5}>
                <Grid item xs={12}>
                  <Typography variant="h4" mb={5} color="secondary">
                    The Places Liked
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Paper variant="outlined">
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
                                buttonName={'See The Cottage'}
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

          {/* HOST AREA */}

          {/* MANAGING COTTAGE */}
          {user.role === 'host' && (
            <Paper elevation={5}>
              <Grid container mt={5} p={5}>
                <Grid item xs={12}>
                  <Typography variant="h4" mb={5} color="secondary">
                    Managing my Green Cottage
                  </Typography>
                </Grid>

                {accomodationByUser &&
                  accomodationByUser.map((e, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper variant="outlined" borderColor="secondary">
                        <Grid container padding={3}>
                          <Grid item xs={12} md={5}>
                            <img src={'/images/accomodations/faro.jpg'} label={accomodationByUser[0].cottageName} width='100%' height='100%'/>
                          </Grid>
                          <Grid item xs={12} md={7} pl={{md: 3}}>
                            <Grid container direction="column">
                              <Grid item> 
                              <Typography variant='h6' color='primary' textTransform='uppercase'>{accomodationByUser[0].cottageName}</Typography>
                              <Typography color='secondary' textTransform='uppercase' fontWeight={500} mb={0.5}> {accomodationByUser[0].city} - {accomodationByUser[0].country}</Typography>
                              <InfoCottage valueLabel={'Price/Night:'} colorLabel={'primary'} value={`${accomodationByUser[0].pricePerNight}€`} colorValue={'black'}></InfoCottage>
                              <InfoCottage valueLabel={'Average Rating:'} colorLabel={'primary'} value={`${accomodationByUser[0].ratings}/5`} colorValue={'black'}></InfoCottage>
                              <InfoCottage display={{xs: 'none', md: 'flex'}} valueLabel={'Nb of Comments:'} colorLabel={'primary'} value={accomodationByUser[0].comments} colorValue={'black'}></InfoCottage>
                              <Typography color='primary' textTransform='uppercase' fontWeight={500}>description:</Typography>
                              <Typography display={{xs: 'flex', md: 'none'}}> {accomodationByUser[0].summary}</Typography>
                              <Typography display={{xs: 'none', md: 'flex'}} textAlign='justify'> {accomodationByUser[0].description}</Typography>
                              </Grid>
                              <Grid item mt={3}>
                                <Link
                                   href={`/cottage/${accomodationByUser[0]._id}`}
                                  underline="none"
                                >
                                  <ButtonMui
                                    buttonName={'See my Cottage'}
                                  />
                                </Link>
                                <Link
                                   href={`/manage-my-cottage/${accomodationByUser[0]._id}`}
                                  underline="none"
                                >
                                  <ButtonMui
                                    buttonName={'Manage my Cottage'}
                                  />
                                </Link>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </Paper>
          )}

          {/* SEE THE BOOKINGS */}

          {user.role === 'host' && (
            <Paper elevation={5}>
              <Grid container mt={5} p={5}>
                <Grid item xs={12}>
                  <Typography variant="h4" mb={5} color="secondary">
                    All the Bookings
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Paper variant="outlined" borderColor="secondary">
                    <Grid container padding={5}>
                      <Grid item xs={5}>
                        <img /* src={} label={} */ />
                      </Grid>
                      <Grid item={7}>
                        <Grid container direction="column">
                          <Grid item>
                            {' '}
                            <Typography variant="h4" color="primary">
                              CottageName {/* {accomodations.cottageName} */}
                            </Typography>{' '}
                          </Grid>
                          <Grid item mt={2}>
                            {' '}
                            Number of upcomming bookings{' '}
                          </Grid>
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
