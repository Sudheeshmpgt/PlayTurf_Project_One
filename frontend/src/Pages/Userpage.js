import {
    Grid, Paper, useTheme, useMediaQuery, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Box, Typography, Fab, Switch
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AdminAside from '../Components/Admin/AdminAside'
import AdminHeader from '../Components/Admin/AdminHeader'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SearchContext } from '../Store/searchcontext';
import Swal from 'sweetalert2';

function Userpage() {
    const [user, setUser] = useState([])
    const [status, setStatus] = useState('false')
    const { search } = useContext(SearchContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const tableStyle = { width:'95%', margin: '15px auto', }

    //user management get request
    const getUserData = async () => {
        try {
            const data = await axios.get("http://localhost:9000/admin_panel/user_management")
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
        axios.put(`http://localhost:9000/admin_panel/user_management/edit_user_status/${id}`, status)
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
                axios.delete(`http://localhost:9000/admin_panel/user_management/delete_user/${id}`)
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
        <Grid container>
            <AdminHeader />
            <Grid item sx={{
                display: 'flex',
            }}>
                <Box>
                    <AdminAside />
                </Box>
                <Paper elevation={10} 
               
                sx={{
                    height: 575,
                    marginTop: 1,
                    width: 1065
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
                        <Typography variant='h6' component={Box} sx={{
                            fontWeight: 700
                        }}>
                            USER DETAILS
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: '-40px' }}>
                        {
                            isMatch ? (
                                <TableContainer component={Paper} sx={{ width: 330, marginTop: '50px', marginLeft: '7%' }}>
                                    <Table sx={{ width: 900 }} aria-label="simple table">
                                        <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell >Name</TableCell>
                                                <TableCell >Phone</TableCell>
                                                <TableCell >Email</TableCell>
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
                                                        <TableCell >{data.name}</TableCell>
                                                        <TableCell >{data.phone}</TableCell>
                                                        <TableCell >{data.email}</TableCell>
                                                        <TableCell >Block</TableCell>
                                                        <TableCell colSpan={2}>Actions</TableCell>
                                                        <TableCell align="center">  <Switch color='error' onClick={() => block(data._id)} /></TableCell>
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
                            ) : (
                                <TableContainer component={Paper} style={tableStyle}>
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
                                                            <Switch
                                                                color='error'   
                                                                onClick={(e) => block(data._id)} />
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
                            )
                        }
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Userpage