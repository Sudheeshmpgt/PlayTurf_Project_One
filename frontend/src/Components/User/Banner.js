import { Grid, Paper, useTheme, useMediaQuery, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import React, { useEffect, useState } from 'react'
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
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

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
      {
        isSmall ? (
          <Grid item xs={12} md={12}>
            <Paper
              elevation={3}
              sx={{
                width: '83%',
                height: 200,
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
                autoplay={{ delay: 6000 }}
                className="mySwiper"
              >
                {
                  banner && banner.map((data, index) => (
                    <SwiperSlide ><img height='200' width='100%' alt='slide-1' src={data.bannerImage}></img>
                    <Typography
                        fontFamily='Open Sans,sans-serif'
                        fontWeight={900}
                        sx={{
                          fontSize:{
                            xs:'1rem',
                            md:'2rem'
                          }
                        }}
                        style={{
                          position: 'absolute', 
                          color: 'white', 
                          bottom:'40%', 
                          left: '50%', 
                          transform: 'translateX(-50%)'
                        }}>
                          {data.description}
                        </Typography>
                        <Typography
                        fontFamily='Atkinson Hyperlegible, sans-serif'
                        fontWeight={900}
                        sx={{
                          fontSize:{
                            xs:'0.5rem',
                            md:'1.4rem'
                          }
                        }}
                        style={{
                          position: 'absolute', 
                          color: 'white', 
                          bottom:'11%', 
                          left: '70%',  
                          transform: 'translateX(-50%)'
                        }}>
                          BOOK YOUR SLOT NOW.
                        </Typography>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </Paper>
          </Grid>
        ) : (
          isMedium ? (
            <Grid item xs={12} md={12}>
              <Paper
                elevation={3}
                sx={{
                  width: '83%',
                  height: 300,
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
                  autoplay={{ delay: 6000 }}
                  className="mySwiper"
                >
                  {
                    banner && banner.map((data, index) => (
                      <SwiperSlide ><img height='300' width='100%' alt='slide-1' src={data.bannerImage}></img>
                      <Typography
                        fontFamily='Open Sans,sans-serif'
                        fontWeight={900}
                        sx={{
                          fontSize:{
                            xs:'1rem',
                            sm:'1.4rem'
                          }
                        }}
                        style={{
                          position: 'absolute', 
                          color: 'white', 
                          bottom:'40%', 
                          left: '50%', 
                          transform: 'translateX(-50%)'
                        }}>
                          {data.description}
                        </Typography>
                        <Typography
                        fontFamily='Atkinson Hyperlegible, sans-serif'
                        fontWeight={600}
                        color='black'
                        sx={{
                          fontSize:{
                            xs:'0.5rem',
                            sm:'0.9rem'
                          }
                        }}
                        style={{
                          position: 'absolute', 
                          bottom:'10%', 
                          left: '76%', 
                          transform: 'translateX(-50%)'
                        }}>
                          BOOK YOUR SLOT NOW.
                        </Typography>
                        </SwiperSlide>
                    ))
                  }
                </Swiper>
              </Paper>
            </Grid>
          ) : (
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
              >
                <Swiper
                  spaceBetween={30}
                  effect={"fade"}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[EffectFade, Navigation, Pagination, Autoplay]}
                  autoplay={{ delay: 6000 }}
                  className="mySwiper"
                >
                  {
                    banner && banner.map((data, index) => (
                      <SwiperSlide >
                        <img 
                        height='350' 
                        width='100%' 
                        alt='slide-1' 
                        src={data.bannerImage}>
                        </img>
                        <Typography
                        fontFamily='Open Sans,sans-serif'
                        fontWeight={900}
                        sx={{
                          fontSize:{
                            xs:'1rem',
                            md:'2rem'
                          }
                        }}
                        style={{
                          position: 'absolute', 
                          color: 'white', 
                          bottom:'40%', 
                          left: '50%', 
                          transform: 'translateX(-50%)'
                        }}>
                          {data.description}
                        </Typography>
                        <Typography
                        fontFamily='Atkinson Hyperlegible, sans-serif'
                        fontWeight={900}
                        sx={{
                          fontSize:{
                            xs:'0.5rem',
                            md:'1.4rem'
                          }
                        }}
                        style={{
                          position: 'absolute', 
                          color: 'black', 
                          bottom:'10%', 
                          left: '76%', 
                          transform: 'translateX(-50%)'
                        }}>
                          BOOK YOUR SLOT NOW.
                        </Typography>
                        </SwiperSlide>
                    ))
                  }
                </Swiper>
              </Paper>
            </Grid>
          )
        )
      }

    </Grid>
  )
}

export default Banner