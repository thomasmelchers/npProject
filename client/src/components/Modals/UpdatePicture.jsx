import React from 'react'
import { styled } from '@mui/system'
import ModalUnstyled from '@mui/base/ModalUnstyled'
import { Modal, Box, Typography, Grid, ThemeProvider, Avatar } from '@mui/material'
import customTheme from '../../assets/theme'
import ButtonMui from '../Button/Button'
import { useState } from 'react'
import axios from 'axios'

const UpdatePicture = (props) => {
  
  const userId = props.userId
  const userPicture = props.userPicture

  const [file, setFile] = useState('')
  console.log(file)

  const OnInputChange = (event) => {
    setFile(event.target.files[0])
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    const data = new FormData()
    data.append('name', userId)
    data.append('userId', userId)
    data.append('file', file)

    console.log(data)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    const url = `${process.env.REACT_APP_API_URL}api/v1/users/imageUpload`

    await axios
      .post(url, data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    /* await userPicture = file */
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: '100%' }}
      >
        <Grid item>
          <Avatar
            alt="userPicture"
            src={`/images/users/${userPicture}`}
            sx={{ width: 200, height: 200 }}
          />
        </Grid>

        <Grid item xs={12}>
        <Box component="form" noValidate onSubmit={submitHandler}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <input
                type="file"
                name="file"
                id="file"
                onChange={OnInputChange}
              />
            </Grid>
            <Grid item xs={12} mt={3}>
              <ButtonMui
                type={'submit'}
                buttonName={'Upload Picture'}
              ></ButtonMui>
            </Grid>
          </Grid>
        </Box>
        </Grid>

      </Grid>
    </ThemeProvider>
  )
}

export default UpdatePicture
