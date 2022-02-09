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
import Research from './pages/Research'
import ErrorPage from './pages/ErrorPage'
import AuthContext from './context/AuthContext'

function App() {

  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn

  /* const isToken = localStorage.getItem('token')
  const userId = {
    id: '',
  }
  const [user, setUser] = useState([])

  if (isToken) {
    const decodedToken = jwt_decode(isToken)
    userId.id = decodedToken.id
  }

  const getUserData = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/users/${userId.id}`
    )
    setUser(data.data.data.user)
  }

  useEffect(() => {
    getUserData()
  }, []) */

  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cottage/" element={<Cottage />} />
          <Route path="/research" element={<Research />} />

          {isLoggedIn ? (
            <Route path="/add-cottage" element={<AddCottage />} />
          ) : (
            <Route path="/" element={<Home />} />
          )}

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
