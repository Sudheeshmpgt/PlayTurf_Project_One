import { Card, CardContent, Grid, Paper, Typography, Fab, CardActions } from '@mui/material'
import axios from '../../axiosinstance'
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../Store/usercontext'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/system'

function MyBooking() {
    const [bookingData, setBookingData] = useState([])
    const { user } = useContext(UserContext)

    const getBookingDetails = () => {
        const id = user._id
        axios.get(`booking_details/${id}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                const value = res.data.turf
                setBookingData(value)
            })
    }

    useEffect(() => {
        getBookingDetails();
    }, [])

    return (
        <Grid container>
            <Paper sx={{ margin: '30px auto', width: 1100 }}>
                <Typography
                    margin={3}
                    fontSize={25}
                    fontWeight={900}
                    color='text.secondary'
                    fontFamily='Atkinson Hyperlegible, sans-serif'
                    textAlign='center'
                >BOOKING HISTORY</Typography>

                <Box sx={{margin:'50px auto'}}>
                    <Card sx={{ display: 'flex', justifyContent:'space-evenly', width:1050, margin:'0 auto', backgroundColor:'secondary.light', fontFamily:'Open Sans,sans-serif',}}>
                        <Box sx={{ fontWeight:600, width:90, margin:2, textAlign:'center'}}>
                            SL.No.
                        </Box>
                        <Box sx={{ fontWeight:600, width:200, margin:2, textAlign:'center'}}>
                            Center Name
                        </Box>
                        <Box sx={{ fontWeight:600, width:130, margin:2, textAlign:'center'}}>
                            Date
                        </Box>
                        <Box sx={{ fontWeight:600, width:130, margin:2, textAlign:'center'}}>
                            Time
                        </Box>
                        <Box sx={{ fontWeight:600, width:140, margin:2, textAlign:'center'}}>
                            Category    
                        </Box>
                        <Box sx={{fontWeight:600, width:100, margin:2, textAlign:'center'}}>
                            Actions    
                        </Box>
                    </Card>
                    {bookingData.map((data, index) => (
                        <Card sx={{ display: 'flex', justifyContent:'space-evenly', width:1050, margin:'5px auto', fontFamily:'Open Sans,sans-serif'}}>
                            <Box sx={{width:70, margin:3, textAlign:'center'}}>
                                {index + 1}
                            </Box>
                            <Box sx={{width:200, margin:3, textAlign:'center'}}>
                                {data.turfDetails[0].centername}
                            </Box>
                            <Box sx={{width:130, margin:3, textAlign:'center'}}>
                                {data.date}
                            </Box>
                            <Box sx={{width:130, margin:3, textAlign:'center'}}>
                                {data.startTime} to {data.endTime}
                            </Box>
                            <Box sx={{width:140, margin:3, textAlign:'center'}}>
                                {data.turfDetails[0].category}
                            </Box>
                            <CardActions sx={{width:50}}>
                                <Fab size='small' color='secondary' >
                                      <RemoveRedEyeIcon sx={{fontSize:27}}/> 
                                </Fab>
                            </CardActions>
                            <CardActions sx={{width:50}}>
                                <Fab size='small'>
                                     <CancelIcon  sx={{fontSize:27}}/>
                                </Fab>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Paper>
        </Grid>
    )
}

export default MyBooking