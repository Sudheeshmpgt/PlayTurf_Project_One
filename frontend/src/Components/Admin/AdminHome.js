import { Grid } from '@mui/material'
import React, { useEffect} from 'react'
import AdminHeader from './AdminHeader'
import { useNavigate } from 'react-router-dom';
import AdminAside from './AdminAside';



function AdminHome() {

    const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("admintoken")
    if (!token) {
        navigate('/adminlogin')
    }
    return () => {
    }
  }, [navigate])
  
  return (
    <Grid container>
      <AdminHeader />
      <AdminAside/>
    </Grid>
  )
}

export default AdminHome