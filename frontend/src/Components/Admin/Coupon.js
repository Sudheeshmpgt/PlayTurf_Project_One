import {
    Paper, useTheme, useMediaQuery, TableContainer, Table,
    TableRow, TableCell, TableHead, TableBody, Box, Typography, Fab, Button
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosinstance';
import { SearchContext } from '../../Store/searchcontext';
import Swal from 'sweetalert2';
import './Offer.css'

function Coupon() {
    const [coupon, setCoupon] = useState([])
    const [status, setStatus] = useState(true)
    const { search } = useContext(SearchContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))
    const token = localStorage.getItem("admintoken")

    //tur management get request
    const getCouponData = async () => {
        try {
            const data = await axios.get("/admin_panel/coupon", {
                headers: {
                    'authToken': localStorage.getItem("admintoken"),
                }
            })
            setCoupon(data.data.coupon)
        } catch (error) {
            // alert(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("admintoken")
        if (!token) {
            navigate('/adminlogin')
        } else {
            getCouponData();
        }
        return () => {
        }
    }, [navigate])


    const handleStatus = (id) => {
        try {
            axios.put(`admin_panel/coupon/edit_status/${id}`)    
            .then((res)=>{
                setCoupon(res.data.coupon)
            })
        } catch (error) {
            alert('error')
        }
        setStatus(!status)
    }

    //offer management update offers refquest
    const editCoupon = (id) => {
        navigate('/couponupdate', { state: { id: id } })
    }

    //offer management delete offer details
    const deleteCoupon = (id) => {
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
                axios.delete(`admin_panel/coupon/delete_coupon/${id}`, {
                    headers: {
                        'authToken': localStorage.getItem("admintoken"),
                    }
                })
                    .then((res) => {
                        setCoupon(res.data.coupon)
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
                               COUPON DETAILS
                            </Typography>
                            <Fab color="success" size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                <AddIcon onClick={() => navigate('/couponadd')} />
                            </Fab>
                        </Box>
                        <TableContainer className='scrollbar-hidden' component={Paper} style={{ width: '95%', margin: '-20px auto', height: 450, overflow: 'scroll' }}>
                            <Table sx={{ width: 300 }} aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                    <TableRow>
                                        <TableCell align="center" >Id</TableCell>
                                        <TableCell align="center" >Coupon Code</TableCell>
                                        <TableCell align="center" >Offer Percent</TableCell>
                                        <TableCell align="center" >From Date</TableCell>
                                        <TableCell align="center" >To Date</TableCell>
                                        <TableCell align="center" >Status</TableCell>
                                        <TableCell align="center" colSpan={2}>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {coupon.filter((data) => {
                                        if (search === "") {
                                            return data
                                        } else if (data.couponCode.toLowerCase().includes(search.toLowerCase())) {
                                            return data
                                        }
                                    })
                                        .map((data, index) => (
                                            <TableRow
                                                key={data._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center" component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="center" >{data.couponCode}</TableCell>
                                                <TableCell align="center" >{data.offerPercent}</TableCell>
                                                <TableCell align="center" >{data.fromDate}</TableCell>
                                                <TableCell align="center" >{data.toDate}</TableCell>
                                                <TableCell align="center" >
                                                        <Button onClick={() => handleStatus(data._id)} variant='contained'>{data.status ? 'Active' : 'InActive'}</Button>
                                                    </TableCell>
                                                <TableCell >
                                                    <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                        <EditIcon onClick={() => editCoupon(data._id)} />
                                                    </Fab>
                                                </TableCell>
                                                <TableCell >
                                                    <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                        <DeleteIcon onClick={() => deleteCoupon(data._id)} />
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
                                   COUPON DETAILS
                                </Typography>
                                <Fab color="success" size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                    <AddIcon onClick={() => navigate('/couponadd')} />
                                </Fab>
                            </Box>
                            <TableContainer className='scrollbar-hidden' component={Paper} style={{ width: '95%', margin: '-20px auto', height: 450, overflow: 'scroll' }}>
                                <Table sx={{ width: 1011 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                        <TableRow>
                                            <TableCell align="center" >Id</TableCell>
                                            <TableCell align="center" >Coupon Code</TableCell>
                                            <TableCell align="center" >Offer Percent</TableCell>
                                            <TableCell align="center" >From Date</TableCell>
                                            <TableCell align="center" >To Date</TableCell>
                                            <TableCell align="center" >Status</TableCell>
                                            <TableCell align="center" colSpan={2}>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {coupon.filter((data) => {
                                            if (search === "") {
                                                return data
                                            } else if (data.couponCode.toLowerCase().includes(search.toLowerCase())) {
                                                return data
                                            }
                                        })
                                            .map((data, index) => (
                                                <TableRow
                                                    key={data._id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center" component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="center" >{data.couponCode}</TableCell>
                                                    <TableCell align="center" >{data.offerPercent}</TableCell>
                                                    <TableCell align="center" >{data.fromDate}</TableCell>
                                                    <TableCell align="center" >{data.toDate}</TableCell>
                                                    <TableCell align="center" >
                                                        <Button onClick={() => handleStatus(data._id)} variant='contained'>{data.status ? 'Active' : 'InActive'}</Button>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <EditIcon onClick={() => editCoupon(data._id)} />
                                                        </Fab>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <DeleteIcon onClick={() => deleteCoupon(data._id)} />
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
                                   COUPON DETAILS
                                </Typography>
                                <Fab color="success" size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                    <AddIcon onClick={() => navigate('/couponadd')} />
                                </Fab>
                            </Box>
                            <TableContainer className='scrollbar-hidden' component={Paper} style={{ width: '95%', margin: '-20px auto', height: 450, overflowX: 'hidden' }}>
                                <Table sx={{ width: 1011 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                        <TableRow>
                                            <TableCell align="center" >Id</TableCell>
                                            <TableCell align="center" >Coupon Code</TableCell>
                                            <TableCell align="center" >Offer Percent</TableCell>
                                            <TableCell align="center" >From Date</TableCell>
                                            <TableCell align="center" >To Date</TableCell>
                                            <TableCell align="center" >Status</TableCell>
                                            <TableCell align="center" colSpan={2}>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {coupon.filter((data) => {
                                            if (search === "") {
                                                return data
                                            } else if (data.couponCode.toLowerCase().includes(search.toLowerCase())) {
                                                return data
                                            }
                                        })
                                            .map((data, index) => (
                                                <TableRow
                                                    key={data._id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center" component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="center" >{data.couponCode}</TableCell>
                                                    <TableCell align="center" >{data.offerPercent}</TableCell>
                                                    <TableCell align="center" >{data.fromDate}</TableCell>
                                                    <TableCell align="center" >{data.toDate}</TableCell>
                                                    <TableCell align="center" >
                                                        <Button onClick={() => handleStatus(data._id)} variant='contained'>{data.status ? 'Active' : 'InActive'}</Button>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <EditIcon onClick={() => editCoupon(data._id)} />
                                                        </Fab>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                            <DeleteIcon onClick={() => deleteCoupon(data._id)} />
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

export default Coupon