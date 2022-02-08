import React, { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

/* const getToken = {
    user_id: '',
  }

  if (localStorage.getItem('token')) {
    const decodedToken = jwt_decode(localStorage.getItem('token'))
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('token')
    } else {
      getToken.user_id = decodedToken.id

    }
  }

  const getUserData = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/users/${getToken.user_id}`
    )
    setUser(data.data.data.user)
  } */

  /* useEffect(() => {
    getUserData()
  }, [])  */
  /* console.log(user) */

  export const AuthContext = createContext({
    token:'',
    isLoggedIn: false,
    login: (token)=> {},
    logout:()=> {},
    user: '',
    getUser: (user) => {},

})

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    
    const [token, setToken] = useState(initialToken)
    const [user, setUser] = useState('')

    const userIsLoggedIn = !!token //return True

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    const userHandler = (user) => {
        setUser(user)
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        user: user,
        getUser: userHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext
