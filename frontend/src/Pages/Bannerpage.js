import { Grid, Box } from '@mui/material'
import React from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import Banner from '../Components/Admin/Banner'

function Bannerpage() {
  return (
    <Grid>
        <AdminHeader/>
        <Grid item sx={{ display: 'flex'}}>
                <Box>
                    <AdminAside />
                </Box>
                <Box>
                    <Banner/>
                </Box>
        </Grid>
    </Grid>
  )
}

export default Bannerpage