import { Grid } from '@mui/material'
import React from 'react'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import MyBooking from '../Components/User/MyBooking'

function Mybookingpage() {
  return (
    <Grid>
          <Header/>
          <MyBooking/>
          <Footer/>
      </Grid>
  )
}

export default Mybookingpage