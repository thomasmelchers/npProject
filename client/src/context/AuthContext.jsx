import React, { createContext, useState} from "react"

export const AuthContext = createContext({
    token:'',
    isLoggedIn: false,
    login: (token)=> {},
    logout:()=> {},
    user: '',
    getUser: (user) => {},

})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')

    const userIsLoggedIn = !!token //return True

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const logoutHandler = () => {
        setToken(null)
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