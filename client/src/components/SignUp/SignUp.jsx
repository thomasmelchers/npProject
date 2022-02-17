import React from 'react'
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
  MenuItem,
} from '@mui/material'
import ButtonMui from '../Button/Button'
import countries from '../../data/countries.json'
import useSignUpForm from './useSignUpForm'
import validate from './ValidationSignUpForm'

const Sign_Up = () => {

    const {handleChange, values, handleSumit, errors, isSubmitting} = useSignUpForm(validate)
  return (
    <Container>
    <Box component="form" noValidate onSubmit={handleSumit}>
      <Box>
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
                value={values.role}
                onChange={handleChange}
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
            {errors.role && <Typography color='error'>{errors.role}</Typography>}
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <TextField
              label="Firstname"
              id="firstname"
              name="firstname"
              required
              fullWidth
              variant="outlined"
              value={values.firstname}
              onChange={handleChange}
            />
            {errors.firstname && <Typography color='error'>{errors.firstname}</Typography>}
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <TextField
              label="Name"
              id="name"
              name="name"
              required
              fullWidth
              variant="outlined"
              value={values.name}
              onChange={handleChange}
            />
             {errors.name && <Typography color='error'>{errors.name}</Typography>}
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
              InputLabelProps={{ shrink: true }}
              value={values.dateOfBirth}
              onChange={handleChange}
            />
             {errors.dateOfBirth && <Typography color='error'>{errors.dateOfBirth}</Typography>}
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
                value={values.gender}
                onChange={handleChange}
              >
                <FormControlLabel value="F" control={<Radio />} label="F" />
                <FormControlLabel value="M" control={<Radio />} label="M" />
                <FormControlLabel value="X" control={<Radio />} label="X" />
              </RadioGroup>
            </FormControl>
            {errors.gender && <Typography color='error'>{errors.gender}</Typography>}
          </Grid>

          <Grid item xs={10} sm={10} md={8}>
            <TextField
              label="Address"
              id="address"
              name="address"
              required
              fullWidth
              variant="outlined"
              value={values.address}
              onChange={handleChange}
            />
             {errors.address && <Typography color='error'>{errors.address}</Typography>}
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
              value={values.number}
              onChange={handleChange}
            />
             {errors.number && <Typography color='error'>{errors.number}</Typography>}
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
              value={values.postcode}
              onChange={handleChange}
            />
             {errors.postcode && <Typography color='error'>{errors.postcode}</Typography>}
          </Grid>
          <Grid item xs={8} sm={8} md={3}>
            <TextField
              label="Location"
              id="city"
              name="city"
              required
              fullWidth
              variant="outlined"
              value={values.city}
              onChange={handleChange}
            />
             {errors.city && <Typography color='error'>{errors.city}</Typography>}
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              label="Country"
              id="country"
              name="country"
              required
              select
              fullWidth
              value={values.country}
              onChange={handleChange}
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
            {errors.country && <Typography color='error'>{errors.country}</Typography>}
          </Grid>
          <Grid item xs={12} sm={12} md={10}>
            <TextField
              label="Email"
              id="email"
              name="email"
              required
              fullWidth
              variant="outlined"
              value={values.email}
              onChange={handleChange}
            />
             {errors.email && <Typography color='error'>{errors.email}</Typography>}
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
              value={values.password}
              onChange={handleChange}
            />
             {errors.password && <Typography color='error'>{errors.password}</Typography>}
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
              value={values.passwordConfirm}
              onChange={handleChange}
            />
             {errors.passwordConfirm && <Typography color='error'>{errors.passwordConfirm}</Typography>}
          </Grid>
          <Grid item xs={12} align="center">
            <ButtonMui type={'submit'} buttonName="Sign Up"></ButtonMui>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  )
}

export default Sign_Up