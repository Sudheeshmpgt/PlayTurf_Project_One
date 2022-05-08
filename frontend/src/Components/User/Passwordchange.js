import React from 'react'
import {
    Button, Fab, Grid,
    IconButton,
    Paper,
    TextField,
    useMediaQuery,
    useTheme
} from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockResetIcon from '@mui/icons-material/LockReset';

function Passwordchange() {
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

    const changeOnSubmit = (data) => {
        console.log(data)
        const { email, password, confirmPassword } = data
        console.log(email,password,confirmPassword) 
        if ( email && password && (password === confirmPassword)) {
            axios.put("user/update_data", data,{
                headers: {
                    'authToken': localStorage.getItem("usertoken"),
                }
            })
                .then((res) => {
                    console.log(res)
                    const message = res.data.message
                    navigate('/login')
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                }).catch(e => {
                    console.log(e)
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

    const goBack = () => {
        navigate('/account')
    }

    let paperStyle
    if (isMatch) {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 280,
            margin: "50px auto",
            borderRadius: '20px 0 20px 0',
        }
    } else {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 400,
            margin: "50px auto",
            borderRadius: '20px 0 20px 0',
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }
    }

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
            <Grid item xs={12}>
                <Box>
                    <Paper elevation={3} style={paperStyle} sx={{ display: 'flex' }}>
                        <Grid align='center'>
                            <Fab color='secondary' sx={{m:3}}> 
                                <LockResetIcon size='small' sx={{fontSize:35}}/> 
                            </Fab>
                            <form onSubmit={handleSubmit(changeOnSubmit)} autoComplete='off'>
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
                                    label='New Password'
                                    placeholder='Enter new password'
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
                                    placeholder='Confirm new password'
                                    fullWidth /> 
                                <Button
                                    sx={{ marginTop: 1, fontSize: 16, fontWeight: 600 }}
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

export default Passwordchange