import { useState, useEffect } from 'react'
import axios from 'axios'

const useSignUpForm = (callback, validate) => {
  const [values, setValues] = useState({
    role: '',
    firstname: '',
    name: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    number: '',
    postcode: '',
    city: '',
    country: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const [errors, setErrors] = useState ({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = e => {
      setValues({
          ...values,
          // targeting the value for each name field in every form inputs
          [e.target.name]: e.target.value
      })
  }

  const handleSumit = async (e) => {
      e.preventDefault()

      setErrors(validate(values))
      setIsSubmitting(true)

      const user = {
        role: values.role,
        firstname: values.firstname,
        name: values.name,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        address: values.address,
        number: values.number,
        postcode: values.postcode,
        city: values.city,
        country: values.country,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      }

      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/v1/users/register`,
        data: user,
      })

      /* window.location = '/' */
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  console.log (isSubmitting)
  return {handleChange, values, handleSumit, errors, isSubmitting}
}

export default useSignUpForm
