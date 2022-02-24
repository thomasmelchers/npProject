import React, { useState } from 'react'
import { Grid, Paper, Container, Typography, Link } from '@mui/material'
import CottageRegistration from '../components/CottageForm/CottageRegistration'
import useCottageRegistration from '../components/CottageForm/useCottageRegistration'
import ButtonMui from '../components/Button/Button'
import validate from '../components/CottageForm/ValidationCottageRegistration'

const AddCottage = () => {
  /* const {
    accomodation } = useCottageRegistration()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const formHasBeenSubmit = () => {
    setIsSubmitted(true)
  }
  console.log(accomodation) */
  return (
    <main>
        <Container>
          <Grid container mt={15}>
            <Grid item xs={12}>
              <Paper elevation={5}>
                <Grid container direction="column" p={5}>
                  <Grid item xs={12}>
                    <Typography variant="h2" color="secondary">
                      Register your Green Cottage
                    </Typography>
                  </Grid>
                  {/* {!isSubmitted ? ( */}
                    <Grid item xs={12}>
                      <CottageRegistration
                        /* formHasBeenSubmit={formHasBeenSubmit} */
                      />
                    </Grid>
                 {/*  ) : (
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography
                          mb={3}
                          color="primary"
                          style={{
                            borderStyle: 'solid',
                            borderColor: 'primary',
                          }}
                        >
                          {' '}
                          Well Done ! Your cottage has been added to Green
                          Cottage !{' '}
                        </Typography>
                        <Link href={`/cottage/${accomodation._id}`}>
                          <ButtonMui
                            size={'large'}
                            buttonName={"let's discover it"}
                          ></ButtonMui>
                        </Link>
                      </Grid>
                    </Grid>
                  )} */}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
    </main>
  )
}

export default AddCottage
