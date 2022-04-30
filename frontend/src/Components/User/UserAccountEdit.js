import React, { useContext, useEffect, useState } from 'react'
import { Button, Grid, Paper, TextField, useTheme, useMediaQuery, Avatar, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../axiosinstance'
import Swal from 'sweetalert2'
import { UserContext } from '../../Store/usercontext';

function UserAccountEdit() {
    const location = useLocation()
    const {setUser} = useContext(UserContext)
    const [image, setImage] = useState('')
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
    const [users, setUsers] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        picture: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        const id = location.state.id
        axios.get(`admin_panel/user_management/update/${id}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                setUsers(res.data.user[0])
            })
    }, [location.state.id])


    const handleChange = (e) => {
        const { name, value } = e.target
        setUsers({
            ...users,
            [name]: value
        })
    }

    const Edit = (data) => {
        const id = location.state.id
        const { name, phone, email, address } = users
        let values = new FormData();
        if (data) {
            values.append('picture', image)
            values.append('name', name)
            values.append('phone', phone)
            values.append('email', email)
            values.append('address', address)
        }
        if (name && phone && email) {
            axios.put(`admin_panel/user_management/edit_user/${id}`,values, {
                headers: {
                    'authToken': localStorage.getItem("usertoken"),
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((res) => {
                    console.log(res.data.user)
                    setUser(res.data.user)
                    const message = res.data.message;
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    navigate('/useraccount')
                })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Invalid Credetials'
            })
        }
    }

    const goBack = () => {
        navigate('/useraccount')
    }

    const changeImage = (e)=>{
        setImage(e.target.files[0])
        console.log(e.target.files[0])
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

    const avatarStyle = { margin: 15, height: 100, width: 100, }
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
                    <Avatar style={avatarStyle}><img alt='profile' src={image ? URL.createObjectURL(image) : users.userImg }></img></Avatar> 
                    <label htmlFor="icon-button-file" >
                        <Input accept="image/*" 
                        id="icon-button-file" 
                        type="file"
                            {...register('picture')}
                            onChange={changeImage}
                         />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera style={{marginLeft:'60px', marginTop:'-65px', fontSize:30}}/>
                        </IconButton>
                    </label>
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
                            value={users.name}
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
                            value={users.phone}
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
                            value={users.email}
                            error={!!errors?.email}
                            helperText={errors?.email ? errors.email.message : null}
                            label='Email'
                            placeholder='Enter Email'
                            fullWidth />
                        <TextField
                            {...register('address')}
                            style={textStyle}
                            multiline
                            name='address'
                            type='string'
                            onChange={handleChange}
                            value={users.address}
                            label='Address'
                            placeholder='Add Address'
                            fullWidth />
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

export default UserAccountEdit