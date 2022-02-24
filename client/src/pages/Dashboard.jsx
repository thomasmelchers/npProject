import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Stack,
  Paper,
  Link,
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'
import ButtonMui from '../components/Button/Button'
import jwt_decode from 'jwt-decode'
import { useState, useEffect } from 'react'
import axios from 'axios'
import averageRatings from '../actions/averageRatings'
import InfoCottage from '../components/Typography/InfoCottage'
import useDateFormat from '../actions/useDateFormat'

const Dashboard = () => {

  // USER DATAS
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn

  const isToken = localStorage.getItem('token')
  const userId = {
    id: '',
  }
  

  if (isToken) {
    const decodedToken = jwt_decode(isToken)
    userId.id = decodedToken.id
  }
  
  const [user, setUser] = useState([])
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
  console.log(accomodationByUser)

  const getAccomodation = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/accomodations?user_id=${userId.id}`
    )
    setAccomodationByUser(data.data.data.Accomodations)
  }

  useEffect(() => {
    getAccomodation()
  }, [])

  // DATE

  const [newDate, setNewDate] = useState('')

  const handleDate = () => {
      setNewDate(new Date(user.createdAt).toDateString())
  }
  useEffect(() => {
    handleDate()
  }, [user])

  // AVERAGE RATINGS
  const [average, setAverage] = useState('')

  const handleAverage = async (rate) => {
    await setAverage(averageRatings(rate)) 
  }

  useEffect(()=> {
    handleAverage()
  })

  return (
    <main>
      <Container>
        {/*  ------------------------------------ NAME SECTION  ---------------------------- */}

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
                <span color="primary"> Member since: </span> {newDate}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} mt={{ xs: 5, md: 0 }}>
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
                    <Typography variant="h5" color="primary" textAlign="center">
                      You've already done travel
                    </Typography>
                  ) : (
                    <Typography variant="h5" color="primary" textAlign="center">
                      You've already hosted green travellers
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        {/*  ------------------------------------ NAME SECTION - end ---------------------------- */}

        {/*  ------------------------------------ ABOUT ME SECTION - START ---------------------------- */}
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

        {/*  ------------------------------------ ABOUT ME SECTION - END ---------------------------- */}

        {/*  ------------------------------------ GUEST SECTION - START ---------------------------- */}

        {/*  ---------------------------- GUEST SECTION - RESERVATION - START ---------------------- */}
        {user.role === 'guest' && (
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

        {/*  ---------------------------- GUEST SECTION - RESERVATION - END ---------------------- */}

        {/*  ---------------------------- GUEST SECTION - LIKE - START ---------------------- */}

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

        {/*  -------------------------------- GUEST SECTION  - END ---------------------- */}

        {/*  -------------------------------- HOST SECTION  - START ---------------------- */}
        {/*  ----------------------- HOST SECTION - COTTAGE MANAGING  - START ---------------------- */}
        {user.role === 'host' && (
          <Paper elevation={5}>
            {!accomodationByUser === null ? (
              <Grid container mt={5} p={5}>
                <Grid item xs={12}>
                  <Typography variant="h4" mb={5} color="secondary">
                    Managing my Green Cottage
                  </Typography>
                </Grid>

                {accomodationByUser &&
                  accomodationByUser.map((e, index) => (
                    <Grid item xs={12} key={index} mt={2}>
                      <Paper variant="outlined" borderColor="secondary">
                        <Grid container padding={3}>
                          <Grid item xs={12} md={5}>
                            <img
                              src={'/images/accomodations/faro.jpg'}
                              label={e.cottageName}
                              width="100%"
                              height="100%"
                            />
                          </Grid>
                          <Grid item xs={12} md={7} pl={{ md: 3 }}>
                            <Grid container direction="column">
                              <Grid item>
                                <Typography
                                  variant="h6"
                                  color="primary"
                                  textTransform="uppercase"
                                >
                                  {e.cottageName}
                                </Typography>
                                <Typography
                                  color="secondary"
                                  textTransform="uppercase"
                                  fontWeight={500}
                                  mb={0.5}
                                >
                                  {e.city} -{e.country}
                                </Typography>
                                <InfoCottage
                                  valueLabel={'Price/Night:'}
                                  colorLabel={'primary'}
                                  value={`${e.pricePerNight}€`}
                                  colorValue={'black'}
                                ></InfoCottage>
                                <InfoCottage
                                  valueLabel={'Average Rating:'}
                                  colorLabel={'primary'}
                                  value={`${average}/5`}
                                  colorValue={'black'}
                                ></InfoCottage>
                                <InfoCottage
                                  display={{ xs: 'none', md: 'flex' }}
                                  valueLabel={'Nb of Comments:'}
                                  colorLabel={'primary'}
                                  value={e.comments}
                                  colorValue={'black'}
                                ></InfoCottage>
                                <Typography
                                  color="primary"
                                  textTransform="uppercase"
                                  fontWeight={500}
                                >
                                  description:
                                </Typography>
                                <Typography
                                  display={{ xs: 'flex', md: 'none' }}
                                >
                                  {e.summary}
                                </Typography>
                                <Typography
                                  display={{ xs: 'none', md: 'flex' }}
                                  textAlign="justify"
                                >
                                  {e.description}
                                </Typography>
                              </Grid>

                              {/* BUTTONS SECTION */}
                              <Grid item mt={3}>
                                <Grid
                                  container
                                  justifyContent={{
                                    xs: 'center',
                                    md: 'space-around',
                                  }}
                                  alignItems={{ xs: 'center' }}
                                >
                                  <Grid item>
                                    <Link
                                      href={`/cottage/${e._id}`}
                                      underline="none"
                                    >
                                      <ButtonMui
                                        buttonName={'See my Cottage'}
                                      />
                                    </Link>
                                  </Grid>
                                  <Grid item mt={{ xs: 3, md: 0 }}>
                                    <Link
                                      href={`/manage-my-cottage/${e._id}`}
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
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <Grid container mt={5} p={5}>
                <Grid item xs={12}>
                  <Typography variant="h4" mb={5} color="secondary">
                    Register your Cottage
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Grid container justifyContent="center">
                    <Link href={`/add-my-cottage/`} underline="none">
                      <ButtonMui
                        size={'large'}
                        buttonName={'Add your Cottage'}
                      ></ButtonMui>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Paper>
        )}

        {/*  ----------------------- HOST SECTION - COTTAGE MANAGING - END ---------------------- */}

        {/*  ----------------------- HOST SECTION - BOOKINGS MANAGING  - START ---------------------- */}

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
    </main>
  )
}

export default Dashboard
