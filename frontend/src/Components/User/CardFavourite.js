import React from 'react'
import { Card, Grid, CardActions, Button, Typography, CardMedia, useTheme, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

function CardFavourite() {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))

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
                            <SwiperSlide>
                                <Box>
                                    <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 370 }}>
                                        <CardMedia sx={{ textAlign: 'center' }}>
                                            <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                alt='football court'
                                                src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                        </CardMedia>
                                        <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                            Sports Grounds
                                        </Typography>
                                        <CardActions>
                                            <Grid container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                                <Grid item >
                                                    <Typography textAlign='center' >
                                                        20% OFF on Cricket Grounds
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                </Grid>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box>
                                    <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 370 }}>
                                        <CardMedia sx={{ textAlign: 'center' }}>
                                            <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                alt='football court'
                                                src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                        </CardMedia>
                                        <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                            Sports Grounds
                                        </Typography>
                                        <CardActions>
                                            <Grid container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                                <Grid item >
                                                    <Typography textAlign='center' >
                                                        20% OFF on Cricket Grounds
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                </Grid>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box>
                                    <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 370 }}>
                                        <CardMedia sx={{ textAlign: 'center' }}>
                                            <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                alt='football court'
                                                src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                        </CardMedia>
                                        <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                            Sports Grounds
                                        </Typography>
                                        <CardActions>
                                            <Grid container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                                <Grid item >
                                                    <Typography textAlign='center' >
                                                        20% OFF on Cricket Grounds
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                </Grid>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                </Box>
                            </SwiperSlide>
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
                                <SwiperSlide>
                                    <Box>
                                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                            <CardMedia sx={{ textAlign: 'center' }}>
                                                <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                    alt='football court'
                                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                            </CardMedia>
                                            <Typography variant='h3' fontSize={18} sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                Sports Grounds
                                            </Typography>
                                            <CardActions>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Grid item >
                                                        <Typography textAlign='center' fontSize={15} >
                                                            20% OFF on Cricket Grounds
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box>
                                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                            <CardMedia sx={{ textAlign: 'center' }}>
                                                <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                    alt='football court'
                                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                            </CardMedia>
                                            <Typography variant='h3' fontSize={18} sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                Sports Grounds
                                            </Typography>
                                            <CardActions>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Grid item >
                                                        <Typography textAlign='center' fontSize={15} >
                                                            20% OFF on Cricket Grounds
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box>
                                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                            <CardMedia sx={{ textAlign: 'center' }}>
                                                <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                    alt='football court'
                                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                            </CardMedia>
                                            <Typography variant='h3' fontSize={18} sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                Sports Grounds
                                            </Typography>
                                            <CardActions>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Grid item >
                                                        <Typography textAlign='center' fontSize={15} >
                                                            20% OFF on Cricket Grounds
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box>
                                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                            <CardMedia sx={{ textAlign: 'center' }}>
                                                <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                    alt='football court'
                                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                            </CardMedia>
                                            <Typography variant='h3' fontSize={18} sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                Sports Grounds
                                            </Typography>
                                            <CardActions>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Grid item >
                                                        <Typography textAlign='center' fontSize={15} >
                                                            20% OFF on Cricket Grounds
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
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
                                <SwiperSlide>
                                    <Box>
                                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                                            <CardMedia sx={{ textAlign: 'center' }}>
                                                <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                    alt='football court'
                                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                            </CardMedia>
                                            <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                Sports Grounds
                                            </Typography>
                                            <CardActions>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Grid item >
                                                        <Typography textAlign='center' >
                                                            20% OFF on Cricket Grounds
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box>
                                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                                            <CardMedia sx={{ textAlign: 'center' }}>
                                                <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                    alt='football court'
                                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                            </CardMedia>
                                            <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                Sports Grounds
                                            </Typography>
                                            <CardActions>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Grid item >
                                                        <Typography textAlign='center' >
                                                            20% OFF on Cricket Grounds
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box>
                                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                                            <CardMedia sx={{ textAlign: 'center' }}>
                                                <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                    alt='football court'
                                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                            </CardMedia>
                                            <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                Sports Grounds
                                            </Typography>
                                            <CardActions>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Grid item >
                                                        <Typography textAlign='center' >
                                                            20% OFF on Cricket Grounds
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box>
                                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                                            <CardMedia sx={{ textAlign: 'center' }}>
                                                <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                    alt='football court'
                                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                            </CardMedia>
                                            <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                Sports Grounds
                                            </Typography>
                                            <CardActions>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Grid item >
                                                        <Typography textAlign='center' >
                                                            20% OFF on Cricket Grounds
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box>
                                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                                            <CardMedia sx={{ textAlign: 'center' }}>
                                                <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                    alt='football court'
                                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                            </CardMedia>
                                            <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                Sports Grounds
                                            </Typography>
                                            <CardActions>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Grid item >
                                                        <Typography textAlign='center' >
                                                            20% OFF on Cricket Grounds
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box>
                                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                                            <CardMedia sx={{ textAlign: 'center' }}>
                                                <img style={{ height: '100%', width: '100%', borderRadius: 1 }}
                                                    alt='football court'
                                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                            </CardMedia>
                                            <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                Sports Grounds
                                            </Typography>
                                            <CardActions>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Grid item >
                                                        <Typography textAlign='center' >
                                                            20% OFF on Cricket Grounds
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop: 1 }}>Book</Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
                            </Swiper>
                        )
                    )
                }
            </Grid>


            {/* 
            <Typography
                component='Box'
            >
                <h1 style={{ marginTop: '20px', marginLeft: '30px', color: '#FF5A09', fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>
                    OFFERS
                </h1>
            </Typography>
            <Grid container
                columnSpacing={5}
                maxWidth='xl'
                px={{ xs: 3, sm: 3 }}
                py={{ xs: 3, sm: 3 }}
                sx={{
                    marginBottom: '5px',
                    margin:'65px',
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}>
                <Grid item xs={12} md={3} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
                    <Box>
                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                    alt='football court'
                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                            </CardContent>
                            <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                             Sports Grounds
                            </Typography>
                            <CardActions>
                                <Grid container sx={{ display: 'flex',justifyContent: 'center' }}>
                                    <Grid item >
                                       <Typography textAlign= 'center' >
                                           20% OFF on Cricket Grounds
                                       </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop:1 }}>Book</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
                    <Box>
                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }} >
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                    alt='football court'
                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                            </CardContent>
                            <Typography variant='h3' sx={{ marginTop: 0.1, marginBottom: 0.1, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                Tiger Sports
                            </Typography>
                            <CardActions>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item >
                                    <Typography textAlign='center'>
                                           10% Off on football accessories
                                       </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop:1 }}>Book</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
                    <Box>
                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                    alt='football court'
                                    src='https://5.imimg.com/data5/UF/VO/WA/SELLER-2751211/fifa-certified-artificial-football-grass-500x500.jpg'></img>
                            </CardContent>
                            <Typography variant='h3' sx={{ marginTop: 0.1, marginBottom: 0.1, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                Sports arena
                            </Typography>
                            <CardActions>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item >
                                    <Typography textAlign='center'>
                                           15% Off on football accessories
                                       </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5,  marginTop:1 }}>Book</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
                    <Box>
                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }} >
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                    alt='football court'
                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                            </CardContent>
                            <Typography variant='h3' sx={{ marginTop: 0.1, marginBottom: 0.1, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                Tiger Sports
                            </Typography>
                            <CardActions>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item >
                                    <Typography textAlign='center'>
                                           10% Off on football accessories
                                       </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop:1 }}>Book</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid> */}
            {/* <Grid item xs={12} md={3} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
                    <Box>
                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                    alt='football court'
                                    src='https://5.imimg.com/data5/UF/VO/WA/SELLER-2751211/fifa-certified-artificial-football-grass-500x500.jpg'></img>
                            </CardContent>
                            <Typography variant='h3' sx={{ marginTop: 0.1, marginBottom: 0.1, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                Sports arena
                            </Typography>
                            <CardActions>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item >
                                    <Typography textAlign='center'>
                                           15% Off on football accessories
                                       </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5,  marginTop:1 }}>Book</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid> */}
            {/* </Grid> */}
            {/* </Paper> */}
        </Grid>

    )
}

export default CardFavourite
