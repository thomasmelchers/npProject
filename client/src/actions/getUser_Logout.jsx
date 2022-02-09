import axios from 'axios'

const getUser_Logout = () => {
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}api/v1/users/logout`,
    /* withCredentials: false, */
  })
    .then((res) => {localStorage.removeItem('token')
  console.log('logout')})
    .catch((err) => console.error(err))
    window.location = '/'
}

export default getUser_Logout