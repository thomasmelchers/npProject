import { useState, useEffect } from 'react'

const useDateFormat = (date, user) => {
  const [newDate, setNewDate] = useState('')

  const handleDate = () => {
    setNewDate(new Date(date).toDateString())
  }
  useEffect(() => {
    handleDate()
  }, [user])

  /* const d = new Date (newDate) */
  console.log(newDate)

  return { newDate }
}

export default useDateFormat
