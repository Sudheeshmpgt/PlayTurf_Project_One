import { Grid, Box, Paper } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import imageOne from '../../Images/imgOne.jpg'
import './TurfList.css'
import { useNavigate } from 'react-router-dom';

function TurfList() {

    const navigate= useNavigate();
    const handleClick =()=>{
        navigate('/turfview')
    }

    return (
        <Paper
            className='scrollbar-hidden'
            style={{
                margin: '12px auto',
                maxHeight: 600, maxWidth: '98.5%',
                overflow: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.25)'
            }}>
            <Paper sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
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
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Mac Miller
                            </Typography>
                            <CardActions>
                                <Button variant='contained'
                                onClick={handleClick}
                                    color='secondary'
                                    sx={{ marginLeft:'auto', marginRight:'auto', marginTop:'70%' }}>
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
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" textAlign='right'>
                                Mac Miller
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
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Mac Miller
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
                            image={imageOne}
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
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" textAlign='right'>
                                Mac Miller
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
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Mac Miller
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
                            image={imageOne}
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
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" textAlign='right'>
                                Mac Miller
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
            </Grid>
        </Paper>

    )
}

export default TurfList