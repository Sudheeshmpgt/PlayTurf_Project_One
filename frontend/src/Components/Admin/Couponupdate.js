import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, TextField, useTheme, useMediaQuery, Avatar, IconButton, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'

function Couponupdate() {
    const location = useLocation()
    const [couponId, setCouponId] = useState('')
    const [couponCode, setCouponCode] = useState('')
    const [offerPercents, setOfferPercents] = useState('')
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

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
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const [couponData, setCouponData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const id = location.state.id
        setCouponId(id)
        axios.get(`admin_panel/coupon/edit_coupon/${id}`, {
            headers: {
                'authToken': localStorage.getItem("admintoken"),
            }
        })
            .then((res) => {
                setCouponData(res.data.coupon)
                setCouponCode(res.data.coupon.couponCode)
                setOfferPercents(res.data.coupon.offerPercent)
                setFromDate(res.data.coupon.fromDate)
                setToDate(res.data.coupon.toDate)  
            })
    }, [location.state.id]) 


    const handleCouponCode = (e) => {
        setCouponCode(e.target.value)
    }

    const handleOfferPercents = (e) => {
        setOfferPercents(e.target.value)
    }

    const Edit = () => {
        const id = couponId
        const fromDateFormat = moment(fromDate).format('DD-MM-YYYY')
        const toDateFormat = moment(toDate).format('DD-MM-YYYY')
        const values = {
            couponCode: couponCode,
            offerPercent: offerPercents,
            fromDate: fromDateFormat,
            toDate: toDateFormat,
        }
        axios.put(`admin_panel/coupon/edit_coupon/${id}`, values, {
            headers: {
                'authToken': localStorage.getItem("admintoken"),
            }
        })
            .then((res) => {
                const message = res.data.message;
                Toast.fire({
                    icon: 'success',
                    title: message
                })
                navigate('/couponpage')
            }).catch(e => {
                Toast.fire({
                    icon: 'error',
                    title: 'Invalid Credetials'
                })
            })
    }

    const goBack = () => {
        navigate('/couponpage')  
    }

    let paperStyle
    if (isMatch) {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 280,
            margin: "105px auto",
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '1px'
        }
    } else {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 500,
            margin: "10px auto",
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '1px'
        }
    }

    const avatarStyle = { backgroundColor: '#DD0404', margin: 15 }
    const textStyle = { margin: '6px auto' }

    return (
        <Grid container>
            <Grid>
                <IconButton
                    variant='text'
                    onClick={goBack}
                    sx={{
                        marginTop: '10%',
                        color: 'white'
                    }}>
                    <ArrowBackIcon /> Go Back
                </IconButton>
            </Grid>
            <Paper elevation={3} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle} ><EditIcon /></Avatar>
                    <h2 style={{ marginBottom: '10px', fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>EDIT COUPON</h2>
                    <form onSubmit={handleSubmit(Edit)} autoComplete='off'>
                        <TextField
                            {...register('couponCode', {
                                required: 'This field is required',
                            })}
                            style={textStyle}
                            name='couponCode'
                            type='string'
                            onChange={handleCouponCode}
                            value={couponCode}
                            error={!!errors?.couponCode}
                            helperText={errors?.couponCode ? errors.couponCode.message : null}
                            label='Coupon Code'
                            placeholder='Enter Coupon Code'
                            fullWidth
                        />
                        <TextField
                            {...register('offerPercent', {
                                required: 'This field is required',
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: 'Please enter a valid offerPercent number'
                                }
                            })}
                            style={textStyle}
                            name='offerPercent'
                            type='string'
                            onChange={handleOfferPercents}
                            value={offerPercents}
                            error={!!errors?.offerPercent}
                            helperText={errors?.offerPercent ? errors.offerPercent.message : null}
                            label='Offer Percent'
                            placeholder='Enter offer percent'
                            fullWidth
                        />
                        <Box display='flex' justifyContent='space-between'>
                            <LocalizationProvider dateAdapter={AdapterMoment} >
                                <DatePicker
                                    sx={{ marginTop: -3 }}
                                    label="Select From Date"
                                    value={fromDate}
                                    onChange={(newValue) => {
                                        setFromDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField  {...params} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterMoment} >
                                <DatePicker
                                    sx={{ marginTop: -3 }}
                                    label="Select To Date"
                                    value={toDate}
                                    onChange={(newValue) => {
                                        setToDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField  {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Button
                            sx={{ marginTop: 1, marginBottom: 2 }}
                            type='submit'
                            variant="contained"
                            fullWidth>Submit</Button>
                    </form> 
                </Grid>
            </Paper>
        </Grid >
    )
}


export default Couponupdate