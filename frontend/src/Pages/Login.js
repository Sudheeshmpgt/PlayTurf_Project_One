import { Button, Grid, Link, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../axiosinstance'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Store/usercontext'
import Swal from 'sweetalert2'
import GoogleLogin from 'react-google-login'

function Login() {
    const { setUser } = useContext(UserContext)
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
            axios.post("user_signin", data)
                .then((res) => {
                    setUser(res.data.user)
                    const message = res.data.message
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    const token = res.data.user.tokens[0].token
                    localStorage.setItem("usertoken", token)
                    navigate('/')
                }).catch((e) => {
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

    const responseSuccessGoogle = (response) => {
        console.log(response)
        axios({
            method:'POST',
            url: 'googlelogin',
            data: {tokenId: response.tokenId}
        }).then(res=>{
            setUser(res.data.user)
                    const message = res.data.message
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    const token = res.data.user.tokens[0].token
                    localStorage.setItem("usertoken", token)
                    navigate('/')
        }).catch((e) => {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong'
            })

        })
    }

    const responseErrorGoogle = (response) => {

    }

    const toSignup = () => {
        navigate('/signup')
    }

    const goHome = () => {
        navigate('/')
    }

    let paperStyle
    if (isMatch) {
        paperStyle = {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 20,
            height: 'auto',
            width: 280,
            margin: "150px auto",
            borderRadius: '2px'
        }
    } else {
        paperStyle = {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 20,
            height: 'auto',
            width: 775,
            margin: "8% auto",
            borderRadius: '2px'
        }
    }

    const textStyle = { margin: '6px auto' }
    return (
        <Grid container>

            <Grid items xs={12}>
                <Box >
                    <Paper elevation={3} style={paperStyle} sx={{ display: 'flex' }}>
                        {!isMatch &&
                            <Grid>
                                <img style={{ height: '400px', margin: '10px' }} alt='' src='https://cdn.pixabay.com/photo/2014/04/03/00/37/soccer-308853_960_720.png' />
                            </Grid>
                        }
                        <Grid align='center'>
                            <Typography
                                onClick={goHome}
                                fontFamily='Homemade Apple, cursive;'
                                fontSize={25}
                                color='#FF5A09'
                                fontWeight={500}
                                marginTop='25px'
                                sx={{ cursor: 'pointer' }}>Play Turf</Typography>
                            <h2 style={{ marginBottom: '10px', marginTop: '25px', fontFamily: 'sans-serif' }}>SIGN IN</h2>
                            <form onSubmit={handleSubmit(logOnSubmit)} autoComplete='off'>
                                <TextField
                                fontColor='text.primary'
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
                                    sx={{ marginTop: 1, fontSize: 16, fontWeight: 600 }}
                                    variant="contained"
                                    color='secondary'
                                    type='submit'
                                    fullWidth
                                >Sign in</Button>
                            </form>
                            <Box>
                                <Typography sx={{margin:1}}>Or</Typography>
                                <Typography>
                                <Grid container spacing={1} sx={{ marginTop: 1 }}>
                                    <Grid item xs={12} md={6}>
                                    <GoogleLogin
                                    clientId="992753020822-b6nncsvofh7in71saop3af9pp1rcuqpk.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={responseSuccessGoogle}
                                    onFailure={responseErrorGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                                    </Grid>
                                    {/* <Grid item xs={12} md={4.5}> */}
                                        {/* <Link sx={{ fontSize: '0.9rem', cursor: 'pointer' }}> */}
                                            {/* Forgot password? */}
                                        {/* </Link> */}
                                    {/* </Grid> */}
                                    <Grid item xs={12} md={6}>
                                        <Link sx={{ fontSize: '0.9rem', cursor: 'pointer' }} onClick={toSignup}>
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Typography>
                            </Box>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>
        </Grid >
    )
}

export default Login