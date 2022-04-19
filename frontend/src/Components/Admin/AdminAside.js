import { Grid, Paper, Button, useTheme, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function AdminAside() {

    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const userSubmit=()=>{
        navigate('/userpage')
    }
    const turfSubmit = ()=>{
        navigate('/turfpage')
    }
    const categorySubmit = ()=>{
        navigate('/categorypage')
    }
    return (
        <Grid container>
            {
                !isMatch &&
                <Grid continer item xs='none' p={1}  >
                <Paper elevation={15}
                    sx={{
                        height: 575,
                        width: 275,
                        backgroundColor:'rgba(255, 255, 255, 0.8)'
                    }}>
                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'space-evenly',
                        alignItems:'flex-start',
                        padding:5,
                    }}>
                        <Box sx={{margin:'5px 0'}}>
                            <Button sx={{color:'black', fontWeight:600, fontSize:'1.1rem',fontFamily:'Open Sans,sans-serif'}}>
                                <HomeIcon sx={{marginRight:2}}/>
                                Dashboard
                            </Button>
                        </Box>
                        <Box sx={{margin:'5px 0'}}>
                            <Button onClick={turfSubmit} sx={{color:'black', fontWeight:600, fontSize:'1.1rem',fontFamily:'Open Sans,sans-serif'}}>
                                <SportsSoccerIcon sx={{marginRight:2}}/>
                                Turfs
                                </Button>
                        </Box>
                        <Box  sx={{margin:'5px 0'}}>
                            <Button sx={{color:'black', fontWeight:600, fontSize:'1.1rem',fontFamily:'Open Sans,sans-serif'}}>
                            <DateRangeIcon sx={{marginRight:2}}/>
                            Bookings
                            </Button>
                        </Box>
                        <Box  sx={{margin:'5px 0'}}>
                            <Button onClick={categorySubmit} sx={{color:'black', fontWeight:600, fontSize:'1.1rem',fontFamily:'Open Sans,sans-serif'}}>
                            <CategoryIcon sx={{marginRight:2}}/>
                            Category
                            </Button>
                        </Box>
                        <Box  sx={{margin:'5px 0'}}>
                            <Button sx={{color:'black', fontWeight:600, fontSize:'1.1rem',fontFamily:'Open Sans,sans-serif'}}>
                            <LocalOfferIcon sx={{marginRight:2}}/>
                            Offers
                            </Button>
                        </Box>
                        <Box  sx={{margin:'5px 0'}}>
                            <Button onClick={userSubmit} sx={{color:'black', fontWeight:600, fontSize:'1.1em', fontFamily:'Open Sans,sans-serif'}}>
                            <AccountCircleIcon sx={{marginRight:2}}/>
                            Users
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            }
        </Grid>
    )
}

export default AdminAside