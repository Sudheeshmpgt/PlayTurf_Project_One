import { Grid } from '@mui/material'
import React from 'react'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import TurfviewIndividual from '../Components/User/TurfviewIndividual'

function Turfview() {
  return (
    <Grid>
        <Header/>
        <TurfviewIndividual/>
        <Footer/>
    </Grid>
  )
}

export default Turfview