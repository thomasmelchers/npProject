import React, { useEffect, useState } from 'react'
import SearchCard from '../components/Cards/SearchCard'
import { Container, Grid, ThemeProvider, Typography, Link } from '@mui/material'
import axios from 'axios'
import customTheme from '../assets/theme'
import { useSearchParams } from 'react-router-dom'
import averageRatings from '../actions/averageRatings'

const Accomodations = () => {

  // ACCOMODATION INFO
  const [accomodation, setAccomodation] = useState([])

  const getAccomodationsData = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/accomodations`
    )
    setAccomodation(data.data.data.Accomodations)
  }

  useEffect(() => {
    getAccomodationsData()
  }, [])

  // AVERAGE RATING 
  
  /* for (i=0; i<accomodation.length ; i++){
  const [average[i], setAverage[i]] = useState([])
  let i
  
  const handleAverage = async () => {
    await setAverage[i](averageRatings(accomodation[i].ratings)) 
  }
}
  useEffect(()=> {
    handleAverage()
  }) */
  

  console.log(accomodation)

  return (
    <main>
      <Container>
        <ThemeProvider theme={customTheme}>
          <Grid container mt={15}>
            <Typography variant="h2" fontWeight="700" color="primary">
              Our Green Places
            </Typography>

            {accomodation &&
              accomodation.map((e, index) => (
                <Grid item xs={12} key={index} mt={3}>
                  <Link href={`/Cottage/${e._id}`} underline='none'>
                    <SearchCard
                      cottageName={e.cottageName}
                      city={e.city}
                      price={e.pricePerNight}
                      summary={e.summary}
                      picture={e.picture}
                      /* ratings={average} */
                    ></SearchCard>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </ThemeProvider>
      </Container>
    </main>
  )
}

export default Accomodations
