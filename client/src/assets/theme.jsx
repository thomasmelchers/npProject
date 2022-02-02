import * as React from 'react'
import { createTheme } from '@mui/material'
import { red, green, amber } from '@mui/material/colors'

const primaryColor = '#01937C' //green[700]
const secondaryColor = '#FFC074'  //amber[700]
const dangerColor = red[900]
 
const customTheme = createTheme({
    palette:{
        primary: {
            main: primaryColor,
        },
    
        secondary: {
            main: secondaryColor,
        },
        error: {
            main: dangerColor
        }
    }
})

export default customTheme