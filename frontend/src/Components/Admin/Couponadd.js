import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Button, Grid,
  Paper,
  TextField,
  useMediaQuery,
  useTheme,
  IconButton,
  Box,
} from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'

function Couponadd() {

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
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

  useEffect(() => {
    const token = localStorage.getItem("admintoken")
    if (!token) {
      navigate('/adminlogin')
    }
    return () => {
    }
  }, [navigate])


  const addOfferOnSubmit = async (data) => {
    const nowDate = moment().format('DD-MM-YYYY')
    const { couponCode, offerPercent } = data
    const fromDateFormat = moment(fromDate).format('DD-MM-YYYY')
    const toDateFormat = moment(toDate).format('DD-MM-YYYY')

    const one = moment(fromDateFormat).isBefore(nowDate)
    const two = moment(toDateFormat).isBefore(nowDate)
    if (one || two) {
      Toast.fire({
        icon: 'error',
        title: 'Choose valid date'
      })
    } else {
      const values = {
        couponCode:couponCode,
        offerPercent: offerPercent,
        fromDate: fromDateFormat,
        toDate: toDateFormat
      }
      if (couponCode && offerPercent && fromDate && toDate) {
        axios.post('admin_panel/coupon/add_coupon', values, {
          headers: {
            'authToken': localStorage.getItem("admintoken"),
          }
        })
          .then((res) => {
            const message = res.data.message
            if (message) {
              Toast.fire({
                icon: 'success',
                title: message
              })
            } else {
              const message = res.data.error
              Toast.fire({
                icon: 'warning',
                title: message
              })
            }
            navigate('/couponpage')
          }).catch(e => {
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
      margin: "50px auto",
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '2px'
    }
  } else {
    paperStyle = {
      padding: 20,
      height: 'auto',
      width: 500,
      margin: "50px auto",
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '2px'
    }
  }

  const avatarStyle = { backgroundColor: '#DD0404', margin: 7 }
  const textStyle = { margin: '10px auto' }

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
          <Avatar style={avatarStyle} ><LocalOfferIcon /></Avatar>
          <h2 style={{ marginBottom: '10px', fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>ADD NEW COUPON</h2>
          <form onSubmit={handleSubmit(addOfferOnSubmit)} autoComplete='off'>
            <TextField
              style={textStyle}
              name='couponCode'
              type='string'
              {...register('couponCode', {
                required: 'This field is required',
              })}
              error={!!errors?.couponCode}
              helperText={errors?.couponCode ? errors.couponCode.message : null}
              label='Coupon Code'
              placeholder='Enter Coupon Code'
              fullWidth
            />
            <TextField
              style={textStyle}
              name='offerPercent'
              type='string'
              {...register('offerPercent', {
                required: 'This field is required',
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Please enter a valid offerPercent number'
                }
              })}
              error={!!errors?.offerPercent}
              helperText={errors?.offerPercent ? errors.offerPercent.message : null}
              label='Offer Percent'
              placeholder='Enter offer percent'
              fullWidth
            />
            <Box display='flex' justifyContent='space-between' mt={1} mb={1}>
              <LocalizationProvider dateAdapter={AdapterMoment} >
                <DatePicker
                  sx={{ marginTop: 2 }}
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
                  sx={{ marginTop: 2 }}
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

export default Couponadd