import { Grid,  Box } from '@mui/material'
import React from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import Offer from '../Components/Admin/Offer' 

function Offerpage() {

    return (
        <Grid container>
        <AdminHeader />
        <Grid item sx={{display: 'flex',}}>
            <Box>
                <AdminAside />
            </Box>
            <Box>
                <Offer />
            </Box>
        </Grid>
    </Grid>
    )
}

export default Offerpage