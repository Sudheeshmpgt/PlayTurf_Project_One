import { Grid, Paper } from '@mui/material'
import {Swiper, SwiperSlide} from 'swiper/react'
import React,{useEffect, useState} from 'react'
import axios from '../../axiosinstance'
import './Banner.css'
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";


function Banner() {
  const [banner, setBanner] = useState([])
  const getBannerData = async () => {
    try {
        const data = await axios.get("admin_panel/banner")
        setBanner(data.data.banner)
    } catch (error) {
        alert(error)
    }
}

useEffect(() => {
    getBannerData();
    return () => {
    }
}, [])

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
        <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        autoplay={{ delay:6000}}
        className="mySwiper"
      >
        {
          banner.map((data,index)=>(
             <SwiperSlide ><img height='350' width='100%' alt='slide-1' src={data.bannerImage}></img></SwiperSlide>
          ))
        }
      </Swiper>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Banner