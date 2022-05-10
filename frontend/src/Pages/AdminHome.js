import { Grid, Box } from '@mui/material'
import React, { useEffect} from 'react'
import AdminHeader from '../Components/Admin/AdminHeader'
import { useNavigate } from 'react-router-dom';
import AdminAside from '../Components/Admin/AdminAside';
import Dashboard from '../Components/Admin/Dashboard';

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
      <Grid item sx={{display: 'flex',}}>
            <Box>
                <AdminAside />
            </Box>
            <Box>
                <Dashboard />
            </Box>
        </Grid>  
    </Grid>
  )
}

export default AdminHome