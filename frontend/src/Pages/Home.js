import { Grid} from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../Components/User/Banner'
import CardFavourite from '../Components/User/CardFavourite'
import Cards from '../Components/User/Cards'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import Offerbanner from '../Components/User/Offerbanner'

function Home() {
  const navigate = useNavigate()
 
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
        <CardFavourite/>
        <Offerbanner/>
        <Cards/>
        <Footer/>
    </Grid>
  )
}

export default Home