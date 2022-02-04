import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Box, Grid, Container, Typography} from '@mui/material'
import ButtonMui from '../Button/Button'
import { ThemeProvider } from '@mui/material'
import customTheme from '../../assets/theme'
import axios from 'axios'
import { AuthContext} from '../../context/AuthContext'

export default function FormSignUp() {
const authContext = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    
    const userLogin = {
      email:email,
      password:password
    }
    console.log(userLogin)

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/v1/users/login`,
      data: userLogin
      /* withCredentials: false, */
    })
    .then((res)=> {
      console.log(res.data.token)
    console.log(res.data)
      authContext.login(res.data.token)
     console.log(authContext) })
      /* .then((res) =>  (console.log(res.data.token) + localStorage.setItem('token', res.data.token) + (window.location = '/'))) */
      .catch((err) => console.error(err))

      
  } 

    
  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Box component="form" noValidate onSubmit={submitHandler}>
          <Grid
            container
            spacing={2}
            mt={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography textAlign={'center'} variant="h4" color="secondary" mb={2}>
              Sign In
            </Typography>
            <Grid item xs={12} md={7}>
              <TextField
                label="Email"
                id="email"
                name="email"
                type="email"
                required
                fullWidth
                variant="outlined"
                value={email}
                onChange={emailChangeHandler}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField
                label="Password"
                id="password"
                name="password"
                type="password"
                required
                fullWidth
                variant="outlined"
                value={password}
                onChange={passwordChangeHandler}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <ButtonMui type={'submit'} /* onClick={(event)=>submitHandler(event)} */  buttonName="Sign In"></ButtonMui>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}