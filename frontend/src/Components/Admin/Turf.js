import {
    Grid, Paper, useTheme, useMediaQuery, TableContainer, Table,
    TableRow, TableCell, TableHead, TableBody, Box, Typography, Fab
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosinstance';
import { SearchContext } from '../../Store/searchcontext';
import Swal from 'sweetalert2';
import './Turf.css'

function Turf() {
    const [turf, setTurf] = useState([])
    const { search } = useContext(SearchContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))

    //tur management get request
    const getTurfData = async () => {
        try {
            const data = await axios.get("admin_panel/turfs", {
                headers: {
                    'authToken': localStorage.getItem("admintoken"),
                }
            })
            setTurf(data.data.turf)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("admintoken")
        if (!token) {
            navigate('/adminlogin')
        } else {
            getTurfData();
        }
        return () => {
        }
    }, [navigate]) 

    //turf management update turfs refquest
    const editTurf = (id) => {
        navigate('/turfupdate', { state: { id: id } })
    }

    //turf management delete turf details
    const deleteTurf = (id) => {
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
                axios.delete(`admin_panel/turfs/delete_turfs/${id}`, {
                    headers: {
                        'authToken': localStorage.getItem("admintoken"),
                    }
                })
                    .then((res) => {
                        setTurf(res.data.turf)
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
                                TURF DETAILS
                            </Typography>
                            <Fab color="success" size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                <AddIcon onClick={() => navigate('/turfadd')} />
                            </Fab>
                        </Box>
                        <TableContainer className='scrollbar-hidden' component={Paper} style={{ width: '95%', margin: '-20px auto', height: 450, overflow: 'scroll' }}>
                            <Table sx={{ width: 300 }} aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                    <TableRow>
                                        <TableCell align="center" >Id</TableCell>
                                        <TableCell align="center" >Center Name</TableCell>
                                        <TableCell align="center" >Contact No.</TableCell>
                                        <TableCell align="center" >Location</TableCell>
                                        <TableCell align="center" >Category</TableCell>
                                        <TableCell align="center" >Price/hr</TableCell>
                                        <TableCell align="center" colSpan={2}>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {turf.filter((data) => {
                                        if (search === "") {
                                            return data
                                        } else if (data.centername.toLowerCase().includes(search.toLowerCase())) {
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
                                                <TableCell align="center" >{data.centername}</TableCell>
                                                <TableCell align="center" >{data.phone}</TableCell>
                                                <TableCell align="center" >{data.location}</TableCell>
                                                <TableCell align="center" >{data.category}</TableCell>
                                                <TableCell align="center" >{data.price}</TableCell>
                                                <TableCell >
                                                    <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                        <EditIcon onClick={() => editTurf(data._id)} />
                                                    </Fab>
                                                </TableCell>
                                                <TableCell >
                                                    <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                        <DeleteIcon onClick={() => deleteTurf(data._id)} />
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
                                    TURF DETAILS
                                </Typography>
                                <Fab color="success" size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                    <AddIcon onClick={() => navigate('/turfadd')} />
                                </Fab>
                            </Box>
                            <TableContainer className='scrollbar-hidden' component={Paper} style={{ width: '95%', margin: '-20px auto', height: 450, overflow: 'scroll' }}>
                                <Table sx={{ width: 1011 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                        <TableRow>
                                            <TableCell align="center" >Id</TableCell>
                                            <TableCell align="center" >Center Name</TableCell>
                                            <TableCell align="center" >Contact No.</TableCell>
                                            <TableCell align="center" >Location</TableCell>
                                            <TableCell align="center" >Category</TableCell>
                                            <TableCell align="center" >Price/hr</TableCell>
                                            <TableCell align="center" colSpan={2}>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {turf.filter((data) => {
                                            if (search === "") {
                                                return data
                                            } else if (data.centername.toLowerCase().includes(search.toLowerCase())) {
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
                                                    <TableCell align="center" >{data.centername}</TableCell>
                                                    <TableCell align="center" >{data.phone}</TableCell>
                                                    <TableCell align="center" >{data.location}</TableCell>
                                                    <TableCell align="center" >{data.category}</TableCell>
                                                    <TableCell align="center" >{data.price}</TableCell>
                                                    <TableCell >
                                                        <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <EditIcon onClick={() => editTurf(data._id)} />
                                                        </Fab>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <DeleteIcon onClick={() => deleteTurf(data._id)} />
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
                                    TURF DETAILS
                                </Typography>
                                <Fab color="success" size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                    <AddIcon onClick={() => navigate('/turfadd')} />
                                </Fab>
                            </Box>
                            <TableContainer className='scrollbar-hidden' component={Paper} style={{ width: '95%', margin: '-20px auto', height: 450, overflowX: 'hidden' }}>
                                <Table sx={{ width: 1011 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                        <TableRow>
                                            <TableCell align="center" >Id</TableCell>
                                            <TableCell align="center" >Center Name</TableCell>
                                            <TableCell align="center" >Contact No.</TableCell>
                                            <TableCell align="center" >Location</TableCell>
                                            <TableCell align="center" >Category</TableCell>
                                            <TableCell align="center" >Price/hr</TableCell>
                                            <TableCell align="center" colSpan={2}>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {turf.filter((data) => {
                                            if (search === "") {
                                                return data
                                            } else if (data.centername.toLowerCase().includes(search.toLowerCase())) {
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
                                                    <TableCell align="center" >{data.centername}</TableCell>
                                                    <TableCell align="center" >{data.phone}</TableCell>
                                                    <TableCell align="center" >{data.location}</TableCell>
                                                    <TableCell align="center" >{data.category}</TableCell>
                                                    <TableCell align="center" >{data.price}</TableCell>
                                                    <TableCell >
                                                        <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <EditIcon onClick={() => editTurf(data._id)} />
                                                        </Fab>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <DeleteIcon onClick={() => deleteTurf(data._id)} />
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

export default Turf