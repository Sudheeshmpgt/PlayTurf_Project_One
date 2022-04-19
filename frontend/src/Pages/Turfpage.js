import { Grid,  Box } from '@mui/material'
import React from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import Turf from '../Components/Admin/Turf'

function Turfpage() {

    return (
        <Grid container>
            <AdminHeader />
            <Grid item sx={{display: 'flex',}}>
                <Box>
                    <AdminAside />
                </Box>
                <Box>
                    <Turf />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Turfpage
