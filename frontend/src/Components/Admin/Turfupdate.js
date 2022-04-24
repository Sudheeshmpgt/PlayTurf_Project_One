import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, TextField, useTheme, useMediaQuery, Avatar, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2'

function Turfupdate() {

    const location = useLocation()
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        width:'400px',
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
    const [turf, setTurf] = useState({
        centername: '',
        phone: '',
        location: '',
        category: '',
        price: ''
    })
    const [turfid,setTurfId]=useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const id = location.state.id
        setTurfId(id)
        axios.get(`admin_panel/turfs/edit_turfs/${id}`)
            .then((res) => {
                setTurf(res.data.turf[0])
            })
    }, [location.state.id])


    const handleChange = (e) => {
        const { name, value } = e.target
        setTurf({
            ...turf,
            [name]: value
        })
    }

    const Edit = () => {
        const id = turfid
        const { centername, phone, location, category, price } = turf
        if (centername && phone && location && category && price) {
            axios.put(`admin_panel/turfs/edit_turfs/${id}`, turf)
                .then((res) => {
                    const message = res.data.message;
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    navigate('/turfpage')
                })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Invalid Credetials'
            })
        }
    }
    
    const goBack = () =>{
        navigate('/turfpage')
    }

    let paperStyle
    if (isMatch) {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 280,
            margin: "10px auto",
            backgroundColor:'rgba(255, 255, 255, 0.8)',
            borderRadius: '1px'
        }
    } else {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 500,
            margin: "10px auto",
            backgroundColor:'rgba(255, 255, 255, 0.8)',
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
            sx={{marginTop:'10%', 
            color:'white'}}>
                <ArrowBackIcon/> Go Back
            </IconButton>
            </Grid>
                    <Paper elevation={3} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><EditIcon /></Avatar>
                            <h2 style={{ marginBottom: '10px', fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>Edit Turf Details</h2>
                            <form onSubmit={handleSubmit(Edit)} autoComplete='off'>
                                <TextField
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
                                    style={textStyle}
                                    name='centername'
                                    type='string'
                                    onChange={handleChange}
                                    value={turf.centername}
                                    error={!!errors?.centername}
                                    helperText={errors?.centername ? errors.centername.message : null}
                                    label='Center Name'
                                    placeholder='Enter center name'
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
                                    value={turf.phone}
                                    error={!!errors?.phone}
                                    helperText={errors?.phone ? errors.phone.message : null}
                                    label='Phone'
                                    placeholder='Enter contact number'
                                    fullWidth
                                />
                                <TextField
                                    {...register('location', {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/,
                                            message: 'Please enter a valid location'
                                        }
                                    })}
                                    style={textStyle}
                                    name='location'
                                    type='string'
                                    onChange={handleChange}
                                    value={turf.location}
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
                                    onChange={handleChange}
                                    value={turf.category}
                                    error={!!errors?.category}
                                    helperText={errors?.category ? errors.category.message : null}
                                    label='Category'
                                    placeholder='Enter category'
                                    fullWidth />
                                <TextField
                                    {...register('price', {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'Please enter only number'
                                        }
                                    })}
                                    style={textStyle}
                                    name='price'
                                    type='string'
                                    onChange={handleChange}
                                    value={turf.price}
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
        </Grid >
    )
}

export default Turfupdate