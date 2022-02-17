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

  return <div>THIS IS THE HOST RESERVATION DASHBOARD
    <Sign_Up></Sign_Up>
  </div>;
};

export default HostReservation