import React, { useState, useEffect, useContext } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import { Typography, Grid, Container, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import AuthContext from '../context/AuthContext'
import InfoCottage from '../components/Typography/InfoCottage'
import Map from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import ButtonMui from '../components/Button/Button'
import TextForm from '../components/FormComponents/TextForm'
import getComments from '../actions/useEffect'
import averageRatings from '../actions/averageRatings'
import useGeoData from '../components/Card/useGeoData'

// ICONS
import SpaIcon from '@mui/icons-material/Spa'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import StarIcon from '@mui/icons-material/Star';


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

  const [accomodation, setAccomodation] = useState('')
  const [location, setLocation] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')

  const getAcc = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/accomodations/${id}`
    )
    setAccomodation(data.data.data.accomodation)
  }

  useEffect(() => {
    getAcc()
    return accomodation
  }, [])

  useEffect(() =>{
    setLocation(accomodation.city)
    setCountry(accomodation.country)
    return [location, country]
  }, [accomodation])

  console.log(location)

    const geoData = async () => {
      const data = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=${country}&type=place&limit=1&access_token=pk.eyJ1Ijoidm95YWdlc2xhbGFudGhhMTk4NyIsImEiOiJja3hkYjB4bGswYzFvMnFuNGZ6OGo3YWNoIn0.n9SsSfkBoyKyY5gmgg3aew`
        )
        .then((res) => {setLat(res.data.features[0].center[0]) 
          setLon(res.data.features[0].center[1])})
      }
    
      useEffect(() => {
        geoData()
      }, [location, country])
  
 // MAPBOX
 const [viewport, setViewport] = useState({
  /* latitude: lon & lon,
  longitude: lat & lat,
  zoom: 6,
  width: '100%',
  height: '100%', */
})
console.log(viewport.latitude)

const handleViewport = async () => {
  await setViewport({latitude: lat, longitude: lon, zoom: 6, width: '100%', height: '100%'})
}

useEffect(() =>{
  handleViewport()
}, [lat, lon])
console.log(viewport)
  

  // AVERAGE RATINGS
  const [average, setAverage] = useState('')

  const handleAverage = async () => {
    await setAverage(averageRatings(accomodation.ratings)) 
  }

  useEffect(()=> {
    handleAverage()
  })

  // PRICE PER NIGHT
  const [night, setNight] = useState(0)

  const nightChangeHandler = (event) => {
    setNight(event.target.value)
  }
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
                valueLabel={'Rating Average:'}
                colorValue={'black'}
                value={`${average}/5`}
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

              {/* // PRICE */}

              <Grid
                item
                xs={12}
                md={4}
                p={2}
                mt={{xs:4}}
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
