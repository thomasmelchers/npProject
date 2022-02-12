import { Typography, Grid } from '@mui/material'
import React from 'react'


const InfoCottage = ({xs, md, valueLabel, colorLabel, value, colorValue}) => {
  return (
    <Grid container flex item xs={xs} md={md}>
      <Typography
        color={colorLabel}
        mr={1}
        style={{ textTransform: 'uppercase', fontWeight: 500 }}
      >
        {valueLabel}
      </Typography>
      <Typography color={colorValue}>{value}</Typography>
    </Grid>
  )
}

export default InfoCottage
