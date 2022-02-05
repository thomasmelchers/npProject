import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home'
import HostDashboard from './pages/HostDashboard'
import HostReservation from './pages/HostReservation'
import GuestDashboard from './pages/GuestDashboard'
import UpdateProfile from './pages/UpdateProfile'
import Cottage from './pages/Cottage'
import AddCottage from './pages/AddCottage'
import Research from './pages/Research'
import ErrorPage from './pages/ErrorPage'

function App() {
  /* postUsers()
  getUsers() */
  /* fetch(`${process.env.REACT_APP_API_URL}/api/v1/accomodations`)
    .then((res) => res.json())
    .then((res) => console.log(res)) */

  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cottage/" element={<Cottage />} />
            <Route path="/add-cottage" element={<AddCottage />} />
            <Route
              path="/host-dashboard/:user_id"
              element={<HostDashboard />}
            />
            <Route
              path="/host-reservation/:user_id"
              element={<HostReservation />}
            />
            <Route
              path="/guest-dashboard/:user_id"
              element={<GuestDashboard />}
            />
            <Route
              path="/update-profile/:user_id"
              element={<UpdateProfile />}
            />
            <Route path="/research" element={<Research />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App
