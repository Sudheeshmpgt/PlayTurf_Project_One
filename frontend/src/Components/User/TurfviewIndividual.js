import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Button, Box, Paper, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useLocation, useNavigate } from 'react-router-dom';
import './TurfList.css'
import { TurfViewContext } from '../../Store/turfviewcontext';
import { UserContext } from '../../Store/usercontext'
import axios from '../../axiosinstance'
import moment from 'moment'
import { BookingContext } from '../../Store/bookingcontext';
import Swal from 'sweetalert2';

function TurfviewIndividual() {
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [morningTimeslots, setMorningTimeslots] = useState([])
    const [eveningTimeslots, setEveningTimeslots] = useState([])
    const [value, setValue] = useState('Morning')
    const navigate = useNavigate()
    const location = useLocation()
    const { turfView, setTurfView } = useContext(TurfViewContext)
    const { user } = useContext(UserContext)
    const { setBooking } = useContext(BookingContext)

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        width: '400px',
        showConfirmButton: false,
        timer: 4000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const createMorningTimeSlots = (fromTime, toTime) => {
        let startingTime = moment(fromTime, 'hh:mm ')
        let endingTime = moment(toTime, 'hh:mm ')
        if (endingTime.isBefore(startingTime)) {
            endingTime.add(1, 'day')
        }
        let arrM = [];
        while (startingTime <= endingTime) {
            arrM.push(new moment(startingTime).format('hh:mm '));
            startingTime.add(60, 'minutes');
        }
        return arrM;
    }

    const createEveningTimeSlots = (fromTime, toTime) => {
        let startingTime = moment(fromTime, 'hh:mm ')
        let endingTime = moment(toTime, 'hh:mm ')
        if (endingTime.isBefore(startingTime)) {
            endingTime.add(1, 'day')
        }
        let arrE = [];
        while (startingTime <= endingTime) {
            arrE.push(new moment(startingTime).format('hh:mm '));
            startingTime.add(60, 'minutes');
        }
        return arrE;
    }

    useEffect(() => {
        let arrM = createMorningTimeSlots('05:00 ', '11:00 ')
        setMorningTimeslots(arrM)
        let arrE = createEveningTimeSlots('16:00 ', '22:00 ')
        setEveningTimeslots(arrE)
        const id = location.state.id
        axios.get(`admin_panel/turfs/edit_turfs/${id}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                setTurfView(res.data.turf[0])
            })
    }, [])

    const userId = localStorage.getItem("userId")


    const handleClick = () => {

        if (date == null || startTime == null || endTime == null) {
            Toast.fire({
                icon: 'error',
                title: 'Please choose valid date and Time'
            })
        }

        const dateFormated = moment(date).format('DD-MM-YYYY HH:MM:SS').split(' ')
        const startTimeHour = moment(startTime).format('DD-MM-YYYY HH:MM').split(' ')
        const endTimeHour = moment(endTime).format('DD-MM-YYYY HH:MM').split(' ')
        const nowdate = moment().format('DD-MM-YYYY')
        const startHour = moment(startTime).format('DD-MM-YYYY hh').split(' ')
        const duration = moment.duration(endTime.diff(startTime) + 0.2)
        const hours = duration.asHours()
        const hoursRound = Math.round(hours)

    
        if (dateFormated[0] < nowdate) {
            Toast.fire({
                icon: 'error',
                title: 'Please choose valid date'
            })
        } else if ((endTimeHour[1] === startTimeHour[1])) {
            Toast.fire({
                icon: 'error',
                title: 'Please choose valid time'
            })
        } else if (startHour === '12' || startHour === '01' || startHour === '02' || startHour === '03') {
            Toast.fire({
                icon: 'error',
                title: 'Please choose valid time'
            })
        }

        const totalPrice = turfView.price * hoursRound

        const values = {
            centerId: turfView._id,
            createdBy: user ? user._id : userId,
            date: dateFormated[0],
            startTime: startTimeHour[1],
            endTime: endTimeHour[1],
            totalPrice: totalPrice
        }
        axios.get(`admin_panel/booking/check/?centerId=${turfView._id}&date=${dateFormated[0]}&startTime=${startTimeHour[1]}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                if (res.data.message) {
                    setBooking(values)
                    navigate('/bookingpage')
                } else {
                    const message = res.data.error
                    Toast.fire({
                        icon: 'warning',
                        title: message
                    })
                }
            })
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const goBack = () => {
        navigate('/turf')
    }

    //className='scrollbar-hidden'
    return (
        <Paper sx={{ m: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '1px' }}>
            <Grid container p={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: 515, m: 1, px: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.87)', borderRadius: '2px' }}>
                        <CardContent>
                            <Typography
                                variant="h1"
                                textAlign='center'
                                color='secondary'
                                fontFamily='Atkinson Hyperlegible, sans-serif'
                                fontWeight={600}>
                                {turfView.centername}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                {/* <CardMedia
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
                                    alt="Live from space album cover" /> */}
                            </Box>
                            <Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 600, height: 300, m: .5 }}
                                    image={turfView.turfPictures}
                                    alt="Live from space album cover" />
                            </Box>
                        </Box>
                        <CardContent sx={{ marginTop: '15px' }}>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                                Contact: {turfView.phone}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                                Location: {turfView.location}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight={600}>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: 515, m: 1, backgroundColor: 'rgba(255, 255, 255, 0.87)' }}>
                        <CardContent>
                            <Typography
                                variant="h1"
                                color='secondary'
                                textAlign='center'
                                fontFamily='Atkinson Hyperlegible, sans-serif'>
                                Booking
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', marginTop: -3 }}>
                                <Typography
                                    sx={{ marginBottom: 0.5 }}
                                    fontSize={15}
                                    fontWeight={600}
                                >
                                    Date
                                </Typography>
                                <CardActions>
                                    <LocalizationProvider dateAdapter={AdapterMoment} >
                                        <DatePicker
                                            sx={{ marginTop: -3 }}
                                            label="Select Date"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField  {...params} />}
                                        />
                                    </LocalizationProvider>
                                </CardActions>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: -2 }}>
                                <FormControl>
                                    <FormLabel id='section-group-label'
                                        sx={{
                                            color: 'black',
                                            marginBottom: 1,
                                            fontSize: 15,
                                            fontWeight: 600,
                                            marginLeft: 1
                                        }}
                                    >
                                        Sections
                                    </FormLabel>
                                    <RadioGroup
                                        name='sections-group'
                                        aria-labelledby='section-group-label'
                                        value={value}
                                        onChange={handleChange}
                                        row
                                        sx={{ marginLeft: 3 }}
                                    >
                                        <FormControlLabel control={<Radio color='secondary' />} label='Morning' value='Morning' />
                                        <FormControlLabel control={<Radio color='secondary' />} label='Evening' value='Evening' />
                                    </RadioGroup>
                                </FormControl>
                            </CardActions>
                            {/* </CardContent> */}
                            <CardContent sx={{ marginTop: -4 }}>
                                <Typography
                                    fontSize={15}
                                    fontWeight={600}
                                    margin='15px 0'>
                                    Available Time Slots
                                </Typography>
                                <Paper sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    {
                                        value === 'Morning' ? (
                                            morningTimeslots.map((data, index) => (
                                                <Paper
                                                    component="span"
                                                    sx={{ margin: 1, backgroundColor: 'secondary.light', p: 1, fontFamily: 'sans-serif' }}>
                                                    {data}
                                                </Paper>
                                            ))) : (
                                            value === 'Evening' ? (
                                                eveningTimeslots.map((data, index) => (
                                                    <Paper
                                                        component="span"
                                                        sx={{ margin: 1, backgroundColor: 'secondary.light', p: 1, fontFamily: 'sans-serif' }}>
                                                        {data}
                                                    </Paper>
                                                ))) :
                                                (
                                                    <Typography>No available time slots</Typography>
                                                )
                                        )
                                    }

                                </Paper>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 1 }} >
                                <Box>
                                    <Typography
                                        fontSize={15}
                                        fontWeight={600}
                                    >
                                        From
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        fontSize={15}
                                        fontWeight={600}
                                    >
                                        To
                                    </Typography>
                                </Box>
                            </Box>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <TimePicker
                                        label="Start Time"
                                        value={startTime}
                                        onChange={(newValue) => {
                                            setStartTime(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                        shouldDisableTime={(timeValue, clockType) => {
                                            if (clockType === 'minutes' && timeValue % 30) {
                                                return true;
                                            }
                                            return false;
                                        }}
                                    />
                                    <TimePicker
                                        label="End Time"
                                        value={endTime}
                                        onChange={(newValue) => {
                                            setEndTime(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                        shouldDisableTime={(timeValue, clockType) => {
                                            if (clockType === 'minutes' && timeValue % 30) {
                                                return true;
                                            }
                                            return false;
                                        }}
                                    />
                                </LocalizationProvider>
                            </CardActions>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant='contained'
                                    color='secondary'
                                    onClick={goBack}
                                // sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                                >
                                    Back
                                </Button>
                                <Button variant='contained'
                                    color='secondary'
                                    onClick={handleClick}
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