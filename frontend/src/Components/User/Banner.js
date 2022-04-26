import { Grid, Paper } from '@mui/material'
import {Swiper, SwiperSlide} from 'swiper/react'
import React from 'react'
import './Banner.css'
import 'swiper/css'
import 'swiper/css/navigation'
import {Navigation} from 'swiper'
import imageOne from '../../Images/Court1.jpg'


function Banner() {
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Paper
          elevation={3}
          sx={{
            width: '83%',
            height: 350,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 2,
            borderRadius: '2px'
          }}
          // className='banner_img'
        >
        <Swiper navigation={true} modules={[Navigation]}>
        <SwiperSlide><img height='350' width='100%' alt='slide-1' src={imageOne}></img></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Banner