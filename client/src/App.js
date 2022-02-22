import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import HostReservation from './pages/HostReservation'
import Profile from './pages/Profile'
import Cottage from './pages/Cottage'
import AddCottage from './pages/AddCottage'
import Accomodations from './pages/Accomodations'
import ManageMyCottage from './pages/ManageMyCottage'
import ErrorPage from './pages/ErrorPage'
import AuthContext from './context/AuthContext'

function App() {

  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn

  return (
    <div>
      <NavBar/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cottage/:id" element={<Cottage />} />
          <Route path="/accomodations" element={<Accomodations />} />

          {isLoggedIn && 
            <Route path="/manage-my-cottage/:id" element={<ManageMyCottage />} />
           }
          
          {isLoggedIn && 
            <Route path="/add-my-cottage/" element={<AddCottage />} />
           }

          {isLoggedIn ? (
            <Route path="/dashboard/" element={<Dashboard />} />
          ) : (
            <Route path="/" element={<Home />} />
          )}

          {isLoggedIn ? (
            <Route
              path="/HostReservation/"
              element={<HostReservation />}
            />
          ) : (
            <Route path="/" element={<Home />} />
          )}

          {isLoggedIn ? (
            <Route path="/profile" element={<Profile />} />
          ) : (
            <Route path="/" element={<Home />} />
          )}

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App
