import React, { useContext, useEffect, useState } from 'react'
import { Card, Grid, CardActions, Button, Typography, CardMedia, useTheme, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import axios from '../../axiosinstance'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Store/usercontext';
import moment from 'moment'

function Cardbooking() {
    const { user } = useContext(UserContext)
    const [bookingData, setBookingData] = useState([])
    const navigate = useNavigate()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))
    const userId = localStorage.getItem("userId")
    const nowDate = moment().format('DD-MM-YYYY')

    const getBookingDetails = () => {
        const id = user ? user._id : userId
        axios.get(`booking_details/${id}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                const value = res.data.turf
                setBookingData(value)
            })
    }

    useEffect(() => {
        getBookingDetails();
    }, [])

    const handleClick = (id) => {
        localStorage.setItem("bookingId", id)
        navigate('/preview')
    }

    return (
        <Grid container>
            <Grid item width='83%' height={310} margin='35px auto'>
                <Typography fomtFamily='Atkinson Hyperlegible, sans-serif'
                    sx={{
                        fontSize:{
                            xs:'1rem',
                            md:'1.6rem'
                        }
                    }}
                    fontWeight={900}
                    color='secondary'
                    marginBottom={1}>
                    UPCOMMING BOOKINGS
                </Typography>
                {
                    isSmall ? (
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            freeMode={true}
                            pagination={{
                                clickable: true
                            }}
                            modules={[FreeMode, Pagination]}
                            className="mySwiper"
                        >

                            {
                                bookingData && bookingData.filter((data) => {
                                    if (!moment(data.date).isBefore(nowDate) && data.status !== 'Cancelled') {
                                        return data
                                    }
                                })
                                    .map((data, index) => (
                                        <SwiperSlide>
                                            <Box height={335}>
                                                <Card elevation={10} varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 300 }}>
                                                    <CardMedia sx={{ textAlign: 'center' }}>
                                                        <img style={{ height: 155, width: 320, borderRadius: 1 }}
                                                            alt='football court'
                                                            src={data.turfDetails[0].turfPictures}></img>
                                                    </CardMedia>
                                                    <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                        {data.turfDetails[0].centername}
                                                    </Typography>
                                                    <Typography>
                                                        <CalendarTodayIcon sx={{ mr: 1, ml: 1 }} />
                                                        {data.date}
                                                    </Typography>
                                                    <Typography>
                                                        <AccessTimeIcon sx={{ mr: 1, ml: 1 }} />
                                                        {data.startTime} to {data.endTime}
                                                    </Typography>
                                                    <CardActions>
                                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Box m='0 auto'>
                                                                <Button onClick={() => handleClick(data._id)} size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>View</Button>
                                                            </Box>
                                                        </Grid>
                                                    </CardActions>
                                                </Card>
                                            </Box>
                                        </SwiperSlide>
                                    ))
                            }
                        </Swiper>
                    ) : (
                        isMedium ? (
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[FreeMode, Pagination]}
                                className="mySwiper"
                            >

                                {
                                    bookingData && bookingData.filter((data) => {
                                        if (!moment(data.date).isBefore(nowDate) && data.status !== 'Cancelled') {
                                            return data
                                        }
                                    })
                                        .map((data, index) => (
                                            <SwiperSlide>
                                                <Box height={335}>
                                                    <Card elevation={10} varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 300 }}>
                                                        <CardMedia sx={{ textAlign: 'center' }}>
                                                            <img style={{ height: 150, width: 260, borderRadius: 1 }}
                                                                alt='football court'
                                                                src={data.turfDetails[0].turfPictures}></img>
                                                        </CardMedia>
                                                        <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                            {data.turfDetails[0].centername}
                                                        </Typography>
                                                        <Typography>
                                                            <CalendarTodayIcon sx={{ mr: 1, ml: 1 }} />
                                                            {data.date}
                                                        </Typography>
                                                        <Typography>
                                                            <AccessTimeIcon sx={{ mr: 1, ml: 1 }} />
                                                            {data.startTime} to {data.endTime}
                                                        </Typography>
                                                        <CardActions>
                                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <Box m='0 auto'>
                                                                    <Button onClick={() => handleClick(data._id)} size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>View</Button>
                                                                </Box>
                                                            </Grid>
                                                        </CardActions>
                                                    </Card>
                                                </Box>
                                            </SwiperSlide>
                                        ))
                                }
                            </Swiper>
                        ) : (
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={30}
                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[FreeMode, Pagination]}
                                className="mySwiper"
                            >

                                {
                                    bookingData && bookingData.filter((data) => {
                                        if (!moment(data.date).isBefore(nowDate) && data.status !== 'Cancelled') {
                                            return data
                                        }
                                    })
                                        .map((data, index) => (
                                            <SwiperSlide>
                                                <Box sx={{ height: 335 }}>
                                                    <Card elevation={10} varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 300 }}>
                                                        <CardMedia sx={{ textAlign: 'center' }}>
                                                            <img style={{ height: 150, width: 260, borderRadius: 1 }}
                                                                alt='football court'
                                                                src={data.turfDetails[0].turfPictures}></img>
                                                        </CardMedia>
                                                        <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 600 }}>
                                                            {data.turfDetails[0].centername}
                                                        </Typography>
                                                        <Typography>
                                                            <CalendarTodayIcon sx={{ mr: 1, ml: 1 }} />
                                                            {data.date}
                                                        </Typography>
                                                        <Typography>
                                                            <AccessTimeIcon sx={{ mr: 1, ml: 1 }} />
                                                            {data.startTime} to {data.endTime}
                                                        </Typography>
                                                        <CardActions>
                                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <Box m='0 auto'>
                                                                    <Button onClick={() => handleClick(data._id)} size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>View</Button>
                                                                </Box>
                                                            </Grid>
                                                        </CardActions>
                                                    </Card>
                                                </Box>
                                            </SwiperSlide>
                                        ))
                                }
                            </Swiper>
                        )
                    )
                }

            </Grid>
        </Grid>
    )
}

export default Cardbooking