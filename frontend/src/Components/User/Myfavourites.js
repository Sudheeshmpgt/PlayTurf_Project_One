import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material'
import axios from '../../axiosinstance'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import imageOne from '../../Images/Soccer.gif'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

function Myfavourites() {
    const [favourite, setFavourite] = useState([])
    const length = favourite.length
    const userId = localStorage.getItem("userId")
    const navigate = useNavigate()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))


    useEffect(() => {
        axios.get(`get_favourites/${userId}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                setFavourite(res.data.turf)
            })
        return () => {
        }
    }, [])

    const handleClick = (id) => {
        navigate('/turfview', { state: { id: id } })
    }

    const handleRemoveClick = (id) => {
        const data = {
            turfId: id,
            userId: userId
        }
        axios.post(`addfavourites`, data, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                setFavourite(res.data.turf)
            })
    }

    return (
        <Grid container >
            {
                length === 0 ? (

                    <Card sx={{ margin: '30px auto' }}>
                        <CardContent>
                            <Typography
                                textAlign='center'
                                color='text.secondary'
                                fontSize={22}
                                fontFamily='Open Sans,sans-serif'
                                fontWeight={900}>
                                You Have No Favourites Yet!!
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component='img'
                            image={imageOne}
                        />
                    </Card>
                ) :
                    (
                        <Grid item width='83%' height={400} margin='35px auto'>
                            {
                                isSmall ? (
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={30}
                                        freeMode={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[FreeMode, Pagination]}
                                        className="mySwiper"
                                    >
                                        {
                                            favourite.map((data, index) => (
                                                <SwiperSlide>
                                                    <Box sx={{ height: 535 }}>
                                                        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 390 }}>
                                                            <CardMedia style={{ height: 225, width: 360, borderRadius: 1 }} component='img' image={data.turfDetails[0].turfPictures[0]}>
                                                            </CardMedia>
                                                            <CardContent>
                                                                <Typography
                                                                    color='secondary'
                                                                    fontFamily='Atkinson Hyperlegible, sans-serif'
                                                                    fontSize='1.6rem'
                                                                    textAlign='center'
                                                                >
                                                                    {data.turfDetails[0].centername}
                                                                </Typography>
                                                                <Typography fontFamily='Open Sans,sans-serif' fontSize={18} fontWeight={600} textAlign='center' color='text.secondary'>
                                                                    {data.turfDetails[0].category} / {data.turfDetails[0].location} / Rs.{data.turfDetails[0].price}
                                                                </Typography>
                                                            </CardContent>
                                                            <CardActions >
                                                                <Box width='100%' sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                                                    <Box>
                                                                        <Button variant='contained' onClick={() => handleRemoveClick(data.turfDetails[0]._id)} >
                                                                            Remove
                                                                        </Button>
                                                                    </Box>
                                                                    <Box>
                                                                        <Button variant='contained' color='secondary' onClick={() => handleClick(data.turfDetails[0]._id)} >
                                                                            Book Now
                                                                        </Button>
                                                                    </Box>
                                                                </Box>
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
                                        slidesPerView={2}
                                        spaceBetween={30}
                                        freeMode={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[FreeMode, Pagination]}
                                        className="mySwiper"
                                    >
                                        {
                                            favourite.map((data, index) => (
                                                <SwiperSlide>
                                                    <Box sx={{ height: 535 }}>
                                                        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 390 }}>
                                                            <CardMedia style={{ height: 225, width: 360, borderRadius: 1 }} component='img' image={data.turfDetails[0].turfPictures[0]}>
                                                            </CardMedia>
                                                            <CardContent>
                                                                <Typography
                                                                    color='secondary'
                                                                    fontFamily='Atkinson Hyperlegible, sans-serif'
                                                                    fontSize='1.6rem'
                                                                    textAlign='center'
                                                                >
                                                                    {data.turfDetails[0].centername}
                                                                </Typography>
                                                                <Typography fontFamily='Open Sans,sans-serif' fontSize={18} fontWeight={600} textAlign='center' color='text.secondary'>
                                                                    {data.turfDetails[0].category} / {data.turfDetails[0].location} / Rs.{data.turfDetails[0].price}
                                                                </Typography>
                                                            </CardContent>
                                                            <CardActions >
                                                                <Box width='100%' sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                                                    <Box>
                                                                        <Button variant='contained' onClick={() => handleRemoveClick(data.turfDetails[0]._id)} >
                                                                            Remove
                                                                        </Button>
                                                                    </Box>
                                                                    <Box>
                                                                        <Button variant='contained' color='secondary' onClick={() => handleClick(data.turfDetails[0]._id)} >
                                                                            Book Now
                                                                        </Button>
                                                                    </Box>
                                                                </Box>
                                                            </CardActions>
                                                        </Card>
                                                    </Box>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                    ): (
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
                                            favourite.map((data, index) => (
                                                <SwiperSlide>
                                                    <Box sx={{ height: 535 }}>
                                                        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 390 }}>
                                                            <CardMedia style={{ height: 225, width: 360, borderRadius: 1 }} component='img' image={data.turfDetails[0].turfPictures[0]}>
                                                            </CardMedia>
                                                            <CardContent>
                                                                <Typography
                                                                    color='secondary'
                                                                    fontFamily='Atkinson Hyperlegible, sans-serif'
                                                                    fontSize='1.6rem'
                                                                    textAlign='center'
                                                                >
                                                                    {data.turfDetails[0].centername}
                                                                </Typography>
                                                                <Typography fontFamily='Open Sans,sans-serif' fontSize={18} fontWeight={600} textAlign='center' color='text.secondary'>
                                                                    {data.turfDetails[0].category} / {data.turfDetails[0].location} / Rs.{data.turfDetails[0].price}
                                                                </Typography>
                                                            </CardContent>
                                                            <CardActions >
                                                                <Box width='100%' sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                                                    <Box>
                                                                        <Button variant='contained' onClick={() => handleRemoveClick(data.turfDetails[0]._id)} >
                                                                            Remove
                                                                        </Button>
                                                                    </Box>
                                                                    <Box>
                                                                        <Button variant='contained' color='secondary' onClick={() => handleClick(data.turfDetails[0]._id)} >
                                                                            Book Now
                                                                        </Button>
                                                                    </Box>
                                                                </Box>
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
                    )
            }
        </Grid >
    )
}

export default Myfavourites