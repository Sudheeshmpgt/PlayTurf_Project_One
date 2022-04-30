import React, { useContext, useEffect } from 'react'
import { Card, Grid, CardActions, Button, Typography, Checkbox, Fab, CardMedia, useTheme, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import { TurfContext } from '../../Store/turfcontext';
import axios from '../../axiosinstance'

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

function Cards() {
    const { turf, setTurf } = useContext(TurfContext)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))

    const getTurfData = async () => {
        try {
            const data = await axios.get("admin_panel/turfs")
            setTurf(data.data.turf)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getTurfData();
        return () => {
        }
    }, [])

    return (
        <Grid container>
            <Grid item width='83%' height={380} margin='35px auto'>
                <Typography fomtFamily='Atkinson Hyperlegible, sans-serif'
                    fontSize={27}
                    fontWeight={900}
                    color='secondary'
                    marginBottom={1}>
                    BOOK NOW
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
                                turf.map((data, index) => (
                                    <SwiperSlide>
                                        <Box>
                                            <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                                <CardMedia sx={{ textAlign: 'center' }}>
                                                    <img style={{ height:190, width: 320, borderRadius: 1 }}
                                                        alt='football court'
                                                        src={data.turfPictures}></img>
                                                </CardMedia>
                                                <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                    {data.centername}
                                                </Typography>
                                                <CardActions>
                                                    <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Grid item >
                                                            <Fab size='small' sx={{ marginTop: '-6px', marginLeft: 1 }}>
                                                                <Checkbox size='large' icon={<FavoriteBorderIcon fontSize="large" />} checkedIcon={<FavoriteIcon color='error' />} />
                                                            </Fab>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>Book</Button>
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
                                    turf.map((data, index) => (
                                        <SwiperSlide>
                                            <Box>
                                                <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 270 }}>
                                                    <CardMedia sx={{ textAlign: 'center' }}>
                                                        <img style={{ height: 158, width: 260, borderRadius: 1 }}
                                                            alt='football court'
                                                            src={data.turfPictures}></img>
                                                    </CardMedia>
                                                    <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                        {data.centername}
                                                    </Typography>
                                                    <CardActions>
                                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Grid item >
                                                                <Fab size='small' sx={{ marginTop: '-6px', marginLeft: 1 }}>
                                                                    <Checkbox size='large' icon={<FavoriteBorderIcon fontSize="large" />} checkedIcon={<FavoriteIcon color='error' />} />
                                                                </Fab>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>Book</Button>
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
                                    turf && turf.map((data, index) => (
                                        <SwiperSlide>
                                            <Box>
                                                <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                                    <CardMedia sx={{ textAlign: 'center' }}>
                                                        <img style={{ height: 185, width: 260, borderRadius: 1 }}
                                                            alt='football court'
                                                            src={data.turfPictures}></img>
                                                    </CardMedia>
                                                    <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                                        {data.centername}
                                                    </Typography>
                                                    <CardActions>
                                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Grid item >
                                                                <Fab size='small' sx={{ marginTop: '-6px', marginLeft: 1 }}>
                                                                    <Checkbox size='large' icon={<FavoriteBorderIcon fontSize="large" />} checkedIcon={<FavoriteIcon color='error' />} />
                                                                </Fab>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>Book</Button>
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

export default Cards