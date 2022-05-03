import {
    Grid, Paper, useTheme, useMediaQuery, TableContainer, Table, TableRow, TableCell, TextField, TableHead, TableBody, Box, Typography, Fab, Switch, MenuItem
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosinstance';
import { SearchContext } from '../../Store/searchcontext';
import Swal from 'sweetalert2';
import './User.css'


function Booking() {
    const [booking, setbooking] = useState([])
    const [status, setStatus] = useState('')
    const { search } = useContext(SearchContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))

    //user management get request
    const getBookingData = async () => {
        try {
            const data = await axios.get("/admin_panel/booking",
                {
                    headers: {
                        'authToken': localStorage.getItem("admintoken")
                    }
                })
            setbooking(data.data.booking)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("admintoken")
        if (!token) {
            navigate('/adminlogin')
        } else {
            getBookingData();
        }
        return () => {
        }
    }, [navigate])

    //user management edit request
    const edit = (id) => {
        navigate('/userupdate', { state: { id: id } })
    }

    //update booking order status
    const handleStatusChange = (e,id) => {
        setStatus(e.target.value)  
        const bookingId = id
        const value = {
            data: e.target.value
        }
        try {
            axios.put(`admin_panel/booking_management/edit_status/${bookingId}`, value, {
                headers: {
                    'authToken': localStorage.getItem("admintoken"),
                }
            })
                .then((res) => {
                    console.log(res.data.booking)
                    setbooking(res.data.booking)
                    
                }).catch(e => {
                    console.log(e)
                })
        } catch (error) {
            console.log(error)
        }
    }

    //user management delete user details
    const deleteBooking = (id) => {
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
                axios.delete(`admin_panel/booking_management/delete_booking/${id}`, {
                    headers: {
                        'authToken': localStorage.getItem("admintoken")
                    }
                })
                    .then((res) => {
                        console.log(res.data.booking)
                        setbooking(res.data.booking)
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
                                            <TableCell align="center" >User Name</TableCell>
                                            <TableCell align="center" >User Phone No.</TableCell>
                                            <TableCell align="center" >Center Name</TableCell>
                                            <TableCell align="center" >Date</TableCell>
                                            <TableCell align="center" >Time Slot</TableCell>
                                            <TableCell align="center" >Total Amount</TableCell>
                                            <TableCell align="center" >Status</TableCell>
                                            <TableCell align="center" >
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                </TableHead>
                                <TableBody>
                                    {booking.filter((data) => {
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
                                                    <TableCell align="center" >{data.userDetails[0].name}</TableCell>
                                                    <TableCell align="center" >{data.userDetails[0].phone}</TableCell>
                                                    <TableCell align="center" >{data.turfDetails[0].centername}</TableCell>
                                                    <TableCell align="center" >{data.date}</TableCell>
                                                    <TableCell align="center" >{data.startTime} to {data.endTime}</TableCell>
                                                    <TableCell align="center" >{data.totalPrice}</TableCell>
                                                    <TableCell >
                                                        <Box sx={{ minWidth: 50 }}>
                                                            <TextField
                                                                name='status'
                                                                label='Status'
                                                                select
                                                                value={data.status ? data.status : status}
                                                                onChange={(e) => { handleStatusChange(e,data._id) 
                                                              }}
                                                                fullWidth>
                                                                <MenuItem value='Booked'>Booked</MenuItem>
                                                                <MenuItem value='Completed'>Completed</MenuItem>
                                                                <MenuItem value='Cancelled'>Cancelled</MenuItem>
                                                            </TextField>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <DeleteIcon onClick={() => deleteBooking(data._id)} />
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
                                            <TableCell align="center" >User Name</TableCell>
                                            <TableCell align="center" >User Phone No.</TableCell>
                                            <TableCell align="center" >Center Name</TableCell>
                                            <TableCell align="center" >Date</TableCell>
                                            <TableCell align="center" >Time Slot</TableCell>
                                            <TableCell align="center" >Total Amount</TableCell>
                                            <TableCell align="center" >Status</TableCell>
                                            <TableCell align="center" >
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {booking.filter((data) => {
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
                                                    <TableCell align="center" >{data.userDetails[0].name}</TableCell>
                                                    <TableCell align="center" >{data.userDetails[0].phone}</TableCell>
                                                    <TableCell align="center" >{data.turfDetails[0].centername}</TableCell>
                                                    <TableCell align="center" >{data.date}</TableCell>
                                                    <TableCell align="center" >{data.startTime} to {data.endTime}</TableCell>
                                                    <TableCell align="center" >{data.totalPrice}</TableCell>
                                                    <TableCell >
                                                        <Box sx={{ minWidth: 50 }}>
                                                            <TextField
                                                                name='status'
                                                                label='Status'
                                                                select
                                                                value={data.status ? data.status : status}
                                                                onChange={(e) => { handleStatusChange(e,data._id) 
                                                              }}
                                                                fullWidth>
                                                                <MenuItem value='Booked'>Booked</MenuItem>
                                                                <MenuItem value='Completed'>Completed</MenuItem>
                                                                <MenuItem value='Cancelled'>Cancelled</MenuItem>
                                                            </TextField>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <DeleteIcon onClick={() => deleteBooking(data._id)} />
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
                                            <TableCell align="center" >User Name</TableCell>
                                            <TableCell align="center" >User Phone No.</TableCell>
                                            <TableCell align="center" >Center Name</TableCell>
                                            <TableCell align="center" >Date</TableCell>
                                            <TableCell align="center" >Time Slot</TableCell>
                                            <TableCell align="center" >Total Amount</TableCell>
                                            <TableCell align="center" >Status</TableCell>
                                            <TableCell align="center" >
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {booking.filter((data) => {
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
                                                    <TableCell align="center" >{data.userDetails[0].name}</TableCell>
                                                    <TableCell align="center" >{data.userDetails[0].phone}</TableCell>
                                                    <TableCell align="center" >{data.turfDetails[0].centername}</TableCell>
                                                    <TableCell align="center" >{data.date}</TableCell>
                                                    <TableCell align="center" >{data.startTime} to {data.endTime}</TableCell>
                                                    <TableCell align="center" >{data.totalPrice}</TableCell>
                                                    <TableCell >
                                                        <Box sx={{ minWidth: 50 }}>
                                                            <TextField
                                                                name='status'
                                                                label='Status'
                                                                select
                                                                value={data.status ? data.status : status}
                                                                onChange={(e) => { handleStatusChange(e,data._id) 
                                                              }}
                                                                fullWidth>
                                                                <MenuItem value='Booked'>Booked</MenuItem>
                                                                <MenuItem value='Completed'>Completed</MenuItem>
                                                                <MenuItem value='Cancelled'>Cancelled</MenuItem>
                                                            </TextField>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <DeleteIcon onClick={() => deleteBooking(data._id)} />
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

export default Booking