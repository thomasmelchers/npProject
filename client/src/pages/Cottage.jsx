import React, { useState, useEffect, useContext } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import { Typography, Grid, Container, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SpaIcon from '@mui/icons-material/Spa'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import jwt_decode from 'jwt-decode'
import AuthContext from '../context/AuthContext'
import InfoCottage from '../components/Typography/InfoCottage'

const Cottage = () => {
  // ABOUT USER

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

  // ABOUT COTTAGE
  const { id } = useParams()

  const [accomodation, setAccomodation] = useState([])

  const getAccomodationsData = async () => {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/accomodations/${id}`)
      .then((res) => setAccomodation(res.data.data.accomodation))
  }
  useEffect(() => {
    getAccomodationsData()
  }, [])

  console.log(accomodation)

  // MAPBOX

https://api.mapbox.com/geocoding/v5/mapbox.places/paris.json?access_token=pk.eyJ1Ijoidm95YWdlc2xhbGFudGhhMTk4NyIsImEiOiJja3hkYjB4bGswYzFvMnFuNGZ6OGo3YWNoIn0.n9SsSfkBoyKyY5gmgg3aew

  return (
    <Container>
      <Grid container mt={15}>
        <Grid item xs={12}>
          <Paper elevation={5}>
            {/* TITLE CONTAINER  */}

            <Grid container px={5} pt={5}>
              {/* {(isLoggedIn && user.role === 'guest') && */}
              <Grid container justifyContent="flex-end" item xs={12}>
                <SpaOutlinedIcon fontSize="large" />
              </Grid>
              {/* } */}
              <Grid item xs={12}>
                <Typography variant="h3" color="secondary">
                  {accomodation.cottageName}
                </Typography>
              </Grid>
            </Grid>

            {/* INFO ABOUT THE COTTAGE - LOCATION, TYPE OF COTTAGE, RATINGS */}

            <Grid container px={5}>
              <InfoCottage
                xs={6} md={4}
                colorLabel={'primary'}
                valueLabel={'type of Cottage:'}
                colorValue={'black'}
                value={accomodation.typeOfCottage}
              />
              <InfoCottage
                xs={6} md={4}
                colorLabel={'primary'}
                valueLabel={'location:'}
                colorValue={'black'}
                value={accomodation.city}
              />
              <InfoCottage
                xs={12}
                colorLabel={'primary'}
                valueLabel={'Ratting:'}
                colorValue={'black'}
                value={accomodation.ratting}
              />
            </Grid>

            {/* IMAGE SECTION */}
            <Grid container p={5}>
              <Grid xs={12}>
                <Typography>
                  Here will be the image of the accomodation
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={5}>
              <Grid item xs={12} md={8}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    mb={1}
                    color="primary"
                    style={{ textTransform: 'uppercase' }}
                  >
                    Description:
                  </Typography>
                  <Typography textAlign="justify" color="black">
                    {accomodation.description}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}></Grid>
            </Grid>

            {/* THE MAP AREA */}
            <Grid item xs={12}></Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cottage
