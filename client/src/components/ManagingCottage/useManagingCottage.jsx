import {useState, useEffect} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useParams } from 'react-router-dom'

const useManagingCottage = (validate) => {

    const {id} = useParams()
    const isToken = localStorage.getItem('token')
    
    const userId = {
        id: '',
    }
    
      if (isToken) {
        const decodedToken = jwt_decode(isToken)
        
        userId.id = decodedToken.id
      }
    // To catch the error
    const [errors, setErrors] = useState ({})

    // To set the status of the request
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Set the input values
    const [values, setValues] = useState({
        cottageName: '', 
        typeOfCottage: '',
        pricePerNight: '',
        address: '', 
        number: '',
        postcode: '',
        city: '',
        country: '',
        summary: '',
        description: ''
    })

    const handleChange = e => {
        setValues({
            ...values,
            // targeting the value for each name field in every form inputs
            [e.target.name]: e.target.value
        })
    }

      // Send the data to the DB
      const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors(validate(values))

        const cottage = {
          user_id: userId.id,
          cottageName: values.cottageName,
          typeOfCottage: values.typeOfCottage,
          pricePerNight: values.pricePerNight,
          address: values.address,
          number: values.number,
          postcode: values.postcode,
          city: values.city,
          country: values.country,
          summary: values.summary,
          description: values.description,
        }

        console.log(cottage)

        const data = await axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/v1/accomodations/${id}`,
            headers: { Authorization: `Bearer ${isToken}` },
            data: cottage,
        })

        setIsSubmitting(true)
    }

    return {values, handleChange, handleSubmit, errors}
}

export default useManagingCottage