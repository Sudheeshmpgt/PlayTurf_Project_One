import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../Components/User/Banner'
import Cardbooking from '../Components/User/Cardbooking'
import CardFavourite from '../Components/User/Cardoffer'
import Cards from '../Components/User/Cards'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import Offerbanner from '../Components/User/Offerbanner'
import axios from '../axiosinstance'
import { UserContext } from '../Store/usercontext'

function Home() {
  const { user } = useContext(UserContext)
  const [booking, setBooking] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem("usertoken")
  const userId = localStorage.getItem("userId")

  const getBookingDetails = () => {
    const id = user ? user._id : userId
    axios.get(`booking_details/${id}`, {
      headers: {
        'authToken': localStorage.getItem("usertoken"),
      }
    })
      .then((res) => {
        const value = res.data.turf
        setBooking(value)
      })
  }

  useEffect(() => {
    const token = localStorage.getItem("usertoken")
    if (!token) {
      navigate('/')
    }
    getBookingDetails();
  }, [navigate])

  return (
    <Grid container>
      <Header />
      <Banner />
      {
        token && booking.length ? <Cardbooking /> : ''
      }
      <CardFavourite />
      <Offerbanner />
      <Cards />
      <Footer />
    </Grid>
  )
}

export default Home