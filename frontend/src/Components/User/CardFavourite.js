import React from 'react'
import { Card, Grid, CardContent, CardActions, Button, Typography } from '@mui/material'
import { Box } from '@mui/system'



function CardFavourite() {
    return (
        <Grid container>
            {/* <Paper elevation={3} sx={{margin:'20px auto', width:'96.5%', backgroundColor:'rgba(99,99,99,0.5)'}}> */}
            <Typography
                component='Box'
            // sx={{marginLeft:'auto',
            // marginRight:'auto',
            // }}
            >
                <h1 style={{ marginTop: '20px', marginLeft: '30px', color: '#FF5A09', fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>
                    OFFERS
                </h1>
            </Typography>
            <Grid container
                columnSpacing={5}
                maxWidth='xl'
                px={{ xs: 3, sm: 3 }}
                py={{ xs: 3, sm: 3 }}
                sx={{
                    marginBottom: '5px',
                    // margin:'30px 10px',
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}>
                <Grid item xs={12} md={2.4} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
                    <Box>
                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                    alt='football court'
                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                            </CardContent>
                            <Typography variant='h3' sx={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                             Sports Grounds
                            </Typography>
                            <CardActions>
                                <Grid container sx={{ display: 'flex',justifyContent: 'center' }}>
                                    <Grid item >
                                       <Typography textAlign= 'center' >
                                           20% OFF on Cricket Grounds
                                       </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color='secondary' sx={{ color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop:1 }}>Book</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} md={2.4} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
                    <Box>
                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }} >
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                    alt='football court'
                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                            </CardContent>
                            <Typography variant='h3' sx={{ marginTop: 0.1, marginBottom: 0.1, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                Tiger Sports
                            </Typography>
                            <CardActions>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item >
                                    <Typography textAlign='center'>
                                           10% Off on football accessories
                                       </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop:1 }}>Book</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} md={2.4} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
                    <Box>
                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                    alt='football court'
                                    src='https://5.imimg.com/data5/UF/VO/WA/SELLER-2751211/fifa-certified-artificial-football-grass-500x500.jpg'></img>
                            </CardContent>
                            <Typography variant='h3' sx={{ marginTop: 0.1, marginBottom: 0.1, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                Sports arena
                            </Typography>
                            <CardActions>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item >
                                    <Typography textAlign='center'>
                                           15% Off on football accessories
                                       </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5,  marginTop:1 }}>Book</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} md={2.4} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
                    <Box>
                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }} >
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                    alt='football court'
                                    src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img>
                            </CardContent>
                            <Typography variant='h3' sx={{ marginTop: 0.1, marginBottom: 0.1, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                Tiger Sports
                            </Typography>
                            <CardActions>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item >
                                    <Typography textAlign='center'>
                                           10% Off on football accessories
                                       </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5, marginTop:1 }}>Book</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} md={2.4} sx={{ width: 250 }} pt={{ xs: 3, sm: 0 }} pb={{ xs: 3, sm: 3 }}>
                    <Box>
                        <Card varient='outlined' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '2px', height: 325 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img style={{ height: '98%', width: '98%', margin: '3px auto', borderRadius: 1 }}
                                    alt='football court'
                                    src='https://5.imimg.com/data5/UF/VO/WA/SELLER-2751211/fifa-certified-artificial-football-grass-500x500.jpg'></img>
                            </CardContent>
                            <Typography variant='h3' sx={{ marginTop: 0.1, marginBottom: 0.1, textAlign: 'center', fontWeight: 900, color: 'black' }}>
                                Sports arena
                            </Typography>
                            <CardActions>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item >
                                    <Typography textAlign='center'>
                                           15% Off on football accessories
                                       </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color='secondary' sx={{ backgroundColor: 'rgba(255, 90, 9)', color: 'black', fontSize: '0.9rem', fontWeight: 800, marginRight: 1.5,  marginTop:1 }}>Book</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
            {/* </Paper> */}
        </Grid>

    )
}

export default CardFavourite
