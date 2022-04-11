import { Grid} from '@mui/material'
import React from 'react'
import Cards from './Cards'
import Footer from './Footer'
import Header from './Header'

function Home() {
  return (
    <Grid container>
        <Header/>
        <Cards/>
        <Footer/>
    </Grid>
  )
}

export default Home