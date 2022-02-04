import React, { useState, useEffect } from 'react'
import { Container, Box, Grid } from '@mui/material'
import Banner from '../components/Banner/Banner'
import Jumbo from '../components/Jumbo/Jumbo'
import HomeCard from '../components/Cards/HomeCard'
import axios from 'axios'

const Home = () => {

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
  console.log(accomodation)

  /* return <div>{JSON.stringify(accomodation)}</div> */

  /* const cottageName = accomodation[0].cottageName
  const summary = accomodation[0].summary */

  return (
    <main>
      <Banner></Banner>
      <Jumbo></Jumbo>
      {/* <Container
      maxWidth = 'lg'
      style= {{ borderStyle: 'dashed', borderColor: 'red'}}>

        <Box display='flex' justifyContent='space-around' style={{ borderStyle: 'dotted', borderColor: 'orange'}}>
          Box container
          
               
        </Box>
    
              
      </Container> */}

      <Grid
        container
        height="70vh"
        /* style={{ borderStyle: 'dashed', borderColor: 'red' }} */
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        { accomodation && accomodation.map((e, index)  =>(
        <Grid
          item
          /* style={{ borderStyle: 'solid', borderColor: 'black' }} */
          xs={8}
          md={3}
          key={index}
        >
          <HomeCard cottageName={e.cottageName} city={e.city} summary={e.summary} picture={e.picture} ratings={e.ratings} key={index}></HomeCard>
        </Grid>))}
      </Grid>
    </main>
  )
}

export default Home
