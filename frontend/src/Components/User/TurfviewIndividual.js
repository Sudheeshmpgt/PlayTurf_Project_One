import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Button, Box, Paper, Fab, TextField } from '@mui/material'
import React, { useState } from 'react'
import imageOne from '../../Images/Court5.jpg'
import imageTwo from '../../Images/Court7.jpg'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useNavigate } from 'react-router-dom';
import './TurfList.css'

function TurfviewIndividual() {
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const navigate = useNavigate()

    const goBack = () =>{
        navigate('/turf')
    }
    return (
        <Paper sx={{ m: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius:'1px'}}>
            <Grid container p={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: 525, m: 1, px: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.87)', borderRadius:'2px'}}>
                        <CardContent>
                            <Typography
                                variant="h1"
                                textAlign='center'
                                color='text.secondary'
                                fontFamily='Atkinson Hyperlegible, sans-serif'
                                fontWeight={600}>
                                Tiger Sports
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '85%', height: '25%', m: '5px 10px' }}
                                    image={imageTwo}
                                    alt="Live from space album cover" />
                                <CardMedia
                                    component="img"
                                    sx={{ width: '85%', height: '25%', m: '5px 10px' }}
                                    image={imageOne}
                                    alt="Live from space album cover" />
                                <CardMedia
                                    component="img"
                                    sx={{ width: '85%', height: '25%', m: '5px 10px' }}
                                    image={imageOne}
                                    alt="Live from space album cover" />
                            </Box>
                            <Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '95%', height: '80%', m: .5 }}
                                    image={imageTwo}
                                    alt="Live from space album cover" />
                            </Box>
                        </Box>
                        <CardContent sx={{ marginTop: '-45px' }}>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                                Contact: 9089786756
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                                Email : tigersports@gmail.com
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                                Location: Kakkanad
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: 525, m: 1, backgroundColor: 'rgba(255, 255, 255, 0.87)', borderRadius:'2px' }}>
                        <CardContent>
                            <Typography
                                variant="h1"
                                color='text.secondary'
                                textAlign='center'
                                fontFamily='Atkinson Hyperlegible, sans-serif'>
                                Booking
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Fab sx={{ marginRight: 3 }}>
                                <SportsSoccerIcon sx={{ fontSize: 32 }} />
                            </Fab>
                            <Fab>
                                <SportsCricketIcon sx={{ fontSize: 32 }} />
                            </Fab>
                        </CardActions>
                        <CardContent>
                            <Paper  className='scrollbar-hidden'>
                                <Button variant='contained' size='small' sx={{margin:1}}>9:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>10:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>11:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>12:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>1:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>2:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>3:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>4:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>5:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>6:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>7:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>8:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>9:00</Button>
                                <Button variant='contained' size='small' sx={{margin:1}}>10:00</Button>
                            </Paper>
                        </CardContent>
                        <CardContent>
                            <CardActions>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Select Date"
                                        value={date}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </CardActions>
                            <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="Start Time"
                                        value={startTime}
                                        onChange={(newValue) => {
                                            setStartTime(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <TimePicker
                                        label="End Time"
                                        value={endTime}
                                        onChange={(newValue) => {
                                            setEndTime(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </CardActions>
                            <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
                                <Button variant='contained'
                                    color='secondary'
                                    onClick={goBack}
                                    // sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                                    >
                                    Back
                                </Button>
                                <Button variant='contained'
                                    color='secondary'
                                    // sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                                    >
                                    Book Now
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>

    )
}

export default TurfviewIndividual