import React, { useState, useContext, useEffect } from 'react'
import { Grid, AppBar, Toolbar, Box, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem, InputBase } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { UserContext } from '../../Store/usercontext'
import { SearchContext } from '../../Store/searchcontext'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';


function Header() {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)
    const { search, setSearch } = useContext(SearchContext)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const searchChange = (data) => {
        setSearch(data.target.value)
    }

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
        setUser('')
        localStorage.removeItem("usertoken")
        navigate('/')
    }

    const signIn = () => {
        navigate('/login')
    }

    const signUp = () => {
        navigate('/signup')
    }

    const onClickTurf = () => {
        handleCloseNavMenu();
        navigate('/turf')
    }

    const onClickHome = () => {
        handleCloseNavMenu();
        navigate('/')
    }

    const onClickAccount = () => {
        navigate('/useraccount')
    }

    const handleClick = () =>{
        navigate('/turf')
    }

    const handleClickBooking = () => {
        navigate('/mybooking')
    }

    useEffect(() => {
        const token = localStorage.getItem("usertoken")
        if (!token) {
            navigate('/login')
        }
    }, [navigate])

    const token = localStorage.getItem("usertoken")

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar position="static" sx={{ backgroundColor: '#393939' }}>
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <Typography
                                    onClick={onClickHome}
                                    variant=''
                                    noWrap
                                    component="div"
                                    sx={{ mr: 5, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
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

                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center" fontWeight={600}>Home</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Turfs</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Book Now</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                                <Typography
                                    onClick={onClickHome}
                                    variant=""
                                    noWrap
                                    component="div"
                                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                                    fontFamily='Homemade Apple, cursive;'
                                    fontSize={18}
                                    color='#FF5A09'

                                >
                                    Play Turf
                                </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                        <Button
                                            onClick={onClickTurf}
                                            sx={{ my: 1, color: 'white', display: 'block', fontWeight: 500, fontSize: '1rem' }}
                                        >
                                            Turfs
                                        </Button>
                                        <Button
                                            onClick={handleClickBooking}
                                            sx={{ my: 1, color: 'white', display: 'block', fontWeight: 500, fontSize: '1rem' }}
                                        >
                                            {user ? 'My Bookings' : 'Bookings'}
                                        </Button>
                                        {/* <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 1, color: 'white', display: 'block', fontWeight: 500, fontSize: '1rem' }}
                                        >
                                            Book Now
                                        </Button> */}
                                    </Box >
                                        <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: 0.8, width: 300, height:30, marginLeft: 2, display: 'flex', marginTop:1.5 }}>
                                            <Box m={1.1} color='text.secondary'>
                                            </Box>
                                            <InputBase
                                                variant='outlined'
                                                value={search}
                                                onChange={searchChange}
                                                placeholder='Search here...'
                                                sx={{
                                                    marginRight: 4,
                                                }}>
                                            </InputBase>
                                            <Button variant='contained' color='secondary' onClick={handleClick}> 
                                            <SearchIcon sx={{fontSize:20}} />
                                            </Button>
                                        </Box>
                                </Box>
                                {
                                    token ? <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
                                                <Typography>
                                                    {user ? `Hi, ${user.name}` : ''}
                                                </Typography>
                                                <ArrowDropDownIcon sx={{ marginLeft: "2px" }} />
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
                                            {
                                                // user ?
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center" onClick={onClickAccount}>Account</Typography>
                                                </MenuItem>
                                                // : ''
                                            }
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" onClick={logout}>Logout</Typography>
                                            </MenuItem>
                                        </Menu>

                                    </Box> :
                                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                                            <Button
                                                onClick={signIn}
                                                variant='outlined'
                                                color='secondary'
                                                size='small'
                                                sx={{ m: 1, color: 'white', display: 'block', p: -1 }}
                                            >
                                                Sign In
                                            </Button>
                                            <Button
                                                onClick={signUp}
                                                variant='outlined'
                                                color='secondary'
                                                sx={{ m: 1, color: 'white', display: 'block', p: -1 }}
                                            >
                                                Sign Up
                                            </Button>
                                        </Box>
                                }
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Grid>
            </Grid>
        </>
    )
}

export default Header