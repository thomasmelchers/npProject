import React from 'react'
import { Container, Paper, Grid, Typography } from '@mui/material'
import ManagingCottageForm from '../components/ManagingCottage/ManagingCottageForm'
import { useParams } from 'react-router-dom'

const AddCottage = () => {
  const { id } = useParams()

  return (
    <Container>
      <Grid container mt={15}>
        <Grid item xs={12}>
          <Paper elevation={5}>
            <Grid container direction="column" p={5}>
              <Grid item xs={12}>
                <Typography variant="h2" color="secondary">
                  Managing your Green Cottage
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ManagingCottageForm id={id}></ManagingCottageForm>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddCottage
