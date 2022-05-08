import { Grid} from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../Components/User/Banner'
import Cardbooking from '../Components/User/Cardbooking'
import CardFavourite from '../Components/User/Cardoffer'
import Cards from '../Components/User/Cards'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import Offerbanner from '../Components/User/Offerbanner'

function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem("usertoken")
  useEffect(()=>{
    const token = localStorage.getItem("usertoken")
    if(!token){
    navigate('/')
    }
  },[navigate])
  
  return (
    <Grid container>
        <Header/>
        <Banner/>
        {
          token && <Cardbooking/>
        }
        <CardFavourite/>
        <Offerbanner/>
        <Cards/>
        <Footer/>
    </Grid>
  )
}

export default Home