import { Card, CardActions, CardContent, Grid, Typography, Button, Box } from '@mui/material'
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TurfList.css'
import { TurfViewContext } from '../../Store/turfviewcontext';
import { UserContext } from '../../Store/usercontext';
import {BookingContext} from '../../Store/bookingcontext'
import axios from '../../axiosinstance'
import moment from 'moment'
import Swal from 'sweetalert2';

function BookingConfirmation() {

    const navigate = useNavigate()
    const { turfView } = useContext(TurfViewContext)
    const { user } = useContext(UserContext)
    const {booking} = useContext(BookingContext)

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        width: '400px',
        showConfirmButton: false,
        timer: 5000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    // const date = moment(booking.date).format('DD-MM-YYYY HH:MM:SS').split(' ');
    // const startTime = moment(booking.startTime).format('DD-MM-YY hh:mm A').split(' ');
    // const endTime = moment(booking.endTime).format('DD-MM-YY hh:mm A').split(' ');

    const handleClick = () => {
        const {centerId, createdBy, date, startTime} = booking
        if(centerId && createdBy && date && startTime){
            axios.post("admin_panel/booking/add_booking", booking, {
                headers: {
                    'authToken': localStorage.getItem("usertoken"),
                }
            })
            .then((res) => {
                const message = res.data.message
                Toast.fire({
                    icon: 'success',
                    title: message
                })
                navigate('/turf')
            }).catch((e)=>{
                Toast.fire({
                    icon: 'error',
                    title: 'Something went wrong'
                })
            })
        }else {
            Toast.fire({
                icon: 'error',
                title: 'Invalid credentials'
            })
        }
    }

    const goBack = () => {
        navigate('/turf')
    }

    return (
        // <Paper sx={{ m: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '1px' }}>
        <Grid container p={2}>
            {/* <Grid item xs={12} md={6}>
                    <Card sx={{ height: 515, m: 1, px: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.87)', borderRadius: '2px' }}>
                        <CardContent>
                            <Typography
                                variant="h1"
                                textAlign='center'
                                color='secondary'
                                fontFamily='Atkinson Hyperlegible, sans-serif'
                                fontWeight={600}>
                                {turfView.centername}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '85%', height: '25%', m: '5px 10px' }}
                                    image={imageTwo}
                                    alt="Live from space album cover" />
                                <CardMedia
                                    component="img"
                                    sx={{ width: '85%', height: '25%', m: '5px 10px' }}
                                    image={imageOne}
                                    alt="Live from space album cover" />
                                <CardMedia
                                    component="img"
                                    sx={{ width: '85%', height: '25%', m: '5px 10px' }}
                                    image={imageOne}
                                    alt="Live from space album cover" />
                            </Box>
                            <Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 600, height: 300, m: .5 }}
                                    image={turfView.turfPictures}
                                    alt="Live from space album cover" />
                            </Box>
                        </Box>
                        <CardContent sx={{ marginTop: '15px' }}>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                                Contact: {turfView.phone}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                                Location: {turfView.location}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid> */}
            <Grid sx={{ margin: '10px auto' }}>
                <Card sx={{ m: 1, backgroundColor: 'rgba(255, 255, 255, 0.87)' }}>
                    <CardContent sx={{ marginTop: 2 }}>
                        <Typography
                            variant="h1"
                            color='text.secondary'
                            textAlign='center'
                            fontFamily='Atkinson Hyperlegible, sans-serif'>
                            Booking Confirmation
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ marginTop: 1 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', marginTop: -3 }}>
                            <Box sx={{
                                width: 550,
                                height: 35,
                                backgroundColor: 'secondary.light',
                                color: 'white'
                            }}>
                                <Typography
                                    sx={{ margin: '2.5px 10px' }}
                                    fontFamily='Open Sans,sans-serif'
                                    fontSize={17}
                                    fontWeight={600}
                                >
                                    CENTER DETAILS
                                </Typography>
                            </Box>
                            <Box>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{display:'flex'}}>
                                    <Box>
                                        Center Name
                                    </Box>
                                    <Box marginLeft={2.5}>
                                        :{turfView.centername}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{display:'flex'}}>
                                    <Box>
                                        Phone
                                    </Box>
                                    <Box marginLeft={8.8}>
                                    :{turfView.phone}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{display:'flex'}}>
                                    <Box>
                                        Address
                                    </Box>
                                    <Box marginLeft={7.2}>
                                    :{turfView.location}
                                    </Box>
                                </Typography>
                            </Box> 
                        </CardContent>
                    </CardContent>
                    <CardContent sx={{ marginTop: -3.5 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', marginTop: -3 }}>
                            <Box sx={{
                                width: 550,
                                height: 35,
                                backgroundColor: 'secondary.light',
                                color: 'white'
                            }}>
                                <Typography
                                    sx={{ margin: '2.5px 10px' }}
                                    fontFamily='Open Sans,sans-serif'
                                    fontSize={17}
                                    fontWeight={600}
                                >
                                    BOOKING DETAILS
                                </Typography>
                            </Box>
                            <Box>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{display:'flex'}}>
                                    <Box>
                                        Date
                                    </Box>
                                    <Box marginLeft={10.2}>
                                        :{booking.date[0]}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{display:'flex'}}>
                                    <Box>
                                        Time
                                    </Box>
                                    <Box marginLeft={10}>
                                        :{`${booking.startTime[1]} to ${booking.endTime[1]}`}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{display:'flex'}}>
                                    <Box>
                                        Offers
                                    </Box>
                                    <Box marginLeft={8.8}>
                                        :Nill
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{display:'flex'}}>
                                    <Box>
                                        Total Amount
                                    </Box>
                                    <Box marginLeft={2}>
                                        :{turfView.price}
                                    </Box>
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardContent>
                    <CardContent sx={{ marginTop: -3.5 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', marginTop: -3 }}>
                            <Box sx={{
                                width: 550,
                                height: 35,
                                backgroundColor: 'secondary.light',
                                color: 'white'
                            }}>
                                <Typography
                                    sx={{ margin: '2.5px 10px' }}
                                    fontFamily='Open Sans,sans-serif'
                                    fontSize={17}
                                    fontWeight={600}
                                >
                                    USER DETAILS
                                </Typography>
                            </Box>
                            <Box>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{display:'flex'}}>
                                    <Box>
                                        Name
                                    </Box>
                                    <Box  marginLeft={9.1}>
                                        :{user.name}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{display:'flex'}}>
                                    <Box>
                                        Phone
                                    </Box>
                                    <Box marginLeft={8.8}>
                                    :{user.phone}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{display:'flex'}}>
                                    <Box>
                                        E-mail
                                    </Box>
                                    <Box marginLeft={8.9}>
                                        :{user.email}
                                    </Box>
                                </Typography>
                            </Box>
                            <Box marginTop={3}>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600}>
                                    Total Amount (Pay at Venue) 
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Box width='100%' sx={{display:'flex', justifyContent:'space-between' }}> 
                                <Box>
                                    <Button variant='contained' onClick={goBack}>Back</Button>
                                </Box>
                                <Box>
                                    <Button color='secondary' variant='contained' onClick={handleClick}>Confirm</Button>
                                </Box>
                            </Box>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        // </Paper>
    )
}

export default BookingConfirmation