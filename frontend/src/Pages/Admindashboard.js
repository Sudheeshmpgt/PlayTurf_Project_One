import { Grid,  Box } from '@mui/material'
import React from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import Dashboard from '../Components/Admin/Dashboard'

function Admindashboard() {
  return (
    <Grid container>
        <AdminHeader />
        <Grid item sx={{display: 'flex',}}>
            <Box>
                <AdminAside />
            </Box>
            <Box>
                <Dashboard />
            </Box>
        </Grid>
    </Grid>
  )
}

export default Admindashboard