import React, { useContext, useState } from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Tooltip, MenuItem, useTheme, useMediaQuery, InputBase } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Store/searchcontext';
import SearchIcon from '@mui/icons-material/Search';

function AdminHeader() {
    const { search, setSearch } = useContext(SearchContext)
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        localStorage.removeItem("admintoken")
        navigate('/adminlogin')
    }

    const searchChange = (data) => {
        setSearch(data.target.value)
    }

    const userSubmit = () => {
        handleCloseNavMenu()
        navigate('/userpage')
    }
    const turfSubmit = () => {
        handleCloseNavMenu()
        navigate('/turfpage')
    }
    const categorySubmit = () => {
        handleCloseNavMenu()
        navigate('/categorypage')
    }
    const bannerSubmit = () => {
        handleCloseNavMenu()
        navigate('/bannerpage')
    }
    const BookingSubmit = () => {
        handleCloseNavMenu()
        navigate('/adminbookingpage')
    }
    const offerSubmit = () => {
        handleCloseNavMenu()
        navigate('/offerpage')
    }
    const dashboardSubmit = () => {
        handleCloseNavMenu()
        navigate('/dashboard')
    }
    const couponSubmit = () => {
        handleCloseNavMenu()
        navigate('/couponpage')
    }
    const reportSubmit = () => {
        handleCloseNavMenu()
        navigate('/report')
    }



    return (
        <AppBar position="static" sx={{ backgroundColor: '#393939' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant=''
                        noWrap
                        component="div"
                        sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}
                        fontFamily='Homemade Apple, cursive;'
                        fontSize={18}
                        color='#FF5A09'
                        fontWeight={400}
                    >
                        Play Turf
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={dashboardSubmit}>
                                <Typography textAlign="center">Dashboard</Typography>
                            </MenuItem>
                            <MenuItem onClick={turfSubmit}>
                                <Typography textAlign="center">Turfs</Typography>
                            </MenuItem>
                            <MenuItem onClick={BookingSubmit}>
                                <Typography textAlign="center">Bookings</Typography> 
                            </MenuItem>
                            <MenuItem onClick={categorySubmit}>
                                <Typography textAlign="center">Category</Typography>
                            </MenuItem>
                            <MenuItem onClick={offerSubmit}>
                                <Typography textAlign="center">Offers</Typography>
                            </MenuItem>
                            <MenuItem onClick={couponSubmit}>
                                <Typography textAlign="center">Coupons</Typography>
                            </MenuItem>
                            <MenuItem onClick={userSubmit}>
                                <Typography textAlign="center">Users</Typography>
                            </MenuItem>
                            <MenuItem onClick={bannerSubmit}>
                                <Typography textAlign="center">Banners</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="p"
                        noWrap
                        component="div"
                        color='#FF5A09'
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        fontFamily='Homemade Apple, cursive;'
                        fontSize={15}
                    >
                        Play Turf
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>
                    {
                        isSmall ?
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: 0.8, width: 100, marginRight: 2, display: 'flex' }}>
                                <Box m={1.1}>
                                    <SearchIcon />
                                </Box>
                                <InputBase
                                    color='secondary'
                                    variant='outlined'
                                    value={search}
                                    onChange={searchChange}
                                    placeholder='Search...'
                                    sx={{
                                        marginRight: 2,
                                    }}>
                                </InputBase>
                            </Box>
                            :
                            isMatch ?
                                <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: 0.8, width: 150, marginRight: 2, display: 'flex' }}>
                                    <Box m={1.1}>
                                        <SearchIcon />
                                    </Box>
                                    <InputBase
                                        color='secondary'
                                        variant='outlined'
                                        value={search}
                                        onChange={searchChange}
                                        placeholder='Search...'
                                        sx={{
                                            marginRight: 2,
                                        }}>
                                    </InputBase>
                                </Box> :
                                <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: 0.8, width: 300, marginRight: 2, display: 'flex' }}>
                                    <Box m={1.1}>
                                        <SearchIcon />
                                    </Box>
                                    <InputBase
                                        variant='outlined'
                                        value={search}
                                        onChange={searchChange}
                                        placeholder='Search here...'
                                        sx={{
                                            marginRight: 2,
                                        }}>
                                    </InputBase>
                                </Box>
                    }
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Typography color='white' sx={{ fontFamily: 'Open Sans,sans-serif' }}>
                                    Hi, Admin
                                </Typography>
                                <ArrowDropDownIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography onClick={logout} textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default AdminHeader
