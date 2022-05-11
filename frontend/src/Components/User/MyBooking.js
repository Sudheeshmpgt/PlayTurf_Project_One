import { Card, Grid, Paper, Typography, Fab, CardActions, CardContent, CardMedia } from '@mui/material'
import axios from '../../axiosinstance'
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../Store/usercontext'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CancelIcon from '@mui/icons-material/Cancel';
import imageFootball from '../../Images/Football_Goal.gif'
import { Box } from '@mui/system'
import Swal from 'sweetalert2';
import './MyBooking.css'
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function MyBooking() {
    const [bookingData, setBookingData] = useState([])
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")

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

    const getBookingDetails = () => {
        const id = user ? user._id : userId
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

    const handleView = (id) => {
        localStorage.setItem("bookingId", id)
        navigate('/preview')
    }

    const handleCancel = (id) => {
        const bookingId = id
        const value = {
            data: 'Cancelled',
            userid: userId
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`booking/edit_status/${bookingId}`, value, {
                        headers: {
                            'authToken': localStorage.getItem("usertoken"),
                        }
                    })
                        .then((res) => {
                            setBookingData(res.data.booking)
                        }).catch(e => {
                            Toast.fire({
                                icon: 'error',
                                title: 'Request failed'
                            })
                        })
                } catch (error) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong!!'
                    })
                }
                Swal.fire(
                    'Cancelled!',
                    'Your booking has been cancelled.',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        getBookingDetails();
    }, [])

    return (
        <Grid container>
            {
                bookingData.length === 0 ? (
                    <Card sx={{ margin: '30px auto' }}>
                        <CardContent>
                            <Typography
                                textAlign='center'
                                color='text.secondary'
                                fontSize={22}
                                fontFamily='Open Sans,sans-serif'
                                fontWeight={900}>
                                You Have No Bookings Yet!!
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component='img'
                            image={imageFootball}
                        />
                    </Card>
                ) : (
                    <Paper className='scrollbar-hidden' sx={{ margin: '30px auto', width: '92%', height: 550, overflow: 'scroll' }}>
                        <Typography
                            margin={3}
                            fontSize={25}
                            fontWeight={900}
                            color='text.secondary'
                            fontFamily='Atkinson Hyperlegible, sans-serif'
                            textAlign='center'
                        >BOOKING HISTORY</Typography>
                        <Box sx={{ margin: '30px auto' }}>
                            <Card sx={{ display: 'flex', justifyContent: 'space-evenly', width: 1200, margin: '0 auto', backgroundColor: 'secondary.light', fontFamily: 'Open Sans,sans-serif', }}>
                                <Box sx={{ fontWeight: 600, width: 60, margin: 2, textAlign: 'center' }}>
                                    SL.No.
                                </Box>
                                <Box sx={{ fontWeight: 600, width: 200, margin: 2, textAlign: 'center' }}>
                                    Center Name
                                </Box>
                                <Box sx={{ fontWeight: 600, width: 100, margin: 2, textAlign: 'center' }}>
                                    Date
                                </Box>
                                <Box sx={{ fontWeight: 600, width: 125, margin: 2, textAlign: 'center' }}>
                                    Time
                                </Box>
                                <Box sx={{ fontWeight: 600, width: 100, margin: 2, textAlign: 'center' }}>
                                    Category
                                </Box>
                                <Box sx={{ fontWeight: 600, width: 100, margin: 2, textAlign: 'center' }}>
                                    Amount
                                </Box>
                                <Box sx={{ fontWeight: 600, width: 100, margin: 2, textAlign: 'center' }}>
                                    Status
                                </Box>
                                <Box sx={{ fontWeight: 600, width: 100, margin: 2, textAlign: 'center' }}>
                                    Actions
                                </Box>
                            </Card>
                            {bookingData.map((data, index) => (
                                <Card sx={{ display: 'flex', justifyContent: 'space-evenly', width: 1200, margin: '5px auto', fontFamily: 'Open Sans,sans-serif' }}>
                                    <Box sx={{ width: 60, margin: 3, textAlign: 'center' }}>
                                        {index + 1}
                                    </Box>
                                    <Box sx={{ width: 200, margin: 3, textAlign: 'center' }}>
                                        {data.turfDetails[0].centername}
                                    </Box>
                                    <Box sx={{ width: 100, margin: 3, textAlign: 'center' }}>
                                        {data.date}
                                    </Box>
                                    <Box sx={{ width: 125, margin: 3, textAlign: 'center' }}>
                                        {data.startTime} to {data.endTime}
                                    </Box>
                                    <Box sx={{ width: 100, margin: 3, textAlign: 'center' }}>
                                        {data.turfDetails[0].category}
                                    </Box>
                                    <Box sx={{ width: 100, margin: 3, textAlign: 'center' }}>
                                        <CurrencyRupeeIcon />{data.totalPrice}
                                    </Box>
                                    <Box sx={{ width: 100, margin: 3, textAlign: 'center' }}>
                                        {data.status}
                                    </Box>
                                    <CardActions sx={{ width: 60 }}>
                                        <Fab size='small' color='primary' onClick={() => handleView(data._id)} >
                                            <RemoveRedEyeIcon sx={{ fontSize: 27 }} />
                                        </Fab>
                                    </CardActions>
                                    <CardActions sx={{ width: 60 }}>
                                        {
                                            data.status === 'Completed' || data.status === 'Cancelled' ?
                                                ' ' :
                                                <Fab size='small' color='secondary' onClick={() => handleCancel(data._id)}>
                                                    <CancelIcon sx={{ fontSize: 27 }} />
                                                </Fab>
                                        }
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </Paper>
                )
            }
        </Grid>
    )
}

export default MyBooking