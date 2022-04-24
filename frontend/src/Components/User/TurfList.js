import { Grid, Paper } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import imageOne from '../../Images/Court1.jpg'
import imageTwo from '../../Images/Court2.jpg'
import './TurfList.css'
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosinstance'
import { TurfContext } from '../../Store/turfcontext';
import {FilterContext} from '../../Store/filtercontext'
import {FilterCategoryContext} from '../../Store/filtercategorycontrext'
import { FilterPriceContext } from '../../Store/filterpricecontext';

function TurfList() {
    const {turf, setTurf} = useContext(TurfContext)
    const {filters} = useContext(FilterContext) 
    const {filterCategory} = useContext(FilterCategoryContext)
    const {filterPrice} = useContext(FilterPriceContext)

    const getTurfData = async () => {
        try {
            const data = await axios.get("admin_panel/turfs")
            setTurf(data.data.turf)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getTurfData();
        return () => {
        }
    }, [])

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/turfview')
    }

    return (
        <Paper
            className='scrollbar-hidden'
            style={{
                margin: '12px auto',
                maxHeight: 600, maxWidth: '98.5%',
                overflow: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                borderRadius: '2px'
            }}>
            <Paper elevation={2} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '1px' }}>
                <Typography
                    variant='h2'
                    p={1.5}
                    textAlign='center'
                    fontFamily='sans-serif'
                    fontSize={27}
                    fontWeight={600}
                    color='text.secondary'
                >
                    AVAILABLE TURFS
                </Typography>
            </Paper>
            <Grid container >
                {
                    turf.filter((data)=>{
                        if(filters === ""){
                            return data
                        }
                        else if (data.location.includes(filters)){
                            return data 
                        }
                    }).filter((data)=>{
                        if (filterCategory === ""){
                            return data
                        }
                        else if (data.category.includes(filterCategory)){
                            return data
                        }
                    }).filter((data)=>{
                        if (filterPrice === ""){ 
                            return data 
                        }
                        else if (data.price < filterPrice){
                            return data
                        }
                    })
                    .map((data, index) => (
                        !(index % 2) ? (
                        <Grid item xs={12} md={6} p={1}>
                            <Card sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                height: 215,
                                m: '12px 0',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)'
                            }}>
                                <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}} >
                                    <Typography component="div" variant="h5" fontSize={20}  fontWeight={800} color='secondary'>
                                        {data.centername}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {data.location}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.primary" fontWeight={600} component="div" marginTop='5%' borderBottom={1}>
                                        Available grounds
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {data.category}
                                    </Typography>
                                    <CardActions>
                                        <Button variant='contained'
                                            onClick={handleClick}
                                            color='secondary'
                                            sx={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '20%' }}>
                                            Book Now
                                        </Button>
                                    </CardActions>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 230 }}
                                    image={imageOne}
                                    alt="Live from space album cover"
                                />
                            </Card>
                        </Grid>
                        ): (
                            <Grid item xs={12} md={6} p={1}>
                    <Card sx={{ display: 'flex', height: 215, m: '12px 0', backgroundColor: 'rgba(255, 255, 255, 0.95)', justifyContent:'space-between' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 230 }}
                            image={imageTwo}
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}  >
                        <Typography component="div" variant="h5" fontSize={20}  fontWeight={800} color='secondary'>
                                        {data.centername}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {data.location}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.primary" fontWeight={600} component="div" marginTop='5%' borderBottom={1}>
                                        Available grounds
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {data.category}
                                    </Typography>
                            <CardActions>
                                <Button variant='contained'
                                onClick={handleClick}
                                    color='secondary'
                                    sx={{ marginLeft:'auto', marginRight:'auto', marginTop:'20%' }}
                                    >
                                    Book Now
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
                        )
                    ))
                }

                {/* <Grid item xs={12} md={6} p={1}>
                    <Card sx={{ display: 'flex', height: 215, m: '12px 0', backgroundColor: 'rgba(255, 255, 255, 0.95)', justifyContent:'space-between' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 230 }}
                            image={imageTwo}
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{display:'flex', flexDirection:'column'}} >
                            <Typography component="div" variant="h5" textAlign='right'>
                                Sports arena
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" textAlign='right'>
                                Kochi
                            </Typography>
                            <CardActions>
                                <Button variant='contained'
                                onClick={handleClick}
                                    color='secondary'
                                    sx={{ marginLeft:'auto', marginRight:'auto', marginTop:'70%' }}
                                    >
                                    Book Now
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} p={1}>
                    <Card sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height:215,
                        m: '12px 0',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}>
                        <CardContent>
                            <Typography component="div" variant="h5">
                                Sports grounds
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Kochi
                            </Typography>
                            <CardActions>
                                <Button variant='contained'
                                    color='secondary'
                                    sx={{ marginLeft:'auto', marginRight:'auto', marginTop:'70%' }}>
                                    Book Now
                                </Button>
                            </CardActions>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{ width: 230 }}
                            image={imageThree}
                            alt="Live from space album cover"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} p={1}>
                    <Card sx={{ display: 'flex', height: 215, m: '12px 0', backgroundColor: 'rgba(255, 255, 255, 0.95)', justifyContent:'space-between' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 230 }}
                            image={imageOne}
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{display:'flex', flexDirection:'column'}} >
                            <Typography component="div" variant="h5" textAlign='right'>
                                ADK turfs
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" textAlign='right'>
                                Kakkanad
                            </Typography>
                            <CardActions>
                                <Button variant='contained'
                                    color='secondary'
                                    sx={{ marginLeft:'auto', marginRight:'auto', marginTop:'70%' }}
                                    >
                                    Book Now
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} p={1}>
                    <Card sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height:215,
                        m: '12px 0',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}>
                        <CardContent>
                            <Typography component="div" variant="h5">
                                Tiger Sports
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Kochi
                            </Typography>
                            <CardActions>
                                <Button variant='contained'
                                    color='secondary'
                                    sx={{ marginLeft:'auto', marginRight:'auto', marginTop:'70%' }}>
                                    Book Now
                                </Button>
                            </CardActions>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{ width: 230 }}
                            image={imageTwo}
                            alt="Live from space album cover"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} p={1}>
                    <Card sx={{ display: 'flex', height: 215, m: '12px 0', backgroundColor: 'rgba(255, 255, 255, 0.95)', justifyContent:'space-between' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 230 }}
                            image={imageThree}
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{display:'flex', flexDirection:'column'}} >
                            <Typography component="div" variant="h5" textAlign='right'>
                                Arena xyz
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" textAlign='right'>
                                Kochi
                            </Typography>
                            <CardActions>
                                <Button variant='contained'
                                    color='secondary'
                                    sx={{ marginLeft:'auto', marginRight:'auto', marginTop:'70%' }}
                                    >
                                    Book Now
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>  */}
            </Grid>
        </Paper>

    )
}

export default TurfList