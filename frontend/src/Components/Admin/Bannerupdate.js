import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, TextField, useTheme, useMediaQuery, Avatar, IconButton, Box, Input } from '@mui/material'
import { useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2'

function Bannerupdate() {

    const location = useLocation()
    const [image, setImage] = useState('')
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
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const [banner, setBanner] = useState({
        description: '',
        picture: ''
    })
    const [bannerid, setBannerId] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const id = location.state.id
        setBannerId(id)
        axios.get(`admin_panel/banner/edit_banner/${id}`)
            .then((res) => {
                setBanner(res.data.banner[0])
            })
    }, [location.state.id])


    const handleChange = (e) => {
        const { name, value } = e.target
        setBanner({
            ...banner,
            [name]: value
        })
    }

    const Edit = (data) => {
        const id = bannerid
        const { description } = banner
        let values = new FormData();
        if (data) {
            values.append('picture', image)
            values.append('description', description)
        }
        axios.put(`admin_panel/banner/edit_banner/${id}`, values, { "Content-Type": "multipart/form-data" })
            .then((res) => {
                const message = res.data.message;
                Toast.fire({
                    icon: 'success',
                    title: message
                })
                navigate('/bannerpage')
            }).catch(e => {
                Toast.fire({
                    icon: 'error',
                    title: 'Invalid Credetials'
                })
            })
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
            margin: "10px auto",
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '1px'
        }
    } else {
        paperStyle = {
            padding: 20,
            height: 'auto',
            width: 500,
            margin: "10px auto",
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
                    {...register('description', {
                        required: 'This field is required',
                    })}
                    style={textStyle}
                    name='description'
                    type='string'
                    onChange={handleChange}
                    value={banner.description}
                    error={!!errors?.description}
                    helperText={errors?.description ? errors.description.message : null}
                    label='Description'
                    placeholder='Add description'
                    fullWidth />
                <Box display='flex' flexDirection='column' alignItems='flex-start'>
                    <Box height={100} width={150} border={1} marginTop={1}>
                        <img height={100} width={150} src={image ? URL.createObjectURL(image) : banner.bannerImage }></img>
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

export default Bannerupdate