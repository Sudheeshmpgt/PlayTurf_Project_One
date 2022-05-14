import React, { useState } from 'react'
import {
    Avatar,
    Button, Grid,
    Paper,
    TextField,
    useMediaQuery,
    useTheme,
    IconButton,
    Box,
    Input
} from '@mui/material'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Banneradd() {

    const [image, setImage] = useState('')
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

    const addBannerOnSubmit = (data) => {
        const { description } = data
        let values = new FormData();
        if (data) {
            values.append('picture', image)
            values.append('description', description)
        }
        if (data) {
            axios.post("admin_panel/banner/add_banner", values, {
                headers: {
                    'authToken': localStorage.getItem("admintoken"),
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((res) => {
                    const message = res.data.message
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    navigate('/bannerpage')
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
        navigate('/bannerpage')
    }

    const changeImage = (e)=>{
        setImage(e.target.files[0])
    }

    let paperStyle
    if (isMatch) {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 280,
            margin: "75px auto",
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
                    <Avatar style={avatarStyle}><ViewCarouselIcon /></Avatar>
                    <h2 style={{ marginBottom: '10px', fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>ADD NEW BANNER</h2>
                    <form onSubmit={handleSubmit(addBannerOnSubmit)} autoComplete='off'>
                    <TextField
                            style={textStyle}
                            name='description'
                            type='string'
                            {...register('description', {
                                required: 'This field is required'
                            })}
                            error={!!errors?.description}
                            helperText={errors?.description ? errors.description.message : null}
                            label='Description'
                            placeholder='Add description'
                            fullWidth 
                            multiline/>
                        <Box display='flex' flexDirection='column' alignItems='flex-start'>
                            <Box height={100} width={150} border={1} marginTop={1}>
                                <img height={100} width={150} src={image ? URL.createObjectURL(image) :''}></img>
                            </Box>
                            <label htmlFor="contained-button-file">
                                <Input
                                    {...register('picture')}
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple type="file"
                                    style={{ display: 'none' }}
                                    onChange={changeImage}
                                />
                                <Button variant="contained" component="span" sx={{ marginTop: 1 }} >
                                    Upload
                                </Button>
                            </label>
                        </Box>
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

export default Banneradd