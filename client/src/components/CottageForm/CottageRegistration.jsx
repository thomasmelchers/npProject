import {
  Grid,
  Typography,
  Paper,
  Box,
  TextareaAutosize,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Link,
} from '@mui/material'
import React from 'react'
import TextForm from '../FormComponents/TextForm'
import AddressForm from '../FormComponents/AddressForm'
import ButtonMui from '../Button/Button'
import useCottageRegistration from './useCottageRegistration'
import { useState } from 'react'
import { useEffect, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import validate from './ValidationCottageRegistration'

const CottageRegistration = ({formHasBeenSubmit}) => {
  // USER DATAS
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn

  const isToken = localStorage.getItem('token')
  const userId = {
    id: '',
  }

  if (isToken) {
    const decodedToken = jwt_decode(isToken)
    userId.id = decodedToken.id
  }

  const [user, setUser] = useState([])
  const getUserData = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/users/${userId.id}`
    )
    setUser(data.data.data.user)
  }

  useEffect(() => {
    getUserData()
  }, [])

  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    accomodation,
  } = useCottageRegistration(/* formHasBeenSubmit, */ validate)

  return (
    <Grid container direction="column">
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container mt={4}>
          <Paper variant="outlined">
            {/* COTTAGE INFOS */}

            <Grid container spacing={2} p={5}>
              {/* TITLE */}
              <Grid item xs={12}>
                <Typography variant="h4" color="primary">
                  Cottage Informations
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Grid container>
                  {/* PICTURE UPLOAD */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ borderStyle: 'solid', borderColor: 'green' }}
                  ></Grid>

                  {/* INFO ABOUT COTTAGE */}
                  <Grid item xs={12} md={6}>
                    <Grid container justifyContent="center" spacing={3}>
                      <Grid item xs={12}>
                        <TextForm
                          label={'Name of the Cottage'}
                          id={'cottageName'}
                          name={'cottageName'}
                          type={'text'}
                          fullwidth
                          required={true}
                          value={values.cottageName}
                          onChange={handleChange}
                        ></TextForm>
                        {errors.cottageName && (
                          <Typography color="error">
                            {errors.cottageName}
                          </Typography>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id={'Type of Cottage'}>
                            Type of Cottage
                          </InputLabel>
                          <Select
                            labelId={'Type of Cottage'}
                            id={'typeOfCottage'}
                            name={'typeOfCottage'}
                            fullwidth
                            required={true}
                            label={'Type of Cottage'}
                            value={values.typeOfCottage}
                            onChange={handleChange}
                          >
                            <MenuItem value={'cottage'}>Cottage</MenuItem>
                            <MenuItem value={'lodge'}>Lodge</MenuItem>
                            <MenuItem value={'hut'}>Hut</MenuItem>
                            <MenuItem value={'tepee'}>Tepee</MenuItem>
                            <MenuItem value={'yurt'}>Yurt</MenuItem>
                            <MenuItem value={'bed & breakfast'}>
                              Bed & Breakfast
                            </MenuItem>
                            <MenuItem value={'treehouse'}>Treehouse</MenuItem>
                            <MenuItem value={'caravan'}>Caravan</MenuItem>
                          </Select>
                        </FormControl>

                        {errors.typeOfCottage && (
                          <Typography color="error">
                            {errors.typeOfCottage}
                          </Typography>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <TextForm
                          label={'Price/Night'}
                          id={'pricePerNight'}
                          name={'pricePerNight'}
                          type={'number'}
                          fullwidth
                          min={'0'}
                          required={true}
                          value={values.pricePerNight}
                          onChange={handleChange}
                        ></TextForm>
                        {errors.pricePerNight && (
                          <Typography color="error">
                            {errors.pricePerNight}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* ADDRESS INFO */}
        <Box mt={3}>
          <AddressForm
            title={'Location Informations'}
            addressLabel={'Address'}
            addressValue={values.address}
            addressError={errors.address}
            numberLabel={'Number'}
            numberValue={values.number}
            numberError={errors.number}
            postcodeLabel={'Postcode'}
            postcodeValue={values.postcode}
            postcodeError={errors.postcode}
            cityLabel={'Location'}
            cityValue={values.city}
            cityError={errors.city}
            countryLabel={'Country'}
            countryValue={values.country}
            changeHandler={handleChange}
            countryError={errors.country}
          ></AddressForm>
        </Box>

        {/* DESCRIPTION */}
        <Box mt={3}>
          <Paper variant="outlined">
            <Grid container spacing={2} p={5}>
              <Grid item xs={12} style={{ width: '100%' }}>
                <Typography variant="h4" color="primary">
                  Cottage's Descriptions
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextareaAutosize
                  name="summary"
                  id="summary"
                  aria-label="minimum height"
                  minRows={6}
                  placeholder="A Summary of my Green Cottage and its facilities"
                  style={{ width: '100%' }}
                  value={values.summary}
                  onChange={handleChange}
                />
                {errors.summary && (
                  <Typography color="error">{errors.summary}</Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextareaAutosize
                  name="description"
                  id="description"
                  aria-label="minimum height"
                  minRows={8}
                  placeholder="A longer Description of my Green Cottages and all its faciilities"
                  style={{ width: '100%' }}
                  value={values.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <Typography color="error">{errors.description}</Typography>
                )}
              </Grid>

              <Grid item xs={12} mt={4}>
                <Grid container justifyContent="center">
                  <ButtonMui
                    size={'large'}
                    buttonName={'Add my Green Cottage'}
                    type={'submit'}
                  ></ButtonMui>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Grid>
  )
}

export default CottageRegistration
