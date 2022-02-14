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
import Map from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import ButtonMui from '../components/Button/Button'
import TextForm from '../components/FormComponents/TextForm'
import getComments from '../actions/useEffect'


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

  /* const [accomodation, setAccomodation] = useState({})

  const getAccomodationsData = async () => {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/accomodations/${id}`)
      .then((res) => setAccomodation(res.data.data.accomodation))
  }
  useEffect(() => {
    getAccomodationsData()
  }, []) */

  const url = `${process.env.REACT_APP_API_URL}api/v1/accomodations/${id}`
  const [accomodation, setAccomodation] = useState({})
  const [location, setLocation] = useState('')

  const handleLocation = () => {
    setLocation(accomodation.city)
  }

  useEffect(() => {
    axios.get(url).then((res) => setAccomodation(res.data.data.accomodation))
  }, [url])

  useEffect(() => {
    handleLocation()
  }, [])

  console.log(accomodation)
  /* const location = accomodation && accomodation.city */
  const country = accomodation && accomodation.country
  const [fetchData, setFetchData] = useState({})

  // GEO DATA
  const geoData = async () => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=${country}&types=place&limit=1&access_token=pk.eyJ1Ijoidm95YWdlc2xhbGFudGhhMTk4NyIsImEiOiJja3hkYjB4bGswYzFvMnFuNGZ6OGo3YWNoIn0.n9SsSfkBoyKyY5gmgg3aew`
    )
    const data = await response.json()
    setFetchData(data)
  }

  useEffect(() => {
    geoData()
  }, [])
  // MAPBOX
  const [viewport, setViewport] = useState({
    latitude: 23,
    longitude: -12,
    zoom: 6,
    width: '100%',
    height: '100%',
  })

  const [night, setNight] = useState(0)

  const nightChangeHandler = (event) => {
    setNight(event.target.value)
  }

  //COMMENTS
  const {data} = getComments(`${process.env.REACT_APP_API_URL}api/v1/comments/`)
  console.log(data)

  const total = night * accomodation.pricePerNight

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

            <Grid container px={5} mt={1}>
              <InfoCottage
                xs={6}
                md={4}
                colorLabel={'primary'}
                valueLabel={'type of Cottage:'}
                colorValue={'black'}
                value={accomodation.typeOfCottage}
              />
              <InfoCottage
                xs={6}
                md={4}
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
                value={accomodation.rating}
              />
            </Grid>

            {/* IMAGE SECTION */}
            <Grid container pt={2} height={'75vh'}>
              {/* <Grid xs={12} > */}
              <img
                src={`/images/accomodations/faro.jpg`}
                alt={accomodation.cottageName}
                width="100%"
                height="100%"
              />
              {/* </Grid> */}
            </Grid>

            <Grid container justifyContent="space-around" p={5}>
              <Grid item xs={12} md={7}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    mb={1}
                    color="primary"
                    style={{ textTransform: 'uppercase' }}
                  >
                    Description
                  </Typography>
                  <Typography textAlign="justify" color="black">
                    {accomodation.description}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                p={2}
                borderColor="#FFC074"
                style={{
                  borderStyle: 'solid',
                  borderRadius: 10,
                }}
              >
                <Grid container justifyContent="center" mb={2}>
                  <Typography variant="h6" color="primary" textTransform='uppercase'>
                    Reservation
                  </Typography>
                </Grid>

                <Grid container mb={2}>
                <TextForm
                  label={'Nb of Night(s)'}
                  id={'night'}
                  name={'night'}
                  type={'number'}
                  value={night}
                  min={'0'}
                  onChange={nightChangeHandler}
                />
                </Grid>
                <Grid container mb={2}>
                <InfoCottage
                  xs={12}
                  md={12}
                  colorLabel={'primary'}
                  valueLabel={'Price/Night:'}
                  colorValue={'black'}
                  value={`${accomodation.pricePerNight} €`}
                />
                </Grid>
                {total>0 && (
                <Grid container mb={2}>
                <InfoCottage
                  xs={12}
                  md={12}
                  colorLabel={'primary'}
                  valueLabel={'Total'}
                  colorValue={'black'}
                  value={`${total} €`}
                />
                </Grid>)}
                <Grid container justifyContent="center">
                  <ButtonMui buttonName="Book"></ButtonMui>{' '}
                </Grid>
              </Grid>
            </Grid>

            {/* THE MAP AREA */}
            <Grid item xs={12} height={'40vh'}>
              <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                {...viewport}
                onviewportChange={(newView) => setViewport(newView)}
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
              ></Map>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cottage
