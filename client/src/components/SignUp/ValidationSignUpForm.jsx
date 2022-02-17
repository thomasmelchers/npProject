export default function validationSignUpForm(values) {
  let errors = {}

  if (!values.role) {
    errors.role = 'Role required'
  }

  if (!values.firstname.trim()) {
    errors.firstname = 'Firstname required'
  }

  if (!values.name.trim()) {
    errors.name = 'Name required'
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Gender required'
  } else {
    function isDate18orMoreYearsOld() {
      let date = new Date(values.dateOfBirth)
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate()
      return new Date(year+18, month-1, day) <= new Date();
    }
    errors.dateOfBirth = 'You should have 18 years old to register'
  }

  if (!values.gender) {
    errors.gender = 'Gender required'
  }

  if (!values.address.trim()) {
    errors.address = 'Address required'
  }

  if (!values.number.trim()) {
    errors.number = 'Number required'
  }

  if (!values.postcode.trim()) {
    errors.postcode = 'Postcode required'
  }

  if (!values.city.trim()) {
    errors.city = 'Location required'
  }

  if (!values.country) {
    errors.country = 'Country required'
  }

  if (!values.email) {
    errors.email = 'Email address required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more'
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Password is required'
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Passwords do not match'
  }
  return errors
}
