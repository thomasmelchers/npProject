import React, { useContext, useState, useEffect } from 'react'
import {
  ThemeProvider,
  Container,
  Paper,
  Grid,
  Typography,
  Avatar,
} from '@mui/material'
import customTheme from '../assets/theme'
import AuthContext from '../context/AuthContext'
import ButtonMui from '../components/Button/Button'
import ProfileForm from '../components/ProfileForm/ProfileForm'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const Profile = () => {
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

    const firstnameValue = user.firstname
    const nameValue = user.name
    const DOBValue = user.dateOfBirth
    const genderValue = user.gender
    const addressValue = user.address
    const numberValue = user.number
    const postcodeValue = user.postcode
    const cityValue = user.city
    const countryValue = user.country
    const emailValue = user.email

  return (
    <main>
      <ThemeProvider theme={customTheme}>
        <Container>
          <Grid container mt={15} mb={5}>
            <Grid item xs={12}>
              <Paper elevation={5}>
                <Grid Container direction="column">
                  <Grid
                    item
                    p={5}
                    /* style={{ borderStyle: 'dashed', borderColor: 'green' }} */
                  >
                    <Typography variant="h2" color="secondary">
                      Profile of {user.firstname}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    px={5}
                    /* style={{ borderStyle: 'dashed', borderColor: 'orange' }} */
                  >
                    <ProfileForm userId={userId.id} userPicture={user.picture} firstnameValue={firstnameValue} nameValue={nameValue} DOBValue={DOBValue} genderValue={genderValue} addressValue={addressValue} numberValue={numberValue} postcodeValue={postcodeValue} cityValue={cityValue} countryValue={countryValue} emailValue={emailValue} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </main>
  )
}

export default Profile
