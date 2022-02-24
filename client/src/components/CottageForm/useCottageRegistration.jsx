import {useState, useEffect} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const useCottageRegistration = () => {
    const isToken = localStorage.getItem('token')
    
    const userId = {
        id: '',
    }
    
      if (isToken) {
        const decodedToken = jwt_decode(isToken)
        
        userId.id = decodedToken.id
      }


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

    

    const handleSubmit = async (e) => {
        e.preventDefault()

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
            description: values.description
        }

        console.log(cottage)

        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/v1/accomodations`,
            headers: { Authorization: `Bearer ${isToken}` },
            data: cottage,
        })
    }

    return {handleChange, values, handleSubmit}
}

export default useCottageRegistration