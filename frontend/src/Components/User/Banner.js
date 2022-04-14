import { Grid, Paper } from '@mui/material'
import React from 'react'
import './Banner.css'


function Banner() {
  return (
    <Grid container>
        <Grid item xs={12} md={12}>
            <Paper 
            elevation={10} 
            sx={{width:'96.5%', 
            height:350,
            marginLeft:'auto',
            marginRight:'auto', 
            marginTop:2,}}
            className='banner_img'
            >   
            </Paper>
        </Grid>
    </Grid>
  )
}

export default Banner