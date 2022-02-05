import axios from 'axios'

export const getUsers = () => {
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}api/v1/users`,
    /* withCredentials: false, */
  })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err))
}
