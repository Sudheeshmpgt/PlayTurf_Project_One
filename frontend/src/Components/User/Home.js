import { Grid} from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Banner from './Banner'
import Cards from './Cards'
import Footer from './Footer'
import Header from './Header'

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
        <Cards/>
        <Footer/>
    </Grid>
  )
}

export default Home