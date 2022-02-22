import React from 'react'
import { TextField, MenuItem } from '@mui/material'
import countries from '../../data/countries.json'

const CountryForm = ({countryLabel, countryValue, countryOnChange}) => {
  return (
    <TextField
              label={countryLabel}
              id="country"
              name="country"
              required
              select
              fullWidth
              value={countryValue}
              onChange={countryOnChange}
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
            </TextField>
  )
}

export default CountryForm