import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, TextField, useTheme, useMediaQuery, Avatar, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2'

function Categoryupdate() {

    const location = useLocation()
    const [categoryid, setCategoryId] = useState('')
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
        width: '400px',
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
        axios.get(`admin_panel/category/edit_category/${id}`, {
            headers: {
                'authToken': localStorage.getItem("admintoken"),
            }
        })
            .then((res) => {
                setCategories(res.data.category[0])
            })
    }, [location.state.id])


    const Edit = () => {
        const id = categoryid
        const { centername, location, category } = categories

        if (centername && location && category) {
            axios.put(`admin_panel/category/edit_category/${id}`, categories, {
                headers: {
                    'authToken': localStorage.getItem("admintoken"),
                }
            })
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

    const goBack = () => {
        navigate('/categorypage')
    }

    let paperStyle
    if (isMatch) {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 280,
            margin: "50px auto",
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '1px'
        }
    } else {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 500,
            margin: "50px auto",
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
                    sx={{
                        marginTop: '10%',
                        color: 'white'
                    }}>
                    <ArrowBackIcon /> Go Back
                </IconButton>
            </Grid>
            <Paper elevation={3} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><EditIcon /></Avatar>
                    <h2 style={{ marginBottom: '10px', fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>Edit Turf Details</h2>
                    <form onSubmit={handleSubmit(Edit)} autoComplete='off'>
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

        </Grid >
    )
}

export default Categoryupdate