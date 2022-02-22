import { Grid, Typography, Paper, Box, TextareaAutosize } from '@mui/material'
import React from 'react'
import TextForm from '../FormComponents/TextForm'
import AddressForm from '../FormComponents/AddressForm'
import DescriptionForm from './DescriptionForm'

const CottageRegistration = () => {
  return (
    <Grid container direction="column" /* style={{ borderStyle: 'dotted' }} */>
      <Grid container mt={4}>
        <Paper variant="outlined">
          {/* COTTAGE INFOS */}

          <Grid
            container
            spacing={2}
            p={5}
            
          >
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
                  /* style={{ borderStyle: 'solid', borderColor: 'red' }} */
                >
                  <Box
                    component="form"
                    noValidate /* onSubmit={submitHandler1} */
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
                        ></TextForm>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* ADDRESS INFO */}
      {/* <Grid container mt={3} style={{ borderStyle: 'dotted' }}>
        <AddressForm 
          title={'Location Informations'}
          addressLabel={'Address'}
          numberLabel={'Number'}
          postcodeLabel={'Postcode'}
          cityLabel={'Location'}
          countryLabel={'Country'}
        ></AddressForm>
      </Grid> */}

      {/* DESCRIPTION */}
      <Grid container mt={3} style={{ borderStyle: 'dotted' }}>
        <Paper variant='outlined'>
          <Grid container direction='column' p={5}>
            <Grid item xs={12}>
              <Typography>mhgmsehgùlshehmg</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextForm></TextForm>
            </Grid>
          </Grid>
          <Grid container>
          <Grid item xs={12}>
              <Typography>2</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default CottageRegistration
