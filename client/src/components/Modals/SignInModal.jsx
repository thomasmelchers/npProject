import React from 'react';
import Login from '../Login/Login'
import { Box, styled } from '@mui/system'
import ModalUnstyled from '@mui/base/ModalUnstyled';

const SignInModal = ({open, onClose}) => {

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

  const styleSignIn = {
    bgcolor: 'white',
    borderRadius: 3,
    p: 2,
    px: 4,
    pb: 4,
    pt: 4,
    width: {
      sx: 600,
      lg: 400
    }
  }

  return ( <StyledModal
    aria-labelledby="unstyled-modal-title"
    aria-describedby="unstyled-modal-description"
    open={open}
    onClose={onClose}
    BackdropComponent={Backdrop}
  >
    <Box sx={styleSignIn}>
      <Login />
    </Box>
  </StyledModal>);
};

export default SignInModal;
