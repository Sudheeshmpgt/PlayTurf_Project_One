import { Grid } from '@mui/material'
import React from 'react'
import BookingConfirmation from '../Components/User/BookingConfirmation'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'

function Bookingconfirmationpage() {
  return (
    <Grid>
        <Header/>
        <BookingConfirmation/>
        <Footer/>
    </Grid>
  )
}

export default Bookingconfirmationpage 