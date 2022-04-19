import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, TextField, useTheme, useMediaQuery, Box, Avatar} from '@mui/material'
import { useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2'

function Categoryupdate() {

    const location = useLocation()
    const [categoryid,setCategoryId]=useState('')
    const [categories, setCategories] = useState({
        centername: '',
        location: '',
        category: ''
    })
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const navigate = useNavigate()
  
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
    
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const handleChange = (e) => {
        const { name, value } = e.target
        setCategories({
            ...categories,
            [name]: value
        })
    }

    useEffect(() => {
        const id = location.state.id
        setCategoryId(id)
        axios.get(`admin_panel/category/edit_category/${id}`)
            .then((res) => {
                setCategories(res.data.category[0])
            })
    }, [location.state.id])

    
    const Edit = () => {
        const id = categoryid
        console.log(id)
        const { centername, location, category } = categories
    
        if (centername && location && category) {
            axios.put(`admin_panel/category/edit_category/${id}`, categories)
                .then((res) => {
                    const message = res.data.message;
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    navigate('/categorypage')
                })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Invalid Credetials'
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
                            <Avatar style={avatarStyle}><EditIcon /></Avatar>
                            <h2 style={{ marginBottom: '10px' }}>Edit Turf Details</h2>
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
                                    value={categories.centername}
                                    error={!!errors?.centername}
                                    helperText={errors?.centername ? errors.centername.message : null}
                                    label='Center Name'
                                    placeholder='Enter center name'
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
                                    value={categories.location}
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
                                    value={categories.category}
                                    error={!!errors?.category}
                                    helperText={errors?.category ? errors.category.message : null}
                                    label='Category'
                                    placeholder='Enter category'
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

export default Categoryupdate