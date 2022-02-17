import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
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
import SignUpModal from '../Modals/SignUpModal'
import SignInModal from '../Modals/SignInModal'
import getUser_Logout from '../../actions/getUser_Logout'
import AuthContext from '../../context/AuthContext'
import useSignUpForm from '../SignUp/useSignUpForm'

const NavBar = (props) => {
  
  // MENU UNDER THE PICTURE
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn

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

  const [open1, setOpen1] = React.useState(false)
  const handleOpen1 = () => setOpen1(true)
  const handleClose1 = () => setOpen1(false)

  return (
    <AppBar position="fixed" theme={customTheme} color="primary">

      {/* -------------- TITLE --------------- */}
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
              Green Cottages
            </Typography>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link href={'/'} underline="none">
              <CottageIcon
                theme={customTheme}
                fontSize="large"
                color="secondary"
              />
            </Link>
          </Typography>

          {/* EMPTY BOX */}

          <Box flexGrow={1}></Box>

          {/* ----------------- BUTTONS SIGN IN SIGN UP ----------------- */}

          {!isLoggedIn && (
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignSelf: 'flex-end',
                mr: 3,
              }}
            >
              <Button
                onClick={handleOpen}
                theme={customTheme}
                sx={[
                  { my: 2, color: 'white', display: 'block' },
                ]}
              >
                Sign Up
              </Button>
              <SignUpModal open={open} onClose={handleClose} />

              <Button
                onClick={handleOpen1}
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
                Sign In
              </Button>
              <SignInModal open={open1} onClose={handleClose1} />
            </Box>
          )}

          {/* ---------------------- MENU ON THE RIGHT------------------- */}

          <Box>
            <Tooltip title="Open settings" >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* {!isLoggedIn ? ( */}
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                {/* ):
                ( null
                )} */}
              </IconButton>
            </Tooltip>

            {/* MENU */}

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
              
              {/* MENU ITEMS */}

              {!isLoggedIn && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={handleOpen1}
                    textAlign="center"
                    theme={customTheme}
                    color="primary"
                  >
                    Sign In
                  </Typography>
                  <SignInModal open={open1} onClose={handleClose1} />
                </MenuItem>
              )}
              {!isLoggedIn && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={handleOpen}
                    textAlign="center"
                    theme={customTheme}
                    color="primary"
                  >
                    Sign Up
                  </Typography>
                  <SignUpModal open={open} onClose={handleClose} />
                </MenuItem>
              )}
              {isLoggedIn && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={getUser_Logout}
                    textAlign="center"
                    theme={customTheme}
                    color="primary"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              )}
              {isLoggedIn && (
                <MenuItem /* key={setting} */ onClick={handleCloseUserMenu}>
                  <Link href={`/dashboard/`} underline="none">
                    <Typography
                      textAlign="center"
                      theme={customTheme}
                      color="primary"
                    >
                      Dashboard
                    </Typography>
                  </Link>
                </MenuItem>
              )}

            </Menu>
          </Box>
        </Toolbar>


      </Container>
    </AppBar>
  )
}

export default NavBar
