import React from 'react'
import { Card, Grid, CardContent, CardActions, Button, Typography, Checkbox, Fab } from '@mui/material'
import { Box } from '@mui/system'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

function Cards() {

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
                            <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                        alt='football court'
                                        src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                </CardContent>
                                <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                    Tiger Sports
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
                    <SwiperSlide>
                    <Box>
                            <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                        alt='football court'
                                        src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                </CardContent>
                                <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                    Tiger Sports
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
                    <SwiperSlide>
                    <Box>
                            <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                        alt='football court'
                                        src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                </CardContent>
                                <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                    Tiger Sports
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
                    <SwiperSlide>
                    <Box>
                            <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                        alt='football court'
                                        src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                </CardContent>
                                <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                    Tiger Sports
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
                    <SwiperSlide>
                    <Box>
                            <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                        alt='football court'
                                        src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                </CardContent>
                                <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                    Tiger Sports
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
                    <SwiperSlide>
                    <Box>
                            <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                        alt='football court'
                                        src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                                </CardContent>
                                <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                    Tiger Sports
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
                </Swiper>
            </Grid>
        </Grid>
        //     <Grid container
        //         columnSpacing={5}
        //         maxWidth='xl'
        //         px={{ xs: 3, sm: 3 }}
        //         py={{ xs: 3, sm: 3 }}
        //         sx={{
        //             marginBottom: '5px',
        //             // margin:'30px 10px',
        //             display: 'flex',
        //             justifyContent: 'space-evenly'
        //         }}>
        //         <Grid item xs={12} md={2.4} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
        //             <Box>
        //                 <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
        //                     <CardContent sx={{ textAlign: 'center' }}>
        //                         <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
        //                             alt='football court'
        //                             src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
        //                     </CardContent>
        //                     <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
        //                         Tiger Sports
        //                     </Typography>
        //                     <CardActions>
        //                         <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //                             <Grid item >
        //                                 <Fab size='small' sx={{ marginTop: '-6px', marginLeft: 1 }}>
        //                                     <Checkbox size='large' icon={<FavoriteBorderIcon fontSize="large" />} checkedIcon={<FavoriteIcon color='error' />} />
        //                                 </Fab>
        //                             </Grid>
        //                             <Grid item>
        //                                 <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>Book</Button>
        //                             </Grid>
        //                         </Grid>
        //                     </CardActions>
        //                 </Card>
        //             </Box>
        //         </Grid>
        //         <Grid item xs={12} md={2.4} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
        //             <Box>
        //                 <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }} >
        //                     <CardContent sx={{ textAlign: 'center' }}>
        //                         <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
        //                             alt='football court'
        //                             src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
        //                     </CardContent>
        //                     <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
        //                         Tiger Sports
        //                     </Typography>
        //                     <CardActions>
        //                         <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //                             <Grid item >
        //                                 <Fab size='small' sx={{ marginTop: '-6px', marginLeft: 1 }}>
        //                                     <Checkbox size='large' icon={<FavoriteBorderIcon fontSize="large" />} checkedIcon={<FavoriteIcon color='error' />} />
        //                                 </Fab>
        //                             </Grid>
        //                             <Grid item>
        //                                 <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>Book</Button>
        //                             </Grid>
        //                         </Grid>
        //                     </CardActions>
        //                 </Card>
        //             </Box>
        //         </Grid>
        //         <Grid item xs={12} md={2.4} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
        //             <Box>
        //                 <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
        //                     <CardContent sx={{ textAlign: 'center' }}>
        //                         <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
        //                             alt='football court'
        //                             src='https://5.imimg.com/data5/UF/VO/WA/SELLER-2751211/fifa-certified-artificial-football-grass-500x500.jpg'></img>
        //                     </CardContent>
        //                     <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
        //                         Tiger Sports
        //                     </Typography>
        //                     <CardActions>
        //                         <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //                             <Grid item >
        //                                 <Fab size='small' sx={{ marginTop: '-6px', marginLeft: 1 }}>
        //                                     <Checkbox size='large' icon={<FavoriteBorderIcon fontSize="large" />} checkedIcon={<FavoriteIcon color='error' />} />
        //                                 </Fab>
        //                             </Grid>
        //                             <Grid item>
        //                                 <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>Book</Button>
        //                             </Grid>
        //                         </Grid>
        //                     </CardActions>
        //                 </Card>
        //             </Box>
        //         </Grid>
        //         <Grid item xs={12} md={2.4} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
        //             <Box>
        //                 <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
        //                     <CardContent sx={{ textAlign: 'center' }}>
        //                         <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
        //                             alt='football court'
        //                             src='https://5.imimg.com/data5/UF/VO/WA/SELLER-2751211/fifa-certified-artificial-football-grass-500x500.jpg'></img>
        //                     </CardContent>
        //                     <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
        //                         Tiger Sports
        //                     </Typography>
        //                     <CardActions>
        //                         <Grid container sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: 1 }}>
        //                             <Grid item >
        //                                 <Fab size='small' sx={{ marginTop: '-6px' }}>
        //                                     <Checkbox size='large' icon={<FavoriteBorderIcon fontSize="large" />} checkedIcon={<FavoriteIcon color='error' />} />
        //                                 </Fab>
        //                             </Grid>
        //                             <Grid item>
        //                                 <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>Book</Button>
        //                             </Grid>
        //                         </Grid>
        //                     </CardActions>
        //                 </Card>
        //             </Box>
        //         </Grid>
        //         <Grid item xs={12} md={2.4} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
        //             <Box>
        //                 <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 300 }}>
        //                     <CardContent sx={{ textAlign: 'center' }}>
        //                         <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
        //                             alt='football court'
        //                             src='https://5.imimg.com/data5/UF/VO/WA/SELLER-2751211/fifa-certified-artificial-football-grass-500x500.jpg'></img>
        //                     </CardContent>
        //                     <Typography variant='h3' sx={{ marginTop: 1, marginBottom: 1.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
        //                         Tiger Sports
        //                     </Typography>
        //                     <CardActions>
        //                         <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //                             <Grid item >
        //                                 <Fab size='small' sx={{ marginTop: '-6px', marginLeft: 1 }}>
        //                                     <Checkbox size='large' icon={<FavoriteBorderIcon fontSize="large" />} checkedIcon={<FavoriteIcon color='error' />} />
        //                                 </Fab>
        //                             </Grid>
        //                             <Grid item>
        //                                 <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5 }}>Book</Button>
        //                             </Grid>
        //                         </Grid>
        //                     </CardActions>
        //                 </Card>
        //             </Box>
        //         </Grid>
        //     </Grid>
        //     {/* </Paper> */}
        // </Grid>

    )
}

export default Cards