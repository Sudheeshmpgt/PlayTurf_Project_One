import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Button, Box, Paper, Fab, TextField } from '@mui/material'
import React, { useState } from 'react'
import imageOne from '../../Images/imgOne.jpg'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function TurfviewIndividual() {
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    return (
        <Paper sx={{ m: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <Grid container p={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: 525, m: 1, px: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.87)' }}>
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
                                    image={imageOne}
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
                                    sx={{ width: '95%', height: '83%', m: .5 }}
                                    image={imageOne}
                                    alt="Live from space album cover" />
                            </Box>
                        </Box>
                        <CardContent sx={{ marginTop: '-30px' }}>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                                Contact:
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                                Email :
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                                Address:
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: 525, m: 1, backgroundColor: 'rgba(255, 255, 255, 0.87)' }}>
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
                                <SportsSoccerIcon sx={{ fontSize: 40 }} />
                            </Fab>
                            <Fab>
                                <SportsCricketIcon sx={{ fontSize: 40 }} />
                            </Fab>
                        </CardActions>
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