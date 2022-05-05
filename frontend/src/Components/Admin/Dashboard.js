import { Box, Card, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from '../../axiosinstance'
import BarChart from './dashboard/BarChart'
import DoughnutChart from './dashboard/DoughnutChart'
import LineChart from './dashboard/LineChart'
import PieCategory from './dashboard/PieCategory'
import PieChart from './dashboard/PieChart'

function Dashboard() {
    return (
        <Box width={1045} sx={{display:'flex', flexDirection:'column', m:1}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> 
                <Box xs={12} md={6}>
                    <Card sx={{ width: 500 }} >
                        <BarChart />
                    </Card>
                </Box>
                <Box xs={12} md={6}>
                    <Card sx={{ width: 500 }}>
                        <LineChart />
                    </Card>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt:1 }} >
                <Box xs={12} md={4}>
                    <Card sx={{ width: 320, height:327 }}>
                        <PieChart />
                    </Card>
                </Box>
                <Box xs={12} md={4}>
                    <Card sx={{ width: 320, height:327  }}>
                        <DoughnutChart />
                    </Card>
                </Box>
                <Box xs={12} md={4}>
                    <Card sx={{ width: 320, height:327  }}>
                        <PieCategory />
                    </Card>
                </Box>
            </Box>
        </Box>


    )
}

export default Dashboard