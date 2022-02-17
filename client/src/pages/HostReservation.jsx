import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Sign_Up from '../components/SignUp/SignUp';



const HostReservation = () => {

  const [accomodation, setAccomodation] = useState([])

  const getAccomodationsData = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/accomodations/?city=Faro`
    )
    setAccomodation(data.data.data.Accomodations)
  }

  useEffect(() => {
    getAccomodationsData()
  }, [])
  console.log(accomodation)

  const date = new Date(2018, 8, 23)
  if (!(date)) {
    return ('Date of Birth required')
  } else {
    function isDate18orMoreYearsOld() {
      let date = new Date(date)
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate()
      return (!(new Date(year+18, month-1, day) <= new Date()))
    }
    return ('You should have 18 years old to register') 
  }

  return <div>THIS IS THE HOST RESERVATION DASHBOARD
    <Sign_Up></Sign_Up>
  </div>;
};

export default HostReservation