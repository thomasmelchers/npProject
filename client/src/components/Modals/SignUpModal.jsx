import React from 'react'
import SignUp from '../SignUp/SignUpForm'
import { Box, styled } from '@mui/system'
import ModalUnstyled from '@mui/base/ModalUnstyled';

const SignUpModal = (props) => {

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
    p: 2,
    px: 4,
    pb: 3,
    width: {
      sx: 800,
      md: 500,
      lg: 650,
    }
  }

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={props.open}
      onClose={props.onClose}
      BackdropComponent={Backdrop}
    >
      <Box sx={styleSignUp}>
        <SignUp />
      </Box>
    </StyledModal>
  )
}

export default SignUpModal
