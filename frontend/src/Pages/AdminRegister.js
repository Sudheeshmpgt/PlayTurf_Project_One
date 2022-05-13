import React from 'react'
import {
    Button, Grid,
    Link, Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import axios from '../axiosinstance'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AdminRegister() {

    const navigate = useNavigate()
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 5000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const regOnSubmit = (data) => {
        const { email, password } = data
        if ( email && password ) {
            axios.post("admin_registration", data)
                .then((res) => {
                    const message = res.data.message
                    navigate('/adminlogin') 
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                }).catch(e => {
                    Toast.fire({
                        icon: 'error',
                        title: "Some thing went wrong"
                    })
                })
        } else {
            Toast.fire({
                icon: 'error',
                title: "Invalid Credentials"
            })
        }
    }

    const goHome = ()=>{
        navigate('/')
    }

    let paperStyle
    if (isMatch) {
        paperStyle = {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: 20,
            height: 'auto',
            width: 280,
            margin: "50px auto",
            borderRadius: '2px'
        }
    } else {
        paperStyle = {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 20,
            height: 'auto',
            width: 500,
            margin: "144.5px auto",
            borderRadius: '2px',
        }
    }

    const textStyle = { margin: '6px auto' }
    return (
        <Grid container>
            <Grid item xs={12}>
                <Box>
                    <Paper elevation={3} style={paperStyle} sx={{ display: 'flex' }}>
                        <Grid align='center'>
                            <Typography
                            onClick={goHome}
                                fontFamily='Homemade Apple, cursive;'
                                fontSize={25}
                                color='#FF5A09'
                                fontWeight={500}
                                marginTop='20px'
                                marginBottom='20px'
                                sx={{cursor:'pointer'}}>Play Turf</Typography>
                            <h2 style={{ marginBottom: '10px', fontFamily: 'sans-serif', fontWeight: 700 }}>ADMIN REGISTER</h2>
                            <form onSubmit={handleSubmit(regOnSubmit)}>
                                <TextField
                                    style={textStyle}
                                    label='Username'
                                    placeholder='Enter Username'
                                    fullWidth
                                    name='email'
                                    type='email'
                                    {...register('email', {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Please enter a valid email'
                                        }
                                    })}
                                    error={!!errors?.email}
                                    helperText={errors?.email ? errors.email.message : null} />
                                <TextField
                                    style={textStyle}
                                    label='Password'
                                    placeholder='Enter Password'
                                    fullWidth
                                    name='password'
                                    type='password'
                                    {...register('password', {
                                        required: 'This field is required',
                                        minLength: {
                                            value: 4,
                                            message: 'Password must be more than 4 characters'
                                        }
                                    })}
                                    error={!!errors?.password}
                                    helperText={errors?.password ? errors.password.message : null} />
                                <Button
                                    sx={{ marginTop: 1, fontSize:16, fontWeight:600, marginBottom:3.5}}
                                    variant="contained"
                                    color='secondary'
                                    type='submit'
                                    fullWidth
                                >Register</Button>
                            </form>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>
        </Grid >
    )
}

export default AdminRegister