import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbarExport } from '@mui/x-data-grid';
import { Box, Paper, TableContainer, Typography } from '@mui/material';
import axios from '../../axiosinstance'
import { useNavigate } from 'react-router-dom';

function SalesReport() {

    const navigate = useNavigate()
    const [booking, setBooking] = useState([])

    const getBookingData = async () => {
        try {
            const data = await axios.get("admin_panel/booking",
                {
                    headers: {
                        'authToken': localStorage.getItem("admintoken")
                    }
                })
            setBooking(data.data.booking)
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
    }, [])
    const columns = [
        { field: 'id', headerClassName: 'super-app-theme--header', headerName: 'ID', width: 75 },
        {
            field: 'centerName',
            headerClassName: 'super-app-theme--header',
            headerName: 'Center Name',
            width: 185,
            editable: true,
        },
        {
            field: 'category',
            headerClassName: 'super-app-theme--header',
            headerName: 'Category',
            width: 140,
            editable: true,
        },
        {
            field: 'date',
            headerClassName: 'super-app-theme--header',
            headerName: 'Date',
            width: 130,
            editable: true,
        },
        {
            field: 'paymentMode',
            headerClassName: 'super-app-theme--header',
            headerName: 'Payment Mode',
            width: 150,
            editable: true,
        },
        {
            field: 'total',
            headerClassName: 'super-app-theme--header',
            headerName: 'Total',
            type: 'number',
            width: 130,
            editable: true,
        },
        {
            field: 'status',
            headerClassName: 'super-app-theme--header',
            headerName: 'Status',
            width: 140,
            editable: true,
        },
    ];

    const rows = booking.map((data, index) => (
        {
            id: index + 1,
            centerName: data.turfDetails[0].centername,
            category: data.turfDetails[0].category,
            date: data.date,
            paymentMode: data.paymentMode,
            total: data.totalPrice,
            status: data.status
        }
    ))

    return (
        <Paper elevation={3} sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            height: 577,
            margin: 1,
            width: {
                xs:350,
                sm:880,
                md:1055
            },
            borderRadius: '1px',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
                <Typography variant='h6' component={Box} sx={{
                    fontWeight: 700
                }}>
                    SALES REPORT
                </Typography>
            </Box>
            <TableContainer className='scrollbar-hidden' component={Paper} style={{ width: '95%', margin: '-20px auto', height: 401.9, overflow: 'scroll' }}>
                <Box sx={{
                    height: 401.9,
                    width: 1,
                    '& .super-app-theme--header': {
                        backgroundColor: '#0037ff6e',
                    },
                }}>
                    <DataGrid

                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        components={{ Toolbar: GridToolbarExport }}
                        disableSelectionOnClick
                    >
                    </DataGrid>
                </Box>
            </TableContainer>
        </Paper>

    );
}

export default SalesReport