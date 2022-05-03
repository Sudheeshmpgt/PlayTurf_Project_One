import { Grid, Box } from '@mui/material'
import React from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import Booking from '../Components/Admin/Booking'

function Bookingpage() {
    return (
        <Grid container>
            <AdminHeader />
            <Grid item sx={{ display: 'flex' }}>
                <Box>
                    <AdminAside />
                </Box>
                <Box>
                    <Booking />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Bookingpage