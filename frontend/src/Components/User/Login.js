import {
    Avatar,
    Button,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import { Box } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React from 'react'
import { useForm } from 'react-hook-form'

function Login() {

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const logOnSubmit = (data) => {
       
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
                            <h2 style={{ marginBottom: '10px' }}>SIGN IN</h2>
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
                                    sx={{ marginTop: 1 }}
                                    variant="contained"
                                    type='submit'
                                    fullWidth>Sign in</Button>
                            </form>
                            <Typography>
                                <Grid container spacing={1} sx={{ marginTop: 1 }}>
                                    <Grid item xs={12} md={4.5}>
                                        <Link sx={{ fontSize: '0.9rem' }}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} md={7.5}>
                                        <Link sx={{ fontSize: '0.9rem' }}>
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>
        </Grid >
    )
}

export default Login