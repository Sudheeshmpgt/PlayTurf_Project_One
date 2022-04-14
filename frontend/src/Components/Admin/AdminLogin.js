import { Avatar, Button, Grid, Paper, TextField, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AdminLogin() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const logOnSubmit = (data) => {
        const { email, password } = data
        if (email && password) {
            axios.post("http://localhost:9000/admin_login", data)
                .then((res) => {
                    console.log(res)
                    // setUser(res.data.user)
                    const message = res.data.message
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    const token = res.data.admin.tokens[0].token
                    localStorage.setItem("admintoken", token)
                    navigate('/adminhome')
                }).catch((e) => {
                    console.log(e)
                    Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong'
                    })

                })
        } else {
            Toast.fire({
                icon: 'warning',
                title: 'Invalid user'
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
            width: 375,
            margin: "50px auto",
            borderRadius: '15px'
        }
    }

    const avatarStyle = { backgroundColor: '#DD0404', margin: 15 }
    const textStyle = { margin: '6px auto' }
    return (
        <Grid container>
            <Grid items xs={12}>
                <Box>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h2 style={{ marginBottom: '10px' }}>ADMIN</h2>
                            <h4 style={{ marginBottom: '10px' }}>SIGN IN</h4>
                            <form onSubmit={handleSubmit(logOnSubmit)}>
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
                                    sx={{ marginTop: 1, marginBottom:5 }}
                                    variant="contained"
                                    type='submit'
                                    fullWidth
                                >Sign in</Button>
                            </form>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>
        </Grid >
    )
}

export default AdminLogin