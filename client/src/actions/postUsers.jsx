import axios from 'axios'

const user = {
    firstname: "",
    name: "Mel",
    gender: "M",
    dateOfBirth: "1987-08-23",
    address: "avenue Charles-Quint",
    number: 30,
    postcode: 1083,
    city: "Ganshoren",
    country: "Belgium",
    email: "tig1@gmail.com",
    password: "azerty123",
    passwordConfirm: "azerty123",
    role: "host"
}

export const postUsers = () => {
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/api/v1/users/register`,
    data: user
  })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err))
}


