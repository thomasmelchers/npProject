import React, { createContext, useState} from "react"

export const AuthContext = createContext({
    token:'',
    isLoggedIn: false,
    login: (token)=> {},
    logout:()=> {}

})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState('')

    const userIsLoggedIn = !!token //return True

    const loginHandler = (token) => {
        setToken(token)
        /* localStorage.setItem('token', token) */
    }

    const logoutHandler = () => {
        setToken(null)
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext