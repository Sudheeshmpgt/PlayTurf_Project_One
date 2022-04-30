import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, TextField, useTheme, useMediaQuery, Avatar, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2'

function Userupdate() {

    const location = useLocation()
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
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        const id = location.state.id
        axios.get(`admin_panel/user_management/update/${id}`,{
            headers: {
                'authToken': localStorage.getItem("admintoken")
            }
        })
            .then((res) => {
                setUser(res.data.user[0])
            })
    }, [location.state.id])


    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const Edit = () => {
        const id = location.state.id
        const { name, phone, email } = user
        if (name && phone && email) {
            axios.put(`admin_panel/user_management/edit_user/${id}`, user,{
                headers: {
                    'authToken': localStorage.getItem("admintoken")
                }
            })
                .then((res) => {
                    const message = res.data.message;
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    navigate('/userpage')
                })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Invalid Credetials'
            })
        }
    }

    const goBack = () => {
        navigate('/userpage')
    }

    let paperStyle
    if (isMatch) {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 280,
            margin: "50px auto",
            borderRadius: '2px'
        }
    } else {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 500,
            margin: "50px auto",
            borderRadius: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }
    }

    const avatarStyle = { backgroundColor: '#DD0404', margin: 15 }
    const textStyle = { margin: '6px auto' }
    return (
        <Grid container width='100%'>
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
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><EditIcon /></Avatar>
                    <h2 style={{ marginBottom: '10px', fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>Edit User</h2>
                    <form onSubmit={handleSubmit(Edit)}>
                        <TextField
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
                            style={textStyle}
                            name='name'
                            type='string'
                            onChange={handleChange}
                            value={user.name}
                            error={!!errors?.name}
                            helperText={errors?.name ? errors.name.message : null}
                            label='Name'
                            placeholder='Enter Fullname'
                            fullWidth
                        />
                        <TextField
                            {...register('phone', {
                                required: 'This field is required',
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: 'Please enter a valid phone number'
                                }
                            })}
                            style={textStyle}
                            name='phone'
                            type='string'
                            onChange={handleChange}
                            value={user.phone}
                            error={!!errors?.phone}
                            helperText={errors?.phone ? errors.phone.message : null}
                            label='Phone'
                            placeholder='Enter Phone Number'
                            fullWidth
                        />
                        <TextField
                            {...register('email', {
                                required: 'This field is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter a valid email'
                                }
                            })}
                            style={textStyle}
                            name='email'
                            type='email'
                            onChange={handleChange}
                            value={user.email}
                            error={!!errors?.email}
                            helperText={errors?.email ? errors.email.message : null}
                            label='Email'
                            placeholder='Enter Email'
                            fullWidth />
                        <Button
                            sx={{ marginTop: 1, marginBottom: 6 }}
                            type='submit'
                            variant="contained"
                            fullWidth>Update</Button>
                    </form>
                </Grid>
            </Paper>
        </Grid >
    )
}

export default Userupdate