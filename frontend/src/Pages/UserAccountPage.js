import { Grid } from '@mui/material'
import React from 'react'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import UserAccount from '../Components/User/UserAccount'


function UserAccountPage() {
  return (
      <Grid>
          <Header/>
          <UserAccount/>
          <Footer/>
      </Grid>
    
  )
}

export default UserAccountPage