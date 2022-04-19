import { Grid, useTheme, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Aside from '../Components/User/Aside'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import TurfList from '../Components/User/TurfList'

function Turf() {
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <Grid container>
            <Header />
            <Box display={'flex'}>
                {
                    isMatch ? '':
                    <Box>
                    <Aside />
                </Box>
                }
                <Box>
                    <TurfList />
                </Box>
            </Box>
            <Footer />
        </Grid>
    )
}

export default Turf