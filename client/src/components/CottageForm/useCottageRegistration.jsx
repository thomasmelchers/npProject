import {useState, useEffect} from 'react'
import axios from 'axios'

const useCottageRegistration = () => {
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

    const cottage = {
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

    return {handleChange, values}
}

export default useCottageRegistration