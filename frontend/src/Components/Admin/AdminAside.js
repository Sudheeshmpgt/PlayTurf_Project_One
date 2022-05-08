import { Grid, Paper, Button, useTheme, useMediaQuery, Menu, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function AdminAside() {

    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const userSubmit = () => {
        navigate('/userpage')
    }
    const turfSubmit = () => {
        navigate('/turfpage')
    }
    const categorySubmit = () => {
        navigate('/categorypage')
    }
    const bannerSubmit = () => {
        navigate('/bannerpage')
    }
    const BookingSubmit = () => {
        navigate('/adminbookingpage')
    }
    const offerSubmit = () => {
        handleClose();
        navigate('/offerpage')
    }
    const dashboardSubmit = () => {
        navigate('/dashboard')
    }
    const couponSubmit = () => {
        handleClose();
        navigate('/couponpage')
    }

    return (
        <Grid container>
            {
                !isMatch &&
                <Grid continer item xs='none' p={1}  >
                    <Paper elevation={1}
                        sx={{
                            height: 577,
                            width: 275,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '2px'
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                alignItems: 'flex-start',
                                padding: 5,
                            }}>
                            <Box sx={{ margin: '5px 0' }}>
                                <Button onClick={dashboardSubmit} sx={{ color: 'black', fontWeight: 600, fontSize: '1.1rem', fontFamily: 'Open Sans,sans-serif' }}>
                                    <HomeIcon sx={{ marginRight: 2 }} />
                                    Dashboard
                                </Button>
                            </Box>
                            <Box sx={{ margin: '5px 0' }}>
                                <Button onClick={turfSubmit} sx={{ color: 'black', fontWeight: 600, fontSize: '1.1rem', fontFamily: 'Open Sans,sans-serif' }}>
                                    <SportsSoccerIcon sx={{ marginRight: 2 }} />
                                    Turfs
                                </Button>
                            </Box>
                            <Box sx={{ margin: '5px 0' }}>
                                <Button onClick={BookingSubmit} sx={{ color: 'black', fontWeight: 600, fontSize: '1.1rem', fontFamily: 'Open Sans,sans-serif' }}>
                                    <DateRangeIcon sx={{ marginRight: 2 }} />
                                    Bookings
                                </Button>
                            </Box>
                            <Box sx={{ margin: '5px 0' }}>
                                <Button onClick={categorySubmit} sx={{ color: 'black', fontWeight: 600, fontSize: '1.1rem', fontFamily: 'Open Sans,sans-serif' }}>
                                    <CategoryIcon sx={{ marginRight: 2 }} />
                                    Category
                                </Button>
                            </Box>
                            <Box sx={{ margin: '5px 0' }}>
                                {/* <Button onClick={offerSubmit} sx={{color:'black', fontWeight:600, fontSize:'1.1rem',fontFamily:'Open Sans,sans-serif'}}>
                            <LocalOfferIcon sx={{marginRight:2}}/>
                            Offers
                            </Button> */}
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    sx={{
                                        color:'black', 
                                        fontWeight:600, 
                                        fontSize:'1.1rem',
                                        fontFamily:'Open Sans,sans-serif'}}
                                >
                                  <LocalOfferIcon sx={{marginRight:2}}/>  Offers 
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={offerSubmit}>Offer Details</MenuItem>
                                    <MenuItem onClick={couponSubmit}>Coupon Details</MenuItem>
                                </Menu>
                            </Box>
                            <Box sx={{ margin: '5px 0' }}>
                                <Button onClick={userSubmit} sx={{ color: 'black', fontWeight: 600, fontSize: '1.1em', fontFamily: 'Open Sans,sans-serif' }}>
                                    <AccountCircleIcon sx={{ marginRight: 2 }} />
                                    Users
                                </Button>
                            </Box>
                            <Box sx={{ margin: '5px 0' }}>
                                <Button onClick={bannerSubmit} sx={{ color: 'black', fontWeight: 600, fontSize: '1.1rem', fontFamily: 'Open Sans,sans-serif' }}>
                                    <ViewCarouselIcon sx={{ marginRight: 2 }} />
                                    Banners
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