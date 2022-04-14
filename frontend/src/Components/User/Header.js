import React, { useState, useContext } from 'react'
import { Grid, AppBar, Toolbar, Box, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { UserContext } from '../../Store/usercontext'
import { useNavigate } from 'react-router-dom';


function Header() {

    const navigate = useNavigate();
    const { user,setUser } = useContext(UserContext)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

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

    const logout =()=>{
        setUser('')
        localStorage.removeItem("usertoken")
        navigate('/')
    }

    const signIn =()=>{
        navigate('/login')
    }

    const signUp =()=>{
        navigate('/signup')
    }
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar position="static" sx={{ backgroundColor: '#DD0404' }}>
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <Typography
                                    variant=''
                                    noWrap
                                    component="div"
                                    sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}
                                    fontFamily='Homemade Apple, cursive;'
                                    fontSize={18}
                                    color='black'
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
                                            <Typography textAlign="center">Home</Typography>
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
                                    variant=""
                                    noWrap
                                    component="div"
                                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                                    fontFamily='Homemade Apple, cursive;'
                                    fontSize={18}
                                >
                                    Play Turf
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Home
                                    </Button>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Turfs
                                    </Button>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Book Now
                                    </Button>
                                </Box>

                                {
                                    user ? <Box sx={{ flexGrow: 0 }}>

                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color:'white' }}>
                                                <Typography>
                                                    {`Hi, ${user.name}`}
                                                </Typography>
                                                <ArrowDropDownIcon sx={{marginLeft:"2px"}}/>
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
                                                <Typography textAlign="center">Account</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">Bookings</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" onClick={logout}>Logout</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Box> :
                                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                                            <Button
                                                onClick={signIn}
                                                sx={{ my: 1, color: 'white', display: 'block' }}
                                            >
                                                Sign In
                                            </Button>
                                            <Button
                                                onClick={signUp}
                                                sx={{ my: 1, color: 'white', display: 'block' }}
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