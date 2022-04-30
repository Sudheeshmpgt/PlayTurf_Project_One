import React from 'react'
import {
    Avatar,
    Button, Grid,
    Paper,
    TextField,
    useMediaQuery,
    useTheme,
    IconButton
} from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Categoryadd() {

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
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

    const addCategoryOnSubmit = (data) => {
        const { category } = data
        if (category) {
            axios.post("admin_panel/category/add_category", data, {
                headers: {
                    'authToken': localStorage.getItem("admintoken"),
                }
            })
                .then((res) => {
                    const message = res.data.message
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    navigate('/categorypage')
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
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><CategoryIcon /></Avatar>
                    <h2 style={{ marginBottom: '10px', fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>ADD NEW CATEGORY</h2>
                    <form onSubmit={handleSubmit(addCategoryOnSubmit)} autoComplete='off'>
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

export default Categoryadd