import { Grid, Typography, Paper, Box, TextareaAutosize, TextField} from '@mui/material'
import React from 'react'
import TextForm from '../FormComponents/TextForm'
import AddressForm from '../FormComponents/AddressForm'
import ButtonMui from '../Button/Button'
import useCottageRegistration from './useCottageRegistration'
import { useState } from 'react'
import { useEffect } from 'react'

const CottageRegistration = () => {

  const {handleChange, values} = useCottageRegistration()

  const [cot, setCot] = useState('')

  const handleChangec = e => {
    setCot(e.target.value)
  }

  return (
    <Grid container direction="column">
      <Box component="form" noValidate>
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
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
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
                      </Grid>

                      <Grid item xs={12}>
                        <TextForm
                          label={'Type of Cottage'}
                          id={'typeOfCottage'}
                          name={'typeOfCottage'}
                          type={'text'}
                          fullwidth
                          required={true}
                          value={values.typeOfCottage}
                          onChange={handleChange}
                        ></TextForm>
                      </Grid>

                      <Grid item xs={12}>
                        <TextForm
                          label={'Price/Night'}
                          id={'pricePerNight'}
                          name={'pricePerNight'}
                          type={'number'}
                          fullwidth
                          required={true}
                          value={values.pricePerNight}
                          onChange={handleChange}
                        ></TextForm>
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
            numberLabel={'Number'}
            numberLabel={values.number}
            postcodeLabel={'Postcode'}
            postcodeValue={values.postcode}
            cityLabel={'Location'}
            cityValue={values.city}
            countryLabel={'Country'}
            countryValue={values.country}
            changeHandler={handleChange}
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
