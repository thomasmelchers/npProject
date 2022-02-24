import React from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import TextForm from './TextForm'
import CountryForm from './CountryForm'

const AddressForm = ({
  title,
  changeHandler,
  addressLabel,
  addressValue,
  addressError,
  numberLabel,
  numberValue,
  numberError,
  postcodeLabel,
  postcodeValue,
  postcodeError,
  cityLabel,
  cityValue,
  cityError,
  countryLabel,
  countryValue,
  countryError,
}) => {

  return (
    <Paper variant="outlined">
      <Grid container justifyContent="center" spacing={2} p={5}>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={9} md={8}>
          <TextForm
            label={addressLabel}
            id={'address'}
            name={'address'}
            type={'text'}
            required={true}
            value={addressValue}
            onChange={changeHandler}
          />
          {{addressError} && <Typography color='error'>{addressError}</Typography>}
        </Grid>
        <Grid item xs={3} md={4}>
          <TextForm
            label={numberLabel}
            id={'number'}
            name={'number'}
            type={'number'}
            required={true}
            value={numberValue}
            onChange={changeHandler}
          />
          {{numberError} && <Typography color='error'>{numberError}</Typography>}
        </Grid>
        <Grid item xs={5} md={4}>
          <TextForm
            label={postcodeLabel}
            id={'postcode'}
            name={'postcode'}
            type={'number'}
            required={true}
            value={postcodeValue}
            onChange={changeHandler}
          />
          {{postcodeError} && <Typography color='error'>{postcodeError}</Typography>}
        </Grid>
        <Grid item xs={7} md={4}>
          <TextForm
            label={cityLabel}
            id={'city'}
            name={'city'}
            type={'text'}
            required={true}
            value={cityValue}
            onChange={changeHandler}
          />
          {{cityError} && <Typography color='error'>{cityError}</Typography>}
        </Grid>
        <Grid item xs={12} md={4}>
          <CountryForm
            countryLabel={countryLabel}
            countryValue={countryValue}
            countryOnChange={changeHandler}
          />
          {{countryError} && <Typography color='error'>{countryError}</Typography>}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AddressForm
