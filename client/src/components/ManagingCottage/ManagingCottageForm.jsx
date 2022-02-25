import React from 'react'
import { Grid, Paper, Typography, Box, MenuItem, FormControl, InputLabel, Select, TextareaAutosize } from '@mui/material';
import TextForm from '../FormComponents/TextForm';
import AddressForm from '../FormComponents/AddressForm';
import ButtonMui from '../Button/Button';
import useAccomodationById from '../../actions/useAccomodationById'
import useManagingCottage from './useManagingCottage';
import validate from '../CottageForm/ValidationCottageRegistration'

const ManagingCottageForm = ({id}) => {

  const {accomodationById, accomodationValues} = useAccomodationById({id})

  const {values, handleChange, handleSubmit, errors} = useManagingCottage(validate)
  return (
    <Grid container direction="column">
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Box mt={4}>

          <Paper variant="outlined">
            {/* COTTAGE INFOS */}

            <Grid container spacing={2} p={5}>
              {/* TITLE */}
              <Grid item xs={12}>
                <Typography variant="h4" color="primary">
                  {accomodationValues.cottageName} Details
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
                          label={accomodationValues.cottageName}
                          id={'cottageName'}
                          name={'cottageName'}
                          type={'text'}
                          fullwidth
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
                            {accomodationValues.typeOfCottage}
                          </InputLabel>
                          <Select
                            /* labelId={accomodationValues.typeOfCottage} */
                            id={'typeOfCottage'}
                            name={'typeOfCottage'}
                            fullwidth
                            /* label={accomodationValues.typeOfCottage} */
                            /* value={accomodationValues.typeOfCottage} */
                            /* onChange={handleChange} */
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

                        {/* {errors.typeOfCottage && (
                          <Typography color="error">
                            {errors.typeOfCottage}
                          </Typography>
                        )} */}
                      </Grid>

                      <Grid item xs={12}>
                        <TextForm
                          label={accomodationValues.pricePerNight}
                          id={'pricePerNight'}
                          name={'pricePerNight'}
                          type={'number'}
                          fullwidth
                          min={'0'}
                          /* value={values.pricePerNight}
                          onChange={handleChange} */
                        ></TextForm>
                       {/*  {errors.pricePerNight && (
                          <Typography color="error">
                            {errors.pricePerNight}
                          </Typography>
                        )} */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* ADDRESS INFO */}
        <Box mt={3}>
          <AddressForm
            title={'Location Informations'}
            addressLabel={accomodationValues.address}
            /* addressValue={values.address} */
            /* addressError={errors.address} */
            numberLabel={accomodationValues.number}
            /* numberValue={values.number} */
            /* numberError={errors.number} */
            postcodeLabel={accomodationValues.postcode}
            /* postcodeValue={values.postcode} */
            /* postcodeError={errors.postcode} */
            cityLabel={accomodationValues.city}
            /* cityValue={values.city} */
            /* cityError={errors.city} */
            countryLabel={accomodationValues.country}
            /* countryValue={values.country}
            changeHandler={handleChange} */
            /* countryError={errors.country} */
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
                  placeholder={accomodationValues.summary}
                  style={{ width: '100%' }}
                  /* value={values.summary}
                  onChange={handleChange} */
                />
                {/* {errors.summary && (
                  <Typography color="error">{errors.summary}</Typography>
                )} */}
              </Grid>

              <Grid item xs={12}>
                <TextareaAutosize
                  name="description"
                  id="description"
                  aria-label="minimum height"
                  minRows={8}
                  placeholder={accomodationValues.description}
                  style={{ width: '100%' }}
                  /* value={values.description}
                  onChange={handleChange} */
                />
                {/* {errors.description && (
                  <Typography color="error">{errors.description}</Typography>
                )} */}
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

export default ManagingCottageForm