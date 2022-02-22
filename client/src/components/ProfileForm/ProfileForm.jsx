import {
  Grid,
  Paper,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  Box,
  Typography,
} from '@mui/material'
import React, { useState, useContext } from 'react'
import TextForm from '../FormComponents/TextForm'
import AuthContext from '../../context/AuthContext'
import ButtonMui from '../../components/Button/Button'
import countries from '../../data/countries.json'
import axios from 'axios'
import UpdatePicture from '../Modals/UpdatePicture'

const ProfileForm = (props) => {
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn
  const userId = props.userId
  const userPicture = props.userPicture

  /* STATE */
  const [firstname, setFirstname] = useState(props.firstnameValue)
  const [name, setName] = useState(props.nameValue)
  const [dateOfBirth, setDateOfBirth] = useState(props.DOBValue)
  const [gender, setGender] = useState(props.genderValue)
  const [address, setAddress] = useState(props.addressValue)
  const [number, setNumber] = useState(props.numberValue)
  const [postcode, setPostcode] = useState(props.postcodeValue)
  const [city, setCity] = useState(props.cityValue)
  const [country, setCountry] = useState(props.countryValue)
  const [email, setEmail] = useState(props.emailValue)
  const [phone, setPhone] = useState(props.emailValue)
  const [languagesSpoken, setLanguagesSpoken] = useState('')
  const [languagesSpoken1, setLanguagesSpoken1] = useState('')
  const [languagesSpoken2, setLanguagesSpoken2] = useState('')
  console.log(address)
  /* CHANGING HANDLERS */

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

  const phoneChangeHandler = (event) => {
    setPhone(event.target.value)
  }
  const languagesSpokeChangeHandler = (event) => {
    setLanguagesSpoken(event.target.value)
  }

  const languagesSpokeChangeHandler1 = (event) => {
    setLanguagesSpoken1(event.target.value)
  }

  const languagesSpokeChangeHandler2 = (event) => {
    setLanguagesSpoken2(event.target.value)
  }

  const submitHandler1 = async (event) => {
    event.preventDefault()

    const user = {
      firstname: firstname,
      name: name,
      dateOfBirth: dateOfBirth,
      gender: gender,
    }

    await axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/v1/users/${userId}`,
      data: user,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    const user = {
      address: address,
      number: number,
      postcode: postcode,
      city: city,
      country: country,
      email: email,
      phoneNb: phone,
      languagesSpoken: [languagesSpoken, languagesSpoken1, languagesSpoken2],
    }
    console.log(user)

    await axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/v1/users/${userId}`,
      data: user,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <Box mb={3}>
        <Paper variant="outlined">
          <Grid container justifyContent="center" spacing={2} p={5}>
            <Grid item xs={12}>
              <Typography variant="h4" color="primary">
                Personal Informations
              </Typography>
            </Grid>

            <Grid container>
              <Grid item xs={12} md={6}>
                <UpdatePicture userId={userId} userPicture={userPicture} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box component="form" noValidate onSubmit={submitHandler1}>
                  <Grid container justifyContent="center" spacing={3}>
                    <Grid item xs={12}>
                      <TextForm
                        label={props.firstnameValue}
                        id={'firstname'}
                        name={'firstname'}
                        type={'text'}
                        /* value={firstname} */
                        onChange={firstnameChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12} /* md={6} */>
                      <TextForm
                        label={props.nameValue}
                        id={'name'}
                        name={'name'}
                        type={'text'}
                        /* value={name} */
                        onChange={nameChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12} /* md={6} */>
                      <TextField
                        label={props.DOBValue}
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        /* value={dateOfBirth} */
                        onChange={DOBChangeHandler}
                      />
                    </Grid>
                    <Grid
                      container
                      justifyContent="center"
                      item
                      xs={12} /* md={6} */
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
                    <Grid container justifyContent="center" item xs={12}>
                      <ButtonMui
                        type={'submit'}
                        buttonName={'Save Changes'}
                      ></ButtonMui>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box component="form" noValidate onSubmit={submitHandler} pb={5}>
        <Box mb={3}>
          <Paper variant="outlined">
            <Grid container justifyContent="center" spacing={2} p={5}>
              <Grid item xs={12}>
                <Typography variant="h4" color="primary">
                  {' '}
                  Residency Informations
                </Typography>
              </Grid>
              <Grid item xs={9} md={8}>
                <TextForm
                  label={props.addressValue}
                  id={'address'}
                  name={'address'}
                  type={'text'}
                  /* value={props.addressValue} */
                  onChange={addressChangeHandler}
                />
              </Grid>
              <Grid item xs={3} md={4}>
                <TextForm
                  label={props.numberValue}
                  id={'number'}
                  name={'number'}
                  type={'number'}
                  /* value={number} */
                  onChange={numberChangeHandler}
                />
              </Grid>
              <Grid item xs={5} md={4}>
                <TextForm
                  label={props.postcodeValue}
                  id={'postcode'}
                  name={'postcode'}
                  type={'number'}
                  /* value={postcode} */
                  onChange={postcodeChangeHandler}
                />
              </Grid>
              <Grid item xs={7} md={4}>
                <TextForm
                  label={props.cityValue}
                  id={'city'}
                  name={'city'}
                  type={'text'}
                  /* value={city} */
                  onChange={cityChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextForm
                  label={props.countryValue}
                  id={'country'}
                  name={'country'}
                  type={'text'}
                  /* value={country} */
                  onChange={countryChangeHandler}
                >
                  {Object.keys(countries).map((item, pos) => {
                    return (
                      <MenuItem
                        key={pos}
                        value={item}
                        color='primary'
                      >
                        {countries[item]}
                      </MenuItem>
                    )
                  })}
                </TextForm>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        <Box mb={3}>
          <Paper variant="outlined">
            <Grid container justifyContent="center" spacing={2} p={5}>
              <Grid item xs={12}>
                <Typography variant="h4" color="primary">
                  {' '}
                  Contact Informations
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextForm
                  label={props.emailValue}
                  id={'email'}
                  name={'email'}
                  type={'email'}
                  /* value={email} */
                  onChange={emailChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextForm
                  label={'Phone Number'}
                  id={'phone'}
                  name={'phone'}
                  type={'number'}
                  value={phone}
                  onChange={phoneChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextForm
                  label={'Native Language'}
                  id={'languagesSpoken'}
                  name={'languagesSpoke'}
                  type={'text'}
                  value={languagesSpoken}
                  onChange={languagesSpokeChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextForm
                  label={'Language Nb 2'}
                  id={'languagesSpoken'}
                  name={'languagesSpoke'}
                  type={'text'}
                  value={languagesSpoken1}
                  onChange={languagesSpokeChangeHandler1}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextForm
                  label={'Language Nb 3'}
                  id={'languagesSpoken'}
                  name={'languagesSpoke'}
                  type={'text'}
                  value={languagesSpoken2}
                  onChange={languagesSpokeChangeHandler2}
                />
              </Grid>
              <Grid item xs={12} mt={3}>
                <Grid container justifyContent="space-around">
                  <Grid container justifyContent="center" item xs={5}>
                    <ButtonMui buttonName={'reset Password'}></ButtonMui>
                  </Grid>

                  <Grid container justifyContent="center" item xs={5}>
                    <ButtonMui
                      type={'submit'}
                      buttonName={'Save Changes'}
                    ></ButtonMui>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
      </div>
  )
}

export default ProfileForm
