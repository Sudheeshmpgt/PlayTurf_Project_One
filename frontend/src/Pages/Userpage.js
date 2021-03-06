import { Grid, Box } from '@mui/material'
import React from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import User from '../Components/Admin/User'

function Userpage() {
   
    return (
        <Grid container>
            <AdminHeader />
            <Grid item sx={{ display: 'flex'}}>
                <Box>
                    <AdminAside />
                </Box>
                <Box>
                    <User/>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Userpage