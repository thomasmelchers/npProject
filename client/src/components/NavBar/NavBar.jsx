import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import CottageIcon from '@mui/icons-material/Cottage'
import customTheme from '../../assets/theme'
import { Link } from '@mui/material'
import ModalUnstyled from '@mui/base/ModalUnstyled'
import { styled } from '@mui/system'
import SignUp from '../SignUp/SignUpForm'

const settings = ['Sign Up', 'Sign In', 'Dashboard', 'Logout']

const NavBar = () => {
  // MENU UNDER THE PICTURE
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // MODAL - OPEN CLOSE FUNCTIONS
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  const style = {
    width: {
      sx: 800,
      md: 500,
      lg: 650,
    },
    bgcolor: 'white',
    borderRadius: 3,
    p: 2,
    px: 4,
    pb: 3,
  }

  return (
    <AppBar
      position="static"
      theme={customTheme}
      color="primary"
      sx={{ mb: 5 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={'/'} underline="none">
            <Typography
              variant="h6"
              noWrap
              component="div"
              theme={customTheme}
              color="secondary"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <CottageIcon
                theme={customTheme}
                fontSize="large"
                color="secondary"
                sx={{ mr: 2 }}
              />
              Eco-Friendly Cottages
            </Typography>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <CottageIcon
              theme={customTheme}
              fontSize="large"
              color="secondary"
            />
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              mr: 3,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Button
              onClick={handleOpen}
              theme={customTheme}
              sx={[
                { my: 2, color: 'white', display: 'block' },
                (customTheme) => ({
                  '&:hover': {
                    color: customTheme.palette.secondary.main,
                  },
                }),
              ]}
            >
              {settings[0]}
            </Button>
            <StyledModal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              BackdropComponent={Backdrop}
            >
              <Box sx={style}>
                <SignUp />
              </Box>
            </StyledModal>

            <Button
              theme={customTheme}
              sx={[
                { my: 2, color: 'white', display: 'block' },
                (customTheme) => ({
                  '&:hover': {
                    color: customTheme.palette.secondary.main,
                  },
                }),
              ]}
            >
              {settings[1]}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    theme={customTheme}
                    color="primary"
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
