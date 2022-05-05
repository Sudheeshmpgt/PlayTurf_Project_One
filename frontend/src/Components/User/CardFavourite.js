import React, { useEffect, useState } from 'react'
import { Card, Grid, CardActions, Button, Typography, CardMedia, useTheme, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import axios from '../../axiosinstance'
import { useNavigate } from 'react-router-dom';
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
                    fontSize={27}
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
                                            <Card elevation={10} varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 370 }}>
                                                <CardMedia sx={{ textAlign: 'center' }}>
                                                    <img style={{ height: 190, width: 320, borderRadius: 1 }}
                                                        alt='football court'
                                                        src={data.turfDetails[0].turfPictures[0]}></img>
                                                </CardMedia>
                                                <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                    {data.turfDetails[0].centername}
                                                </Typography>
                                                <CardActions>
                                                    <Grid container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                                        <Grid item >
                                                            <Typography textAlign='center' >
                                                                {`${data.offerPercent}% OFF on ${data.turfDetails[0].category} grounds`}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button onClick={()=>handleClick(data.turfDetails[0]._id)} size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                        </Grid>
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
                                                <Card elevation={10} varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '7px', height: 300 }}>
                                                    <CardMedia sx={{ textAlign: 'center' }}>
                                                        <img style={{ height: 190, width: 320, borderRadius: 1 }}
                                                            alt='football court'
                                                            src={data.turfDetails[0].turfPictures[0]}></img>
                                                    </CardMedia>
                                                    <Typography variant='h3' fontSize={18} sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                        {data.turfDetails[0].centername}
                                                    </Typography>
                                                    <CardActions>
                                                        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Grid item >
                                                                <Typography textAlign='center' fontSize={15} >
                                                                    {`${data.offerPercent}% OFF on ${data.turfDetails[0].category} grounds`}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button onClick={()=>handleClick(data.turfDetails[0]._id)} size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                            </Grid>
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
                                                        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Grid item >
                                                                <Typography textAlign='center' >
                                                                    {`${data.offerPercent}% OFF on ${data.turfDetails[0].category} grounds`}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button onClick={()=>handleClick(data.turfDetails[0]._id)} size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                            </Grid>
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
