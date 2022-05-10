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
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CallIcon from '@mui/icons-material/Call';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function TurfviewIndividual() {
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [morningTimeslots, setMorningTimeslots] = useState([])
    const [eveningTimeslots, setEveningTimeslots] = useState([])
    const [prevBooking, setPrevBooking] = useState([])
    const [prevTime, setPrevTime] = useState([])
    const [offer, setOffer] = useState([])
    const [firstOffer, setFirstOffer] = useState('')
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
        let startingTime = moment(fromTime, 'hh:mm A')
        let endingTime = moment(toTime, 'hh:mm A')
        if (endingTime.isBefore(startingTime)) {
            endingTime.add(1, 'day')
        }
        let arrM = [];
        while (startingTime <= endingTime) {
            arrM.push(new moment(startingTime).format('hh:mm A'));
            startingTime.add(60, 'minutes');
        }
        return arrM;
    }

    useEffect(() => {
        const turfId = location.state.id
        axios.get(`user/offers/edit_offers/${turfId}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                setOffer(res.data.offer[0])
            })
            .catch((err) => {
                alert(err)
            })
    }, [turfView])

    useEffect(() => {
        const turfId = location.state.id
        const formatDate = moment(date).format('DD-MM-YYYY')
        let arr = []
        arr = prevBooking.filter((data) => {
            if (data.centerId == turfId) {
                return data
            }
        })

        let dateArr = arr.map((data) => {
            if (data.date == formatDate)
                return data.startTime
        })
        setPrevTime(dateArr)

    }, [date])

    const createEveningTimeSlots = (fromTime, toTime) => {
        let startingTime = moment(fromTime, 'hh:mm A')
        let endingTime = moment(toTime, 'hh:mm A')
        if (endingTime.isBefore(startingTime)) {
            endingTime.add(1, 'day')
        }
        let arrE = [];
        while (startingTime <= endingTime) {
            arrE.push(new moment(startingTime).format('hh:mm A'));
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

        axios.get("/admin_panel/booking",
            {
                headers: {
                    'authToken': localStorage.getItem("usertoken")
                }
            })
            .then((res) => {
                setPrevBooking(res.data.booking)
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
        let totalPrice;
        
        axios.get(`user/check_first_offer/?id=${userId}`,{
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
        .then((res)=>{
            if(res.data.message === 'Eligible'){
                setFirstOffer(50)
            }
        })

        const dateFormated = moment(date).format('DD-MM-YYYY HH:MM:SS').split(' ')
        const startTimeHour = moment(startTime).format('hh:mm A')
        const endTimeHour = moment(endTime).format('hh:mm A')
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
        }else if(nowdate == dateFormated[0] && (moment(startTime).isBefore(date))){
            Toast.fire({
                icon: 'error',
                title: 'Please choose valid time'
            })
        }else if ((endTimeHour === startTimeHour)) {
            Toast.fire({
                icon: 'error',
                title: 'Please choose valid time'
            })
        } else if (startHour === '12' || startHour === '01' || startHour === '02' || startHour === '03') {
            Toast.fire({
                icon: 'error',
                title: 'Please choose valid time'
            })
        } else if (prevTime.includes(startTimeHour)) {
            Toast.fire({
                icon: 'error',
                title: 'Slot is Already Booked'
            })
        }else if(hours > 3){
            Toast.fire({
                icon: 'warning',
                title: 'Maximum booking time is 3 hours'
            })
        }else {
            if (offer) {
                const toDate = offer.toDate
                const offer_Percent = offer.offerPercent
                const one = moment(toDate).isBefore(nowdate)
                if (!one) {
                    const offerPrice = turfView.price * hoursRound * offer_Percent / 100
                    totalPrice = turfView.price * hoursRound - offerPrice
                } else {
                    totalPrice = turfView.price * hoursRound
                }
            } else {
                totalPrice = turfView.price * hoursRound
            }
            
            if(firstOffer){
               const offerPrice = turfView.price * hoursRound * firstOffer / 100
                totalPrice = turfView.price * hoursRound - offerPrice
            }

            const values = {
                centerId: turfView._id,
                createdBy: user ? user._id : userId,
                date: dateFormated[0],
                startTime: startTimeHour,
                endTime: endTimeHour,
                totalPrice: totalPrice,
                offer: offer && offer.offerPercent
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
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const goBack = () => {
        navigate('/turf')
    }

    //className='scrollbar-hidden'
    return (
        <Paper sx={{ m: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px' }}>
            <Grid container p={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: 515, m: 1, px: 0, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.87)', borderRadius: '2px' }}>
                        <CardMedia
                            component="img"
                            height={350}
                            image={turfView.turfPictures}
                            alt="turf image" />
                        <Typography
                            fontSize={28}
                            textAlign='center'
                            color='secondary'
                            fontFamily='Atkinson Hyperlegible, sans-serif'
                            fontWeight={900}
                            mt={2.5}>
                            {turfView.centername}
                        </Typography>
                        <CardContent sx={{ marginTop: '1px', display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Box display='flex'>
                                    <CallIcon color='secondary' sx={{ fontSize: 22, mt: 0.4 }} />
                                    <Typography variant="subtitle1" color="text.primary" component="div" fontWeight={600} ml={1.3}>
                                        {turfView.phone}
                                    </Typography>
                                </Box>
                                <Box display='flex' mt={1}>
                                    <MyLocationIcon color='secondary' sx={{ fontSize: 22, mt: 0.4 }} />
                                    <Typography variant="subtitle1" color="text.primary" component="div" fontWeight={600} ml={1.3}>
                                        {turfView.location}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display='flex'>
                                <CurrencyRupeeIcon sx={{ fontSize: 22, mt: 0.4 }} />
                                <Typography variant="subtitle1" color="text.primary" component="div" fontWeight={600}>
                                    {turfView.price}
                                </Typography>
                            </Box>

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
                                                <Box>
                                                    <Button
                                                        component='button'
                                                        m={0.5}
                                                        disabled={prevTime.includes(data)}
                                                        color='secondary'
                                                    >
                                                        <Typography
                                                            fontSize={14.5}
                                                            fontWeight={600}>
                                                            {data}
                                                        </Typography>
                                                    </Button>
                                                </Box>
                                            ))) : (
                                            value === 'Evening' ? (
                                                eveningTimeslots.map((data, index) => (
                                                    <Box>
                                                        <Button
                                                            component='button'
                                                            m={0.5}
                                                            disabled={prevTime.includes(data)}
                                                            color='secondary'
                                                        >
                                                            <Typography
                                                                fontSize={14.5}
                                                                fontWeight={600}>
                                                                {data}
                                                            </Typography>
                                                        </Button>
                                                    </Box>
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
                                            if (clockType === 'minutes' && timeValue % 60) {
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
                                >
                                    Back
                                </Button>
                                <Button variant='contained'
                                    color='secondary'
                                    onClick={handleClick}
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