import { Card, CardActions, CardContent, Grid, Typography, Button, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Input } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TurfList.css'
import { TurfViewContext } from '../../Store/turfviewcontext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UserContext } from '../../Store/usercontext';
import { BookingContext } from '../../Store/bookingcontext'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2';
import moment from 'moment'

function BookingConfirmation() {

    const navigate = useNavigate()
    const { turfView } = useContext(TurfViewContext)
    const { user } = useContext(UserContext)
    const { booking, setBooking } = useContext(BookingContext)
    // console.log(booking)
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('Pay At Venue')
    const [code, setCode] = useState('')
    const [coupon, setCoupon] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [couponStatus, setCouponStatus] = useState(false)
    const userName = localStorage.getItem('userName')
    const userPhone = localStorage.getItem('userPhone')
    const userEmail = localStorage.getItem('userEmail')

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

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    function loadRazorpay() {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onerror = () => {
            console.log('Razorpay SDK failed to load. Are you online?');
        }
        script.onload = async () => {
            try {
                setLoading(true)
                const result = await axios.post('create_order', {
                    amount: booking.totalPrice + '00',
                }, {
                    headers: {
                        'authToken': localStorage.getItem("usertoken"),
                    }
                })
                const { amount, id: order_id, currency } = result.data
                const {
                    data: { key: razorpayKey }
                } = await axios.get('get_key', {
                    headers: {
                        'authToken': localStorage.getItem("usertoken"),
                    }
                })
                const options = {
                    key: razorpayKey,
                    amount: amount.toString(),
                    currency: currency,
                    name: 'example name',
                    description: 'example transaction',
                    order_id: order_id,
                    handler: async function (response) {
                        const result = await axios.post('pay_order', {
                            amount: amount,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_Signature,
                        }, {
                            headers: {
                                'authToken': localStorage.getItem("usertoken"),
                            }
                        })
                            .then((res) => {
                                const message = res.data.message
                                if (message == 'Payment was successful') {
                                    bookingConfirm()
                                }
                            })
                    },
                    prefill: {
                        name: 'example name',
                        email: 'email@example.com',
                        contact: '1111111111',
                    }, notes: {
                        address: 'example address'
                    }, theme: {
                        color: '#FF5A09'
                    }
                }
                setLoading(false)
                const paymentObject = new window.Razorpay(options)
                paymentObject.open()
            } catch (error) {
                setLoading(false)
            }
        }
        document.body.appendChild(script);
    }

    function bookingConfirm() {
        const { centerId, createdBy, date, startTime, endTime, offer } = booking
        const price = totalPrice
        const values = {
            centerId: centerId,
            createdBy: createdBy,
            date: date,
            startTime: startTime,
            endTime: endTime,
            totalPrice: price,
            paymentMode: value,
            offer: offer
        }
        if (centerId && createdBy && date && startTime) {
            axios.post("admin_panel/booking/add_booking", values, {
                headers: {
                    'authToken': localStorage.getItem("usertoken"),
                }
            })
                .then((res) => {
                    setBooking(res.data.booking)
                    const message = res.data.message
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    localStorage.setItem("bookingId", res.data.booking._id)
                    navigate('/preview')
                }).catch((e) => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong'
                    })
                })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Invalid credentials'
            })
        }
    }

    const handleClick = () => {
        const type = value
        if (type === 'Online Payment') {
            loadRazorpay();
        } else {
            bookingConfirm();
        }
    }

    const handleCouponChange = (e) => {
        setCode(e.target.value)
    }

    const goBack = () => {
        navigate('/turf')
    }

    const couponSubmit = () => {
        if (code) {

            axios.get(`user/check_coupon/?code=${code}`, {
                headers: {
                    'authToken': localStorage.getItem("usertoken"),
                }
            })
                .then((res) => {
                    const expDate = res.data.coupon.toDate
                    const nowDate = moment().format('DD-MM-YYYY')
                    const verifyDate = moment(expDate).isBefore(nowDate)    
                    const status = res.data.coupon.status
                    if (!verifyDate && status) {
                        if (res.data.message === 'OK') {
                            setCoupon(res.data.coupon)
                            const couponPercent = res.data.coupon.offerPercent
                            const userId = localStorage.getItem('userId')
                            const couponId = res.data.coupon._id
                            axios.get(`user/coupon/verify_user/?userId=${userId}&couponId=${couponId}`, {
                                headers: {
                                    'authToken': localStorage.getItem("usertoken"),
                                }
                            })
                                .then((res) => {
                                    if (res.data.message === 'OK') {
                                        const price = booking.totalPrice
                                        setTotalPrice(price - price * couponPercent / 100)
                                        setCouponStatus(true)
                                    } else {
                                        const message = res.data.error
                                        Toast.fire({
                                            icon: 'error',
                                            title: message
                                        })
                                    }
                                })
                                .catch((e) => {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Something went wrong'
                                    })
                                })
                        } else {
                            const message = res.data.error
                            Toast.fire({
                                icon: 'error',
                                title: message
                            })
                        }
                    }else{
                        Toast.fire({
                            icon: 'error',
                            title: 'Coupon Expired'
                        })
                    }
                })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Please enter the coupon code'
            })
        }
    }

    return (
        <Grid container p={2}>
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
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{ display: 'flex' }}>
                                    <Box>
                                        Center Name
                                    </Box>
                                    <Box marginLeft={2.5}>
                                        :{turfView.centername}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{ display: 'flex' }}>
                                    <Box>
                                        Phone
                                    </Box>
                                    <Box marginLeft={8.8}>
                                        :{turfView.phone}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{ display: 'flex' }}>
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
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{ display: 'flex' }}>
                                    <Box>
                                        Date
                                    </Box>
                                    <Box marginLeft={10.2}>
                                        :{booking.date}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{ display: 'flex' }}>
                                    <Box>
                                        Time
                                    </Box>
                                    <Box marginLeft={10}>
                                        :{`${booking.startTime} to ${booking.endTime}`}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{ display: 'flex' }}>
                                    <Box>
                                        Offers
                                    </Box>
                                    <Box marginLeft={8.8}>
                                        :{booking.offer ? `${booking.offer}%` : 'Nill'}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{ display: 'flex' }}>
                                    <Box>
                                        Total Amount
                                    </Box>
                                    <Box marginLeft={2}>
                                        :{booking.totalPrice}
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
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{ display: 'flex' }}>
                                    <Box>
                                        Name
                                    </Box>
                                    <Box marginLeft={9.1}>
                                        :{user ? user.name : userName}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{ display: 'flex' }}>
                                    <Box>
                                        Phone
                                    </Box>
                                    <Box marginLeft={8.8}>
                                        :{user ? user.phone : userPhone}
                                    </Box>
                                </Typography>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600} sx={{ display: 'flex' }}>
                                    <Box>
                                        E-mail
                                    </Box>
                                    <Box marginLeft={8.9}>
                                        :{user ? user.email : userEmail}
                                    </Box>
                                </Typography>
                            </Box>
                            <Box mt={3} sx={{ cursor: 'pointer', display: 'flex' }}>
                                <Box width='76%'>
                                    <TextField
                                        onChange={handleCouponChange}
                                        value={code}
                                        size='small'
                                        name='couponCode'
                                        placeholder='Enter Coupon Code'
                                        Color='secondary'
                                        fullWidth>
                                    </TextField>
                                </Box>
                                <Button onClick={couponSubmit} color='success' variant='contained'>APPLY COUPON</Button>
                            </Box>
                            {
                                couponStatus &&
                                <Box mt={1}>
                                    <Typography color='green' fontSize={18} >
                                        <CheckCircleIcon sx={{ fontSize: 25, mb: -0.7 }} /> Coupon Applied
                                    </Typography>
                                </Box>
                            }

                            <Box marginTop={3}>
                                <Typography fontFamily='Open Sans,sans-serif' fontSize={15} fontWeight={600}>
                                    Total Amount (Pay at Venue): {totalPrice ? totalPrice : booking.totalPrice}
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: -2 }}>
                            <FormControl>
                                <FormLabel id='section-group-label'
                                    sx={{
                                        color: 'black',
                                        marginBottom: 1,
                                        fontSize: 15,
                                        fontWeight: 600,
                                        marginLeft: 1
                                    }}
                                >
                                    Select Payment Mode
                                </FormLabel>
                                <RadioGroup
                                    name='sections-group'
                                    aria-labelledby='section-group-label'
                                    value={value}
                                    onChange={handleChange}
                                    sx={{ marginLeft: 3 }}
                                >
                                    <FormControlLabel control={<Radio color='secondary' />} label='Pay At Venue' value='Pay At Venue' />
                                    <FormControlLabel control={<Radio color='secondary' />} label='Online Payment' value='Online Payment' />
                                </RadioGroup>
                            </FormControl>
                        </CardActions>
                        <CardActions>
                            <Box width='100%' sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
    )
}

export default BookingConfirmation