import {
    Paper, useTheme, useMediaQuery, TableContainer, Table, 
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

function Category() {
    const [category, setCategory] = useState([])
    const { search } = useContext(SearchContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const tableStyle = { width:'95%', margin: '15px auto', }

    //category management get request
    const getCategoryData = async () => {
        try {
            const data = await axios.get("admin_panel/category")
            setCategory(data.data.category)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("admintoken")
        if (!token) {
            navigate('/adminlogin')
        } else {
            getCategoryData();
        }
        return () => {
        }
    }, [navigate])

    //category management update turfs refquest
    const editCategory = (id) => {
        navigate('/categoryupdate', { state: { id: id } })
    }

    //category management delete turf details
    const deleteCategory = (id) => {
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
                axios.delete(`admin_panel/category/delete_category/${id}`)
                    .then((res) => {
                        setCategory(res.data.category)
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
    <Paper elevation={5} sx={{
        backgroundColor:'rgba(255, 255, 255, 0.8)',
        height: 575,
        marginTop: 1,
        width: 1065

    }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
            <Typography variant='h6' component={Box} sx={{
                fontWeight: 700
            }}>
                CATEGORY DETAILS
            </Typography>
            <Fab color="success" size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                <AddIcon onClick={()=>navigate('/categoryadd')} />
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
                                    <TableCell >Location</TableCell>
                                    <TableCell >Category</TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {category.filter((data) => {
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
                                            <TableCell >{data.centername}</TableCell>
                                            <TableCell >{data.location}</TableCell>
                                            <TableCell >{data.category}</TableCell>
                                            <TableCell colSpan={2}>Actions</TableCell>
                                            <TableCell >
                                                <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                    <EditIcon onClick={() => editCategory(data._id)} />
                                                </Fab>
                                            </TableCell>
                                            <TableCell >
                                                <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                    <DeleteIcon onClick={() => deleteCategory(data._id)} />
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
                                    <TableCell align="center" >Location</TableCell>
                                    <TableCell align="center" >Category</TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {category.filter((data) => {
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
                                            <TableCell align="center" >{data.location}</TableCell>
                                            <TableCell align="center" >{data.category}</TableCell>
                                            <TableCell >
                                                <Fab color='primary' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                    <EditIcon onClick={() => editCategory(data._id)} />
                                                </Fab>
                                            </TableCell>
                                            <TableCell >
                                                <Fab color='error' size='small' component={Box} aria-label="add" sx={{ marginTop: '-6px' }}>
                                                    <DeleteIcon onClick={() => deleteCategory(data._id)} />
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
  )
}

export default Category