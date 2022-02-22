import React from 'react'
import { Paper, Grid, Typography, TextareaAutosize } from '@mui/material'
import TextForm from '../FormComponents/TextForm'

const DescriptionForm = () => {
  return (
    
      <Paper variant="outlined">
       <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary">
              Description
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {/* <TextareaAutosize
  aria-label="minimum height"
  minRows={6}
  placeholder="Minimum 3 rows"
  style={{ width: '100%' }}
/> */}

            <TextForm></TextForm>
          </Grid>
</Grid>
      </Paper>
    
  )
}

export default DescriptionForm
