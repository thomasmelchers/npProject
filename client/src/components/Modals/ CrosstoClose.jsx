import { Typography } from '@mui/material'
import React from 'react'

const arrow = ({onClick}) => {

    const closeStyle = {
      fontWeight: '500',
      fontSize: '2rem',
      cursor: 'pointer',
      transform: 'rotate(45deg)',
      position: 'absolute',
      top: 0,
      right: '14px'
    }
  return (
    <Typography style={closeStyle} color='primary' onClick={onClick}>+</Typography>
  )
}

export default arrow