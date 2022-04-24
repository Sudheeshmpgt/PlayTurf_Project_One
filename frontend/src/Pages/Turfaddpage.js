import { Grid, Box } from '@mui/material'
import React from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import Turfadd from '../Components/Admin/Turfadd'

function Turfaddpage() {
    return (
        <Grid container>
            <AdminHeader />
            <Grid item sx={{ display: 'flex', width: '100%' }}>
                <Box>
                    <AdminAside />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Turfadd />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Turfaddpage