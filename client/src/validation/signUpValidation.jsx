import * as yup from 'yup'

export const signUpSchema = yup.object().shape ({
    firstname: yup.string().required(),
    name: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    email: yup.string().email.required(),
    password: yup.string().min(6).required(),
    passwordConfirm: yup.string().min(6).required()
})