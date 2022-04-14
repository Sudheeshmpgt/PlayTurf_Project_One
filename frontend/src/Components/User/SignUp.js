import React from 'react'
import {
    Avatar,
    Button, Grid,
    Link, Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import { Box } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function SignUp() {

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
        const { name, phone, email, password, confirmPassword } = data
        if (name && phone && email && password && (password === confirmPassword)) {
            axios.post("http://localhost:9000/user_registration", data)
                .then((res) => {
                    const message = res.data.message
                    navigate('/login')
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

    const toLogin=()=>{
        navigate('/login')
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
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h2 style={{ marginBottom: '10px' }}>SIGN UP</h2>
                            <form onSubmit={handleSubmit(regOnSubmit)}>
                                <TextField
                                    style={textStyle}
                                    name='name'
                                    type='string'
                                    {...register('name', {
                                        required: 'This field is required',
                                        minLength: {
                                            value: 4,
                                            message: 'Please enter atleast 4 characters'
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/,
                                            message: 'Please enter a valid name'
                                        }
                                    })}
                                    error={!!errors?.name}
                                    helperText={errors?.name ? errors.name.message : null}
                                    label='Name'
                                    placeholder='Enter Fullname'
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
                                    placeholder='Enter Phone Number'
                                    fullWidth
                                />
                                <TextField
                                    style={textStyle}
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
                                    helperText={errors?.email ? errors.email.message : null}
                                    label='Email'
                                    placeholder='Enter Email'
                                    fullWidth />
                                <TextField
                                    style={textStyle}
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
                                    helperText={errors?.password ? errors.password.message : null}
                                    label='Password'
                                    placeholder='Enter Password'
                                    fullWidth />
                                <TextField
                                    style={textStyle}
                                    name='confirmPassword'
                                    type='password'
                                    {...register('confirmPassword', {
                                        required: 'This field is required',
                                        minLength: {
                                            value: 4,
                                            message: 'Password must be more than 4 characters'
                                        }
                                    })}
                                    error={!!errors?.confirmPassword}
                                    helperText={errors?.confirmPassword ? errors.confirmPassword.message : null}
                                    label='Confirm Password'
                                    placeholder='Confirm Password'
                                    fullWidth />
                                <Button
                                    sx={{ marginTop: 1 }}
                                    type='submit'
                                    variant="contained"
                                    fullWidth>Sign Up</Button>
                            </form>
                            <Typography>
                                <Grid container sx={{ marginTop: 1 }} onClick={toLogin}>
                                    <Link sx={{ fontSize: '0.9rem', cursor:'pointer'}} >
                                        Already have an account? Sign In
                                    </Link>
                                </Grid>
                            </Typography>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>
        </Grid >
    )
}

export default SignUp