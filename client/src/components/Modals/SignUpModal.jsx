import React, { useState } from 'react'
import SignUp from '../SignUp/SignUp'
import { Box, styled } from '@mui/system'
import ModalUnstyled from '@mui/base/ModalUnstyled'
import Login from '../Login/Login'
import { Typography, Grid } from '@mui/material'
import Cross from './ CrosstoClose'

const SignUpModal = ({ open, onClose }) => {
  const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  const Backdrop = styled('div')`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `

  const styleSignUp = {
    bgcolor: 'white',
    borderRadius: 3,
    position: 'relative',
    p: 2,
    px: 4,
    pb: 3,
    /* height: '85%' ,*/
    width: {
      sx: 800,
      md: 500,
      lg: 650,
    },
  }
  const [isSubmitted, setIsSubmitted] = useState(false)

  const formHasBeenSubmit = () => {
    setIsSubmitted(true)
  }
  console.log(isSubmitted)

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
    >
      <Box
        container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height='80%'
        sx={styleSignUp}
      >
        <Grid
          container
          justifyContent='flex-end'

        >
          <Cross onClick={onClose} />
        </Grid>

        {!isSubmitted ? (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="row"
          >
            <SignUp formHasBeenSubmit={formHasBeenSubmit} />
          </Grid>
        ) : (
          <Grid container justifyContent="center"  alignItems="center">
            <Typography
              color="primary"
              textTransform="uppercase"
              p={3}
              px={6}
              fontWeight={600}
              textAlign="center"
              backgroundColor="rgba(1, 147, 124, 0.2)"
              mb={5}
              style={{
                borderStyle: 'solid',
                borderColor: 'primary',
                borderRadius: 5,
              }}
            >
              Your account has been created ! <br /> Welcome to Green Cottages{' '}
            </Typography>
            <Login marginButton={4} marginTitle={4} marginTextField={1.5} size={'large'} />
          </Grid>
        )}
      </Box>
    </StyledModal>
  )
}

export default SignUpModal
