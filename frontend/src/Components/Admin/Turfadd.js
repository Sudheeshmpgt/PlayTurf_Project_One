import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import {
    Avatar,
    Button, Grid,
    Paper,
    TextField,
    useMediaQuery,
    useTheme,
    IconButton,
    Box,
    MenuItem,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Turfadd() {

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const getCategoryData = async () => {
        try {
            const data = await axios.get("admin_panel/category",{
                headers: {
                    'authToken': localStorage.getItem("admintoken"),
                }
            })
            setCategories(data.data.category)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("admintoken")
        if (!token) {
            navigate('/adminlogin')
        } else {
            getCategoryData();
        }
        return () => {
        }
    }, [navigate])

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

    const addTurfOnSubmit = async (data) => {
        const { centername, phone, location, price, category } = data
        let values = new FormData();
        if (data) {

            _.forEach(data.picture, file =>{
                values.append('pictures', file)
            })
            values.append('centername', centername)
            values.append('phone', phone)
            values.append('location', location)
            values.append('category', category)
            values.append('price', price)
        }
        if (centername && phone && location && price && category) {
            axios({
                method: 'post',
                url: "admin_panel/turfs/add_turfs",
                data: values,
                headers: {
                'authToken': localStorage.getItem("admintoken"),
                "Content-Type": "multipart/form-data" }
            })
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

    const handleChange = (e) => {
        setCategory(e.target.value)
    }

    const goBack = () => {
        navigate('/turfpage')
    }

    const Input = styled('input')({
        display: 'none',
    });

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
            margin: "10px auto",
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '2px'
        }
    }

    const avatarStyle = { backgroundColor: '#DD0404', margin: 7 }
    const textStyle = { margin: '6px auto' }
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
                    <Avatar style={avatarStyle} ><SportsSoccerIcon /></Avatar>
                    <h2 style={{ marginBottom: '10px', fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>ADD NEW TURF</h2>
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
                        <Box sx={{ minWidth: 120 }}   style={textStyle}>
                            <TextField
                                name='category'
                                {...register('category', {
                                    required: 'This field is required',
                                })}
                                error={!!errors?.category}
                                helperText={errors?.category ? errors.category.message : null}
                                label='Category'
                                select
                                value={category}
                                onChange={handleChange}
                                fullWidth>
                                {
                                    categories.map((data, index) => (
                                        <MenuItem key={index} value={data.category}>{data.category}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Box>
                        {/* <label htmlFor="contained-button-file">
                            <Input
                                {...register('picture', {
                                    required: 'This field is required'
                                })}
                                id="contained-button-file"
                                type='file'
                                accept="image/*"
                                multiple
                                error={!!errors?.picture}
                                helperText={errors?.picture ? errors.picture.message : null}
                            // placeholder='Choose the image'
                            // fullWidth 
                            />
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label> */}
                        <label htmlFor="contained-button-file" style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
                            <Typography>
                                Choose a file....
                            </Typography>
                            <Input 
                            accept="image/*" 
                            id="contained-button-file" 
                            multiple 
                            type="file"
                            {...register('picture', {
                                required: 'This field is required'
                            })} />
                            <Button variant="contained" component="span" size='small'>
                                Upload
                            </Button>
                        </label>
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

export default Turfadd