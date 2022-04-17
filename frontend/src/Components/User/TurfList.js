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

function TurfList() {
    return (
        <Grid container>
            <Paper className='scrollbar-hidden' style={{ margin: '12px auto', maxHeight: 600, width: 1031, overflow: 'auto' }}>
                <Grid item xs={12} md={6} p={2.5}>
                    <Card sx={{ display: 'flex', justifyContent: 'space-between', height: 300 }}>
                        <CardContent>
                            <Typography component="div" variant="h5">
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Mac Miller
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{ width: 300 }}
                            image={imageOne}
                            alt="Live from space album cover"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} p={2.5}>
                    <Card sx={{ display: 'flex', height: 300 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 300 }}
                            image={imageOne}
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Mac Miller
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} p={2.5}>
                    <Card sx={{ display: 'flex', justifyContent: 'space-between', height: 300 }}>
                        <CardContent>
                            <Typography component="div" variant="h5">
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Mac Miller
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{ width: 300 }}
                            image={imageOne}
                            alt="Live from space album cover"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} p={2.5}>
                    <Card sx={{ display: 'flex', height: 300 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 300 }}
                            image={imageOne}
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Mac Miller
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} p={2.5}>
                    <Card sx={{ display: 'flex', justifyContent: 'space-between', height: 300 }}>
                        <CardContent>
                            <Typography component="div" variant="h5">
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Mac Miller
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{ width: 300 }}
                            image={imageOne}
                            alt="Live from space album cover"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} p={2.5}>
                    <Card sx={{ display: 'flex', height: 300 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 300 }}
                            image={imageOne}
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Mac Miller
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default TurfList