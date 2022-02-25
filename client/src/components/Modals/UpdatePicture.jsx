import React from 'react'
import {
  Box,
  Grid,
  Avatar,
} from '@mui/material'
import ButtonMui from '../Button/Button'
import { useState } from 'react'
import axios from 'axios'

const UpdatePicture = (props) => {
  const userId = props.userId
  /* const [userPicture, setUserPicture] = useState(props.userPicture) */
  const userPicture = (props.userPicture)
  console.log(userPicture)

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

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    const url = `${process.env.REACT_APP_API_URL}api/v1/users/imageUpload`

    await axios
      .post(url, data, config)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/v1/users/${userId}`)
          .then((res) => console.log(res))
      })
      .catch((err) => console.log(err))
  }

  return (
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
  )
}

export default UpdatePicture
