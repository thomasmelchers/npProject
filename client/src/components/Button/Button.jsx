import * as React from 'react'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import { ThemeProvider } from '@mui/material'
import customTheme from '../../assets/theme'

const useStyles = makeStyles({
  root: {
    color: 'secondary',
    '&:hover': customTheme.palette.primary.main,
    height: 48,
    padding: '0 50px',
  },
})

export default function ButtonMui(props) {
  const classes = useStyles()
  return (
    <Button
      className={classes.root}
      onClick={props.onClick}
      size={props.size}
      type={props.type}
      color={props.color}
      variant="contained"
    >
      {props.buttonName}
    </Button>
  )
}
