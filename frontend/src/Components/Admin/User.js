import {
    Button, Paper, useTheme, useMediaQuery, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Box, Typography, Fab, Switch
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosinstance';
import { SearchContext } from '../../Store/searchcontext';
import Swal from 'sweetalert2';
import './User.css'

function User() {
    const [user, setUser] = useState([])
    const [status, setStatus] = useState('false')
    const { search } = useContext(SearchContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))

    //user management get request
    const getUserData = async () => {
        try {
            const data = await axios.get("admin_panel/user_management",
                {
                    headers: {
                        'authToken': localStorage.getItem("admintoken")
                    }
                })
            setUser(data.data.user)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("admintoken")
        if (!token) {
            navigate('/adminlogin')
        } else {
            getUserData();
        }
        return () => {
        }
    }, [navigate])

    //user management edit request
    const edit = (id) => {
        navigate('/userupdate', { state: { id: id } })
    }

    //user management update user status 
    const block = (id) => {
        const data = !status
        setStatus(data)
        axios.put(`admin_panel/user_management/edit_user_status/${id}`, status)
            .then((res) => {
                setUser(res.data.user)
            })
    }

    //user management delete user details
    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(id)
                axios.delete(`admin_panel/user_management/delete_user/${id}`)
                    .then((res) => {
                        console.log(res.data.user)
                        setUser(res.data.user)
                    })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
    return (
        <Box sx={{ marginTop: '1px' }}>
            {
                isSmall ? (
                    <Paper elevation={3} sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        height: 577,
                        margin: 1.5,
                        width: 350,
                        borderRadius: '1px',
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
                            <Typography variant='h6' component={Box} sx={{
                                fontWeight: 700
                            }}>
                                USER DETAILS
                            </Typography>
                        </Box>
                        <TableContainer className='scrollbar-hidden' component={Paper} style={{ width: '95%', margin: '-20px auto', height: 450, overflow: 'scroll' }}>
                            <Table sx={{ width: 300 }} aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                    <TableRow>
                                        <TableCell align="center" >Id</TableCell>
                                        <TableCell align="center" >Name</TableCell>
                                        <TableCell align="center" >Phone</TableCell>
                                        <TableCell align="center" >Email</TableCell>
                                        <TableCell align="center" >Block</TableCell>
                                        <TableCell align="center" colSpan={2}>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.filter((data) => {
                                        if (search === "") {
                                            return data
                                        } else if (data.name.toLowerCase().includes(search.toLowerCase())) {
                                            return data
                                        }
                                    })
                                        .map((data, index) => (
                                            <TableRow
                                                key={data._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="center" >{data.name}</TableCell>
                                                <TableCell align="center" >{data.phone}</TableCell>
                                                <TableCell align="center" >{data.email}</TableCell>
                                                <TableCell align="center">
                                                    {
                                                        data.isActive ? (
                                                            <Button size='small' variant='contained' onClick={(e) => block(data._id)} color='secondary'>
                                                                Block
                                                            </Button>
                                                        ) : (
                                                            <Button size='small' variant='contained' onClick={(e) => block(data._id)} color='primary'>
                                                                UnBlock
                                                            </Button>
                                                        )
                                                    }
                                                </TableCell>
                                                <TableCell >
                                                    <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                        <EditIcon onClick={() => edit(data._id)} />
                                                    </Fab>
                                                </TableCell>
                                                <TableCell >
                                                    <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                        <DeleteIcon onClick={() => deleteUser(data._id)} />
                                                    </Fab>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ) : (
                    isMedium ? (
                        <Paper elevation={3} sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            height: 577,
                            margin: 1,
                            width: 880,
                            borderRadius: '1px',
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
                                <Typography variant='h6' component={Box} sx={{
                                    fontWeight: 700
                                }}>
                                    USER DETAILS
                                </Typography>
                            </Box>
                            <TableContainer className='scrollbar-hidden' component={Paper} style={{ width: '95%', margin: '-20px auto', height: 450, overflow: 'scroll' }}>
                                <Table sx={{ width: 1011 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                        <TableRow>
                                            <TableCell align="center" >Id</TableCell>
                                            <TableCell align="center" >Name</TableCell>
                                            <TableCell align="center" >Phone</TableCell>
                                            <TableCell align="center" >Email</TableCell>
                                            <TableCell align="center" >Block</TableCell>
                                            <TableCell align="center" colSpan={2}>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user.filter((data) => {
                                            if (search === "") {
                                                return data
                                            } else if (data.name.toLowerCase().includes(search.toLowerCase())) {
                                                return data
                                            }
                                        })
                                            .map((data, index) => (
                                                <TableRow
                                                    key={data._id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="center" >{data.name}</TableCell>
                                                    <TableCell align="center" >{data.phone}</TableCell>
                                                    <TableCell align="center" >{data.email}</TableCell>
                                                    <TableCell align="center">
                                                        {
                                                            data.isActive ? (
                                                                <Button size='small' variant='contained' onClick={(e) => block(data._id)} color='secondary'>
                                                                    Block
                                                                </Button>
                                                            ) : (
                                                                <Button size='small' variant='contained' onClick={(e) => block(data._id)} color='primary'>
                                                                    UnBlock
                                                                </Button>
                                                            )
                                                        }
                                                    </TableCell>
                                                    <TableCell >
                                                        <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <EditIcon onClick={() => edit(data._id)} />
                                                        </Fab>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <DeleteIcon onClick={() => deleteUser(data._id)} />
                                                        </Fab>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                    ) : (
                        <Paper elevation={3} sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            height: 577,
                            marginTop: 1,
                            width: 1065,
                            borderRadius: '1px',
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
                                <Typography variant='h6' component={Box} sx={{
                                    fontWeight: 700
                                }}>
                                    USER DETAILS
                                </Typography>
                            </Box>
                            <TableContainer className='scrollbar-hidden' component={Paper} style={{ width: '95%', margin: '-20px auto', height: 450, overflow: 'scroll' }}>
                                <Table sx={{ width: 1011 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                        <TableRow>
                                            <TableCell align="center" >Id</TableCell>
                                            <TableCell align="center" >Name</TableCell>
                                            <TableCell align="center" >Phone</TableCell>
                                            <TableCell align="center" >Email</TableCell>
                                            <TableCell align="center" >Block</TableCell>
                                            <TableCell align="center" colSpan={2}>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user.filter((data) => {
                                            if (search === "") {
                                                return data
                                            } else if (data.name.toLowerCase().includes(search.toLowerCase())) {
                                                return data
                                            }
                                        })
                                            .map((data, index) => (
                                                <TableRow
                                                    key={data._id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="center" >{data.name}</TableCell>
                                                    <TableCell align="center" >{data.phone}</TableCell>
                                                    <TableCell align="center" >{data.email}</TableCell>
                                                    <TableCell align="center">
                                                        {
                                                            data.isActive ? (
                                                                <Button size='small' variant='contained' onClick={(e) => block(data._id)} color='secondary'>
                                                                    Block
                                                                </Button>
                                                            ) : (
                                                                <Button size='small' variant='contained' onClick={(e) => block(data._id)} color='primary'>
                                                                    UnBlock
                                                                </Button>
                                                            )
                                                        }
                                                    </TableCell>
                                                    <TableCell >
                                                        <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <EditIcon onClick={() => edit(data._id)} />
                                                        </Fab>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <DeleteIcon onClick={() => deleteUser(data._id)} />
                                                        </Fab>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    )
                )
            }
        </Box>
    )
}

export default User