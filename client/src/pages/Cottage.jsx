import React, { useState, useEffect, useContext } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import {
  Typography,
  Grid,
  Container,
  ThemeProvider,
  Paper,
} from '@mui/material'
import { grid } from '@mui/system'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import customTheme from '../assets/theme'
import SpaIcon from '@mui/icons-material/Spa'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import jwt_decode from 'jwt-decode'
import AuthContext from '../context/AuthContext'

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

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Grid container mt={15}>
          <Grid item xs={12}>
            <Paper elevation={5}>
              {/* CONTAINER AVEC LE TITRE */}

              <Grid container p={5}>
                {/* {(isLoggedIn && user.role === 'guest') && */}
                <Grid container justifyContent="flex-end" item xs={12}>
                  <SpaOutlinedIcon fontSize="large" />
                </Grid>{' '}
                {/* } */}
                <Grid item xs={12}>
                  <Typography variant="h3" color="secondary">
                    {accomodation.cottageName}
                  </Typography>
                </Grid>
                <Grid container></Grid>
                <Grid item xs={6} md={4}>
                  <Typography color="primary">
                    Location: <span color="black">{accomodation.city}</span>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography color="primary">
                    Rating: <span>{accomodation.rating} </span>
                  </Typography>
                </Grid>
              </Grid>

              <Grid container p={5}>
                <Grid xs={12}>
                  <Typography>Here will be the image of the accomodation</Typography>
                </Grid>
              </Grid>

              <Grid container p={5}>
                <Grid item xs={12} md={8}>
                    <Grid item xs={12}>
                      <Typography >Type of accomodation: {accomodation.typeOfCottage}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h6'> Description: </Typography>
                      <Typography>{accomodation.description}</Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={4}>

                </Grid>
              </Grid>

                {/* THE MAP AREA */}
              <Grid item xs={12}>

              </Grid>

              
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Cottage
