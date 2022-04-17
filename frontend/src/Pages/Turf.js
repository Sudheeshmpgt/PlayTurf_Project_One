import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Aside from '../Components/User/Aside'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import TurfList from '../Components/User/TurfList'

function Turf() {
    return (
        <Grid container>
            <Header />
            <Box display={'flex'}>
                <Box>
                    <Aside />
                </Box>
                <Box>
                    <TurfList />
                </Box>
            </Box>
            <Footer />
        </Grid>
    )
}

export default Turf