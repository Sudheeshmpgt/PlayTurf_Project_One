import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import './Offerbanner.css'

function Offerbanner() {
    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <Paper
                    elevation={3}
                    sx={{
                        width: '96.5%',
                        height: 100,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 2,
                        borderRadius: '2px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    className='offer_banner'>
                    <Box 
                    border={1.5}
                    width='100%'
                    padding={0}
                    display='flex'
                    justifyContent='center'>
                        <Typography
                            textAlign='center'
                            fontFamily='Atkinson Hyperlegible, sans-serif'
                            fontSize={22}
                            p={4}>
                            50% Offer on First Booking
                        </Typography>
                        <Box>
                            <img alt='' src='https://cdn.pixabay.com/photo/2017/05/26/05/38/discount-2345221_960_720.png' style={{ height: '45px', margin: 25 }}></img>
                        </Box>
                    </Box>

                </Paper>
            </Grid>
        </Grid>
    )
}

export default Offerbanner