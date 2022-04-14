import {
    Grid, Paper, useTheme, useMediaQuery, TableContainer, Table, 
    TableRow, TableCell, TableHead, TableBody, Box, Typography, Fab
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AdminAside from '../../AdminAside'
import AdminHeader from '../../AdminHeader'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SearchContext } from '../../../../Store/searchcontext';
import Swal from 'sweetalert2';

function Turfpage() {
    const [turf, setTurf] = useState([])
    const { search } = useContext(SearchContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const tableStyle = { width:'95%', margin: '15px auto', }

    //tur management get request
    const getTurfData = async () => {
        try {
            const data = await axios.get("http://localhost:9000/admin_panel/turfs")
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
                axios.delete(`http://localhost:9000/admin_panel/turfs/delete_turfs/${id}`)
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
        <Grid container>
            <AdminHeader />
            <Grid item sx={{
                display: 'flex',
            }}>
                <Box>
                    <AdminAside />
                </Box>
                <Paper elevation={10} sx={{
                    height: 575,
                    marginTop: 1,
                    width: 1065

                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
                        <Typography variant='h6' component={Box} sx={{
                            fontWeight: 700
                        }}>
                            TURF DETAILS
                        </Typography>
                        <Fab color="success" size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                            <AddIcon onClick={()=>navigate('/turfadd')} />
                        </Fab>
                    </Box>
                    <Box sx={{ marginTop: '-40px' }}>

                        {
                            isMatch ? (
                                <TableContainer component={Paper} sx={{ width: 330, marginTop: '50px', marginLeft: '7%' }}>
                                    <Table sx={{ width: 900 }} aria-label="simple table">
                                        <TableHead sx={{ backgroundColor: '#0037ff6e' }}>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell >Center Name</TableCell>
                                                <TableCell >Conatct No.</TableCell>
                                                <TableCell >Location</TableCell>
                                                <TableCell >Category</TableCell>
                                                <TableCell >Price/hr</TableCell>
                                                <TableCell align="center" colSpan={2}>
                                                    Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {turf.filter((data) => {
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
                                                        <TableCell >{data.centername}</TableCell>
                                                        <TableCell >{data.phone}</TableCell>
                                                        <TableCell >{data.location}</TableCell>
                                                        <TableCell >{data.category}</TableCell>
                                                        <TableCell >{data.price}</TableCell>
                                                        <TableCell colSpan={2}>Actions</TableCell>
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
                            ) : (
                                <TableContainer component={Paper} style={tableStyle}>
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
                            )
                        }
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Turfpage
