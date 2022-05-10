import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BarChart from './dashboard/BarChart'
import DoughnutChart from './dashboard/DoughnutChart'
import LineChart from './dashboard/LineChart'
import PieCategory from './dashboard/PieCategory'
import PieChart from './dashboard/PieChart'
import axios from '../../axiosinstance'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './User.css'

function Dashboard() {
    const [turf, setTurf] = useState([])
    const [booking, setBooking] = useState([])
    const [user, setUser] = useState([])
    const [turfCount, setTurfCount] = useState('') 
    const [userCount, setUserCount] = useState('')
    const [revenue, setRevenue] = useState('')
    console.log(turfCount, userCount, revenue)


    useEffect(() => {
        axios.get("admin_panel/turfs", {
            headers: {
                'authToken': localStorage.getItem("admintoken"),
            }
        })
            .then((res) => {
                setTurf(res.data.turf)
            })

        axios.get("/admin_panel/booking", {
            headers: {
                'authToken': localStorage.getItem("admintoken")
            }
        })
            .then((res) => {
                setBooking(res.data.booking)
            })

        axios.get("admin_panel/user_management", {
            headers: {
                'authToken': localStorage.getItem("admintoken")
            }
        })
            .then((res) => {
                setUser(res.data.user)
            })
    }, [])

    useEffect(() => {
        const turfLength = turf.length
        setTurfCount(turfLength)

        const userLength = user.length
        setUserCount(userLength)

        const amount = booking.map((data) => (data.totalPrice))
        const totalAmount = amount.reduce((acc, val) => acc + val, 0)
        setRevenue(totalAmount)

    }, [turf, booking, user])

    return (
        <Box sx={{ marginTop: '1px' }}>
            <Paper className='scrollbar-hidden'
                elevation={3}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    height: 577,
                    margin: 1,
                    width: {
                        xs: 355,
                        sm: 880,
                        md: 1055,
                    },
                    borderRadius: '1px',
                    overflow: 'scroll'
                }}>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3 }}>
                            <CardContent sx={{ backgroundColor: 'text.secondary' }}>
                                <Typography textAlign='center' color='white' fontSize='1rem' fontWeight={600}>
                                    Total Turves
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography textAlign='center' color='text.primary' fontSize='1rem' fontWeight={600} >
                                    {turfCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3 }}>
                            <CardContent sx={{ backgroundColor: 'text.secondary' }}>
                                <Typography textAlign='center' color='white' fontSize='1rem' fontWeight={600}>
                                    Total Users
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography textAlign='center' color='text.primary' fontSize='1rem' fontWeight={600} >
                                    {userCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3 }}>
                            <CardContent sx={{ backgroundColor: 'text.secondary' }}>
                                <Typography textAlign='center' color='white' fontSize='1rem' fontWeight={600}>
                                    Total Revenue
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography textAlign='center' color='text.primary' fontSize='1rem' fontWeight={600} >
                                    <CurrencyRupeeIcon />   {revenue}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ m: 5 }}>
                            <BarChart />
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Card sx={{ m: 5 }}>
                            <LineChart />
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3 }}>
                            <PieChart />
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3 }}>
                            <DoughnutChart />
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3 }}>
                            <PieCategory />
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Dashboard