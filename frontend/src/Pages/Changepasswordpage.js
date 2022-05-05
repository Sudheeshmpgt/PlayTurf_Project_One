import { Grid } from '@mui/material'
import React from 'react'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import Passwordchange from '../Components/User/Passwordchange'

function Changepasswordpage() {
  return (
    <Grid>
          <Header/>
          <Passwordchange/>
          <Footer/>
      </Grid>
  ) 
}

export default Changepasswordpage