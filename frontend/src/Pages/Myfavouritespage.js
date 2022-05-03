import { Grid } from '@mui/material'
import React from 'react'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import Myfavourites from '../Components/User/Myfavourites'

function Myfavouritespage() {
    
    return (
        <Grid>
            <Header />
            <Myfavourites />
            <Footer />
        </Grid>
    )
}

export default Myfavouritespage