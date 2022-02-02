import React, { useState } from 'react'
import {
  Grid,
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Autocomplete,
  MenuItem,
  unstable_createMuiStrictModeTheme
} from '@mui/material'
import { ThemeProvider } from '@mui/material'
import customTheme from '../../assets/theme'
import ButtonMui from '../Button/Button'
/* import listOfCountries from './Contries' */
import countries from '../../data/countries.json'
/* import { signUpSchema } from '../../validation/signUpValidation' */
import * as yup from 'yup'
import axios from 'axios'

/* const countries = listOfCountries */

const SignUp = () => {
  const [role, setRole] = useState('guest')
  const [firstname, setFirstname] = useState('')
  const [name, setName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('M')
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [postcode, setPostcode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const roleChangeHandler = (event) => {
    setRole(event.target.value)
  }

  const firstnameChangeHandler = (event) => {
    setFirstname(event.target.value)
  }

  const nameChangeHandler = (event) => {
    setName(event.target.value)
  }

  const DOBChangeHandler = (event) => {
    setDateOfBirth(event.target.value)
  }

  const genderChangeHandler = (event) => {
    setGender(event.target.value)
  }

  const addressChangeHandler = (event) => {
    setAddress(event.target.value)
  }

  const numberChangeHandler = (event) => {
    setNumber(event.target.value)
  }

  const postcodeChangeHandler = (event) => {
    setPostcode(event.target.value)
  }

  const cityChangeHandler = (event) => {
    setCity(event.target.value)
  }

  const countryChangeHandler = (event) => {
    setCountry(event.target.value)
  }

  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  const passwordConfirmChangeHandler = (event) => {
    setPasswordConfirm(event.target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    const user = {
      role: role,
      firstname: firstname,
      name: name,
      dateOfBirth: new Date(dateOfBirth),
      gender: gender,
      address: address,
      number: number,
      postcode: postcode,
      city: city,
      country: country,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    }
    console.log(user)

    /* const isValid = await signUpSchema.isValid(user) */

    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/v1/users/register`,
      data: user
    })
    .then((res) => {
      if (res.data.errors) {
        // renvoyé les erreurs du back (à afficher dans une div)
        console.log(res.data.errors)
      } else {
        // rediriger si submit
        console.log('submit')
        window.location = '/'
      }
    })
    .catch((err) => console.log(err))

    setRole('')
    setFirstname('')
    setName('')
    setDateOfBirth('')
    setGender('')
    setAddress('')
    setNumber('')
    setPostcode('')
    setCity('')
    setCountry('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }
  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Box component="form" noValidate onSubmit={submitHandler}>
          <Box
            xs={
              {
                /*               flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center', */
              }
            }
          >
            <Grid container justifyContent="center" spacing={2} mb={2}>
              <Grid item xs={12} align="center">
                <Typography variant="h4" color="secondary" postion="center">
                  Sign Up
                </Typography>
              </Grid>
            </Grid>

            <Grid container justifyContent="center" spacing={2}>
              <Grid container justifyContent="center" item xs={12}>
                <FormControl>
                  <FormLabel id="role" align="center">
                    Are you A:
                  </FormLabel>
                  <RadioGroup
                    row
                    name="role"
                    required
                    value={role}
                    onChange={roleChangeHandler}
                  >
                    <FormControlLabel
                      value="guest"
                      control={<Radio />}
                      label="Guest"
                    />
                    <FormControlLabel
                      value="host"
                      control={<Radio />}
                      label="Host"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <TextField
                  label="Firstname"
                  id="firstname"
                  name="firstname"
                  required
                  fullWidth
                  variant="outlined"
                  value={firstname}
                  onChange={firstnameChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <TextField
                  label="Name"
                  id="name"
                  name="name"
                  required
                  fullWidth
                  variant="outlined"
                  value={name}
                  onChange={nameChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <TextField
                  label="Date of Birth"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  fullWidth
                  variant="outlined"
                  value={dateOfBirth}
                  onChange={DOBChangeHandler}
                />
              </Grid>
              <Grid
                container
                justifyContent="center"
                item
                xs={12}
                sm={12}
                md={5}
              >
                <FormControl>
                  <FormLabel id="gender" align="center">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={gender}
                    onChange={genderChangeHandler}
                  >
                    <FormControlLabel
                      value="F"
                      control={<Radio />}
                      label="F"
                    />
                    <FormControlLabel
                      value="M"
                      control={<Radio />}
                      label="M"
                    />
                    <FormControlLabel
                      value="X"
                      control={<Radio />}
                      label="X"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={10} sm={10} md={8}>
                <TextField
                  label="Address"
                  id="address"
                  name="address"
                  required
                  fullWidth
                  variant="outlined"
                  value={address}
                  onChange={addressChangeHandler}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <TextField
                  label="Nb"
                  id="number"
                  name="number"
                  type="number"
                  required
                  fullWidth
                  variant="outlined"
                  value={number}
                  onChange={numberChangeHandler}
                />
              </Grid>
              <Grid item xs={4} sm={4} md={3}>
                <TextField
                  label="Postcode"
                  id="postcode"
                  name="postcode"
                  type="number"
                  required
                  fullWidth
                  variant="outlined"
                  value={postcode}
                  onChange={postcodeChangeHandler}
                />
              </Grid>
              <Grid item xs={8} sm={8} md={3}>
                <TextField
                  label="Location"
                  id="city"
                  name="city"
                  required
                  fullWidth
                  variant="outlined"
                  value={city}
                  onChange={cityChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  label="Country"
                  id="country"
                  name="country"
                  required
                  select
                  value={country}
                  onChange={countryChangeHandler}
                >
                  {Object.keys(countries).map((item, pos) => {
                    return (
                      <MenuItem key={pos} value={item} color= {customTheme.palette.primary.main}>
                        {countries[item]}
                      </MenuItem>
                    )
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  required
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={emailChangeHandler}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={5}>
                <TextField
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  required
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={passwordChangeHandler}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={5}>
                <TextField
                  label="Password Confirmed"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  required
                  fullWidth
                  variant="outlined"
                  value={passwordConfirm}
                  onChange={passwordConfirmChangeHandler}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <ButtonMui type={'submit'} buttonName="Sign Up"></ButtonMui>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignUp
