import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { BookingContext } from '../../Store/bookingcontext'
import axios from '../../axiosinstance'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PaymentIcon from '@mui/icons-material/Payment';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

function Success() {
    const { booking } = useContext(BookingContext)
    const [value, setValue] = useState({})
    const [turf, setTurf] = useState({})
    const [picture, setPicture] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const bookingId = localStorage.getItem('bookingId')

        const Id = booking ? booking._id : bookingId
        axios.get(`/user/get_data/${Id}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                setValue(res.data.booking[0])
                setTurf(res.data.booking[0].turfDetails[0])
                setPicture(res.data.booking[0].turfDetails[0].turfPictures[0])
            })
            .catch((err) => {
                alert(err)
            })

    }, [])

    const handleClick = () => {
        navigate('/bookings')
    }
    return (
        <Grid container>
            <Card sx={{ m: '30px auto' }}>
                <CardContent>
                    <Typography
                        fontFamily='Atkinson Hyperlegible, sans-serif'
                        fontSize={22}
                        textAlign='center'
                        color='text.secondary'
                    >
                        Booking Details
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image={picture}
                    alt="Turf Players"
                    sx={{height:250, width:500}} />
                <CardContent>
                    <Typography
                        fontFamily='Atkinson Hyperlegible, sans-serif'
                        fontSize={22}
                        textAlign='center'
                        color='secondary'>
                        {turf.centername}
                    </Typography>
                    <Typography
                        fontFamily='sans-serif'
                        fontSize={16}
                        textAlign='center'>
                        {turf.category} / {turf.location}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Box display='flex'>
                        <Box>
                            <CalendarTodayIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Box ml={1.5} mt={0.2}>
                            {value.date}
                        </Box>
                    </Box>
                    <Box display='flex' mt={1}>
                        <Box>
                            <AccessTimeIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Box ml={1.5} mt={0.2}>
                            {value.startTime} to {value.endTime}
                        </Box>
                    </Box>
                    <Box display='flex' mt={1}>
                        <Box>
                            <LocalOfferIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Box ml={1.5} mt={0.2}>
                            {value.offer ? `${value.offer}%` : 'Nill'}
                        </Box>
                    </Box>
                    <Box display='flex' mt={1}>
                        <Box>
                            <CurrencyRupeeIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Box ml={1.5} mt={0.2}>
                            {turf.price}/-
                        </Box>
                    </Box>
                    <Box display='flex' mt={1}>
                        <Box>
                            <PaymentIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Box ml={1.5} mt={0.2}>
                            {value.paymentMode}
                        </Box>
                    </Box>
                </CardContent>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', mt: -2 }}>
                    <Typography
                        mt={1}
                        fontWeight={600}
                        fontSize={18}
                        sx={{ color: 'green' }}>
                        Total Amount
                    </Typography>
                    <Box display='flex' mt={1}>
                        <Box>
                            <CurrencyRupeeIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Box ml={0.5} mt={0} sx={{ fontWeight: 600, fontSize: 18 }}>
                            {value.totalPrice}/-
                        </Box>
                    </Box>
                </CardContent>
                <CardActions >
                    <Button
                    onClick={handleClick}
                        size='small'
                        variant='contained'
                        color='secondary'
                        sx={{ m: '5px auto' }}>OK</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Success