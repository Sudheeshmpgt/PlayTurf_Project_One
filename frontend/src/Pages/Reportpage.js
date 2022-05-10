import { Grid, Box } from '@mui/material'
import React from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import SalesReport from '../Components/Admin/SalesReport'

function Reportpage() {
    return (
        <Grid container>
            <AdminHeader />
            <Grid item sx={{ display: 'flex', }}>
                <Box>
                    <AdminAside />
                </Box>
                <Box>
                    <SalesReport />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Reportpage