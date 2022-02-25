import {useState, useEffect} from 'react'
import axios from 'axios'

const useAccomodationById = ({id}) => {

const [accomodationById, setAccomodationById] = useState('')

const getAccomodation = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/accomodations/${id}`
    )
    setAccomodationById(data.data.data.accomodation)
  }

  useEffect(() => {
    getAccomodation()
  }, [])

  const accomodationValues = {
    cottageName: accomodationById.cottageName, 
    typeOfCottage: accomodationById.typeOfCottage,
    pricePerNight: accomodationById.pricePerNight,
    address: accomodationById.address, 
    number: accomodationById.number,
    postcode: accomodationById.postcode,
    city: accomodationById.city,
    country: accomodationById.country,
    summary: accomodationById.summary,
    description: accomodationById.description
  }
return {accomodationById, accomodationValues}
}
export default useAccomodationById