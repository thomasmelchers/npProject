import React, { useState } from 'react'
import { Grid, Paper, Container, Typography, Link } from '@mui/material'
import CottageRegistration from '../components/CottageForm/CottageRegistration'
import useCottageRegistration from '../components/CottageForm/useCottageRegistration'
import ButtonMui from '../components/Button/Button'
import validate from '../components/CottageForm/ValidationCottageRegistration'

const AddCottage = () => {
  return (
    <main>
        <Container>
          <Grid container mt={15}>
            <Grid item xs={12}>
              <Paper elevation={5}>
                <Grid container direction="column" p={5}>
                  <Grid item xs={12}>
                    <Typography variant="h2" color="secondary">
                      Register your Green Cottage
                    </Typography>
                  </Grid>
                    <Grid item xs={12}>
                      <CottageRegistration
                      />
                    </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
    </main>
  )
}

export default AddCottage
