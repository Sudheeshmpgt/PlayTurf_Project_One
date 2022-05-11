import React, { useEffect, useState } from 'react'
import { Card, Grid, CardActions, Button, Typography, CardMedia, useTheme, useMediaQuery, Avatar } from '@mui/material'
import { Box } from '@mui/system'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import axios from '../../axiosinstance'
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

function CardFavourite() {
    const [offer, setOffer] = useState([])
    const navigate = useNavigate()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))

    const getOfferData = async () => {
        try {
            const data = await axios.get("admin_panel/offers")
            setOffer(data.data.offer)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getOfferData();
        return () => {
        }
    }, [])

    const handleClick = (id) => {
        navigate('/turfview', { state: { id: id } })
    }

    return (
        <Grid container>
            <Grid item width='83%' height={380} margin='35px auto'>
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
                    OFFERS
                </Typography>
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
                                offer.map((data, index) => (
                                    <SwiperSlide>
                                        <Box>
                                            <Card elevation={10} varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 320 }}>
                                                <Avatar elevation={10} sx={{ height: 75, width: 75, backgroundColor: 'rgba(15, 255, 79, 0.9)', mb: -7.5, ml: -2, mt: -2 }}>
                                                    <Typography fontSize={18} fontWeight={700} fontFamily='sans-serif' ml={1.5} mt={1}>
                                                        {data.offerPercent}%
                                                    </Typography>
                                                </Avatar>
                                                <CardMedia sx={{ textAlign: 'center' }}>
                                                    <img style={{ height: 190, width: 320, borderRadius: 1 }}
                                                        alt='football court'
                                                        src={data.turfDetails[0].turfPictures[0]}></img>
                                                </CardMedia>
                                                <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                    {data.turfDetails[0].centername}
                                                </Typography>
                                                <CardActions>
                                                    <Grid container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                                        <Box display='flex' justifyContent='center'>
                                                            <Typography textAlign='center' fontSize={21} fontWeight={700} color='green'>
                                                                <CurrencyRupeeIcon />{data.turfDetails[0].price - data.turfDetails[0].price * data.offerPercent / 100}
                                                            </Typography>
                                                            <Typography textAlign='center' fontSize={15} color='text.secondary' sx={{ textDecoration: 'line-through' }} >
                                                                <CurrencyRupeeIcon />{data.turfDetails[0].price}
                                                            </Typography>
                                                        </Box>
                                                        <Box m='1px auto'>
                                                            <Button onClick={() => handleClick(data.turfDetails[0]._id)} size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book Now</Button>
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
                                    offer.map((data, index) => (
                                        <SwiperSlide>
                                            <Box>
                                                <Card elevation={10} varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 310 }}>
                                                    <Avatar elevation={10} sx={{ height: 75, width: 75, backgroundColor: 'rgba(15, 255, 79, 0.9)', mb: -7.5, ml: -2, mt: -2 }}>
                                                        <Typography fontSize={18} fontWeight={700} fontFamily='sans-serif' ml={1.5} mt={1}>
                                                            {data.offerPercent}%
                                                        </Typography>
                                                    </Avatar>
                                                    <CardMedia sx={{ textAlign: 'center' }}>
                                                        <img style={{ height: 190, width: 320, borderRadius: 1 }}
                                                            alt='football court'
                                                            src={data.turfDetails[0].turfPictures[0]}></img>
                                                    </CardMedia>
                                                    <Typography variant='h3' fontSize={18} sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                        {data.turfDetails[0].centername}
                                                    </Typography>
                                                    <CardActions>
                                                        <Grid container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                                            <Box display='flex' justifyContent='center'>
                                                                <Typography textAlign='center' fontSize={18} fontWeight={700} color='green'>
                                                                    <CurrencyRupeeIcon />{data.turfDetails[0].price - data.turfDetails[0].price * data.offerPercent / 100}
                                                                </Typography>
                                                                <Typography textAlign='center' fontSize={13} color='text.secondary' sx={{ textDecoration: 'line-through' }} >
                                                                    <CurrencyRupeeIcon />{data.turfDetails[0].price}
                                                                </Typography>
                                                            </Box>
                                                            <Box m='1px auto'>
                                                                <Button onClick={() => handleClick(data.turfDetails[0]._id)} size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book Now</Button>
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
                                    offer.map((data, index) => (
                                        <SwiperSlide>
                                            <Box>
                                                <Card elevation={10} varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 325 }}>
                                                    <Avatar elevation={10} sx={{ height: 75, width: 75, backgroundColor: 'rgba(15, 255, 79, 0.9)', mb: -7.5, ml: -2, mt: -2 }}>
                                                        <Typography fontSize={18} fontWeight={700} fontFamily='sans-serif' ml={1.5} mt={1}>
                                                            {data.offerPercent}%
                                                        </Typography>
                                                    </Avatar>
                                                    <CardMedia
                                                        sx={{ textAlign: 'center' }}>
                                                        <img style={{ height: 190, width: 320, borderRadius: 1 }}
                                                            alt='football court'
                                                            src={data.turfDetails[0].turfPictures[0]}></img>
                                                    </CardMedia>

                                                    <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                        {data.turfDetails[0].centername}
                                                    </Typography>
                                                    <CardActions>
                                                        <Grid container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                                            <Box display='flex' justifyContent='center'>
                                                                <Typography textAlign='center' fontSize={21} fontWeight={700} color='green'>
                                                                    <CurrencyRupeeIcon />{data.turfDetails[0].price - data.turfDetails[0].price * data.offerPercent / 100}
                                                                </Typography>
                                                                <Typography textAlign='center' fontSize={15} color='text.secondary' sx={{ textDecoration: 'line-through' }} >
                                                                    <CurrencyRupeeIcon />{data.turfDetails[0].price}
                                                                </Typography>
                                                            </Box>
                                                            <Box m='1px auto'>
                                                                <Button onClick={() => handleClick(data.turfDetails[0]._id)} size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book Now</Button>
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

export default CardFavourite
