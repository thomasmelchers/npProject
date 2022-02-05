import React, { useEffect, useState } from 'react'
import SearchCard from '../components/Cards/SearchCard'
import { Container, Grid, ThemeProvider, Typography } from '@mui/material'
import axios from 'axios'
import customTheme from '../assets/theme'


const Research = () => {
  const location = '<The Location>'
  const [accomodation, setAccomodation] = useState([])

  const getAccomodationsData = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/accomodations`
    )
    setAccomodation(data.data.data.Accomodations)
  }

  useEffect(() => {
    getAccomodationsData()
  }, [])

  return (
    <main>
      <Container>
      <ThemeProvider theme={customTheme}>
        <Grid container mt={15}>
        <Typography variant='h2' fontWeight='700' color='primary'>Our Green Places in {location} </Typography>
          {accomodation &&
            accomodation.map((e, index) => (
              <Grid item xs={12} key={index} mt={3}>
                <SearchCard
                  cottageName={e.cottageName}
                  city={e.city}
                  price={e.price}
                  summary={e.summary}
                  picture={e.picture}
                  ratings={e.ratings}
                  key={index}
                ></SearchCard>
              </Grid>
            ))}
        </Grid>
        </ThemeProvider>
      </Container>
    </main>
  )
}

export default Research
