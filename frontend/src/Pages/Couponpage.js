import { Grid,  Box } from '@mui/material'
import React from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import Coupon from '../Components/Admin/Coupon'

function Couponpage() {
  return (
    <Grid container>
    <AdminHeader />
    <Grid item sx={{display: 'flex',}}>
        <Box>
            <AdminAside />
        </Box>
        <Box>
            <Coupon />
        </Box>
    </Grid>
</Grid>
  )
}

export default Couponpage