import { Grid, Box } from '@mui/material'
import React from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import Category from '../Components/Admin/Category'

function Categorypage() {
  return (
    <Grid>
        <AdminHeader/>
        <Grid item sx={{ display: 'flex'}}>
                <Box>
                    <AdminAside />
                </Box>
                <Box>
                    <Category/>
                </Box>
        </Grid>
    </Grid>
  )
}

export default Categorypage