import React, { useContext, useEffect } from 'react'
import { Avatar, Box, Card, useTheme, useMediaQuery, Grid, Typography, CardContent, Fab } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from '../../Store/usercontext';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosinstance'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockResetIcon from '@mui/icons-material/LockReset';


function UserAccount() {

    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        const id = localStorage.getItem("userId")
        axios.get(`admin_panel/user_management/update/${id}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                setUser(res.data.user[0])
            })
    }, [])

    const edit = (id) => {
        navigate('/useredit', { state: { id: id } })
    }

    const password =()=>{
        navigate('/updatedata')
    }

    const account = () => {
        navigate('/account')
    }

    const Id = user ? user._id : userId

    return (
        <Grid container>
            {
                isMatch ? (
                    <Card sx={{ m: '20px auto' }}>
                        <CardContent>
                            <Avatar sx={{
                                height: 100,
                                width: 100,
                                m: '1px auto'
                            }} ><img alt='Profile' src={user ? user.userImg : ''}></img></Avatar>
                        </CardContent>
                        <CardContent sx={{ display: 'flex', justifyContent:'space-between' }}>
                            <Box display='flex' mt={1}>
                                <Fab size='small' color='secondary'>
                                    <AccountBoxIcon sx={{ fontSize: 22 }} />
                                </Fab>
                            </Box>
                            <Box display='flex' mt={1}>
                                <Fab onClick={() => edit(Id)} size='small' color='secondary'>
                                    <EditIcon sx={{ fontSize: 16 }} />
                                </Fab>
                            </Box>
                            <Box display='flex' mt={1}>
                                <Fab onClick={password} size='small' color='secondary'>
                                    <LockResetIcon sx={{ fontSize: 16 }} />
                                </Fab>
                            </Box>
                        </CardContent>
                        <CardContent>
                            <Typography
                            textAlign='center'
                            fontSize={18}
                            fontWeight={600}
                            borderBottom={1}
                            mb={1.5}>
                                PROFILE
                            </Typography>
                            <Box display='flex'>
                                <Typography variant='body2'>
                                    NAME
                                </Typography>
                                <Typography variant='h4' ml={4.5}>
                                    : {user ? user.name : ''}
                                </Typography>
                            </Box>
                            <Box display='flex'>
                                <Typography variant='body2'>
                                    EMAIL
                                </Typography>
                                <Typography variant='h4' ml={4}>
                                    : {user ? user.email : ''}
                                </Typography>
                            </Box>
                            <Box display='flex'>
                                <Typography
                                    variant='body2'>
                                    PHONE
                                </Typography>
                                <Typography variant='h4' ml={3.5}>
                                    : {user ? user.phone : ''}
                                </Typography>
                            </Box>
                            <Box display='flex'>
                                <Typography variant='body2'>
                                    ADDRESS
                                </Typography>
                                <Typography variant='h4' ml={1}>
                                    : {user ? user.address : ''}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <Card sx={{ m: '50px auto', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '35px 0 35px 0', height: 450, width:600 }}>
                        <Box display='flex'>
                            <Box display='flex' flexDirection='column' borderRight={1} mt={3}>
                                <Box>
                                    <Avatar sx={{
                                        height: 150,
                                        width: 150,
                                        mt: 1.5,
                                        ml: 3,
                                        mb: 4
                                    }} ><img alt='Profile' src={user ? user.userImg : ''}></img></Avatar>
                                </Box>
                                <Box mr={3} ml={5}>
                                    <Box onClick={account} display='flex' mt={2}>
                                        <AccountBoxIcon color='secondary' sx={{ fontSize: 25  }} />
                                        <Typography ml={2} sx={{cursor:'pointer'}}>
                                            Profile
                                        </Typography>
                                    </Box>
                                    <Box onClick={() => edit(Id)} display='flex' mt={2}>
                                        <EditIcon color='secondary' sx={{ fontSize: 25 }} />
                                        <Typography ml={2} sx={{cursor:'pointer'}}>
                                            Edit Profile
                                        </Typography>
                                    </Box>
                                    <Box onClick={password} display='flex' mt={2} mb={10}>
                                        <LockResetIcon color='secondary' sx={{ fontSize: 25 }} />
                                        <Typography ml={2} sx={{cursor:'pointer'}}>
                                            Edit Password
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box display='flex'
                                flexDirection='column'
                                m='40px auto'>
                                <Box borderBottom={1} width='93%' margin='0px auto'>
                                    <Typography
                                        color='secondary'
                                        textAlign='center'
                                        margin={1}
                                        fontSize={30}
                                        fontWeight={600} >PROFILE</Typography>
                                </Box>
                                <Box m={3}>
                                    <Box display='flex' mt={1}>
                                        <Typography
                                            fontWeight={600}>
                                            Name
                                        </Typography>
                                        <Typography ml={4}>
                                            : {user ? user.name : ''}
                                        </Typography>
                                    </Box>
                                    <Box display='flex' mt={1}>
                                        <Typography
                                            fontWeight={600}>
                                            E-mail
                                        </Typography>
                                        <Typography ml={3.9}>
                                            : {user ? user.email : ''}
                                        </Typography>
                                    </Box>
                                    <Box display='flex' mt={1}>
                                        <Typography
                                            fontWeight={600}>
                                            Phone
                                        </Typography>
                                        <Typography ml={3.7}>
                                            : {user ? user.phone : ''}
                                        </Typography>
                                    </Box>
                                    <Box display='flex' mt={1}>
                                        <Typography
                                            fontWeight={600}>
                                            Address
                                        </Typography>
                                        <Typography ml={2}>
                                            : {user ? user.address : ''}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                )
            }

        </Grid>
    )
}

export default UserAccount