import React from 'react'
import {
    Avatar,
    Button, Grid,
    Paper,
    TextField,
    useMediaQuery,
    useTheme
} from '@mui/material'
import { Box } from '@mui/system'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';

function Turfadd() {

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

    const addTurfOnSubmit = (data) => {
        const { centername, phone, location, category, price } = data
        if (centername && phone && location && category && price) {
            axios.post("http://localhost:9000/admin_panel/turfs/add_turfs", data)
                .then((res) => {
                    const message = res.data.message
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    navigate('/turfpage')
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


    let paperStyle
    if (isMatch) {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 280,
            margin: "50px auto",
            borderRadius: '15px'
        }
    } else {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 500,
            margin: "50px auto",
            borderRadius: '15px'
        }
    }

    const avatarStyle = { backgroundColor: '#DD0404', margin: 15 }
    const textStyle = { margin: '6px auto' }
    return (
        <Grid container>
            <Grid item xs={12}>
                <Box>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><SportsSoccerIcon /></Avatar>
                            <h2 style={{ marginBottom: '10px' }}>ADD NEW TURF</h2>
                            <form onSubmit={handleSubmit(addTurfOnSubmit)} autoComplete='off'>
                                <TextField
                                    style={textStyle}
                                    name='centername'
                                    type='string'
                                    {...register('centername', {
                                        required: 'This field is required',
                                        minLength: {
                                            value: 4,
                                            message: 'Please enter atleast 4 characters'
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/,
                                            message: 'Please enter a valid center name'
                                        }
                                    })}
                                    error={!!errors?.centername}
                                    helperText={errors?.centername ? errors.centername.message : null}
                                    label='Center Name'
                                    placeholder='Enter center name'
                                    fullWidth
                                />
                                <TextField
                                    style={textStyle}
                                    name='phone'
                                    type='string'
                                    {...register('phone', {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^\d{10}$/,
                                            message: 'Please enter a valid phone number'
                                        }
                                    })}
                                    error={!!errors?.phone}
                                    helperText={errors?.phone ? errors.phone.message : null}
                                    label='Phone'
                                    placeholder='Enter contact number'
                                    fullWidth
                                />
                                <TextField
                                    style={textStyle}
                                    name='location'
                                    type='string'
                                    {...register('location', {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/,
                                            message: 'Please enter a valid location'
                                        }
                                    })}
                                    error={!!errors?.location}
                                    helperText={errors?.location ? errors.location.message : null}
                                    label='Location'
                                    placeholder='Enter center location'
                                    fullWidth />
                                <TextField
                                    style={textStyle}
                                    name='category'
                                    type='string'
                                    {...register('category', {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/,
                                            message: 'Please enter a valid category'
                                        }

                                    })}
                                    error={!!errors?.category}
                                    helperText={errors?.category ? errors.category.message : null}
                                    label='Category'
                                    placeholder='Enter category'
                                    fullWidth />
                                <TextField
                                    style={textStyle}
                                    name='price'
                                    type='string'
                                    {...register('price', {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'Please enter only number'
                                        }
                                    })}
                                    error={!!errors?.price}
                                    helperText={errors?.price ? errors.price.message : null}
                                    label='Price'
                                    placeholder='Enter price per hour'
                                    fullWidth />
                                <Button
                                    sx={{ marginTop: 1, marginBottom: 5 }}
                                    type='submit'
                                    variant="contained"
                                    fullWidth>Submit</Button>
                            </form>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>
        </Grid >
    )
}

export default Turfadd