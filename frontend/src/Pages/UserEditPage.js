import { Grid } from '@mui/material'
import React from 'react'
import Footer from '../Components/User/Footer'
import Header from '../Components/User/Header'
import UserAccountEdit from '../Components/User/UserAccountEdit'


function UserEditPage() {
  return (
    <Grid>
          <Header/>
          <UserAccountEdit/>
          <Footer/>
      </Grid>
  )
}

export default UserEditPage