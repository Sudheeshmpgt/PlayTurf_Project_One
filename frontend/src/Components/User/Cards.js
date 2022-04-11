import React from 'react'
import { Card, Grid, Typography, CardContent, CardActions, Button } from '@mui/material'
import { Box } from '@mui/system'

function Cards() {


    return (
<Grid container 
        columnSpacing={5}
        maxWidth='xl'
        px={{xs:3,sm:3}}
        py={{xs:3,sm:3}}
            sx={{
                marginTop: '20px',
                marginBottom: '20px',
                // margin:'30px 10px',
                display: 'flex',
                justifyContent: 'space-evenly'
            }}>
            <Grid item xs={12} md={4} sx={{ width: 250 }} pt={{xs:3, sm:0}} pb={{xs:3,sm:3}}>
                <Box>
                    <Card varient='outlined' elevation={10}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                OFFER ZONE
                            </Typography>
                            <Typography variant="h5" component="div">
                                50%
                            </Typography>
                            <Typography variant="h5" component="div">
                                GRAB THE OFFER NOW
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                !!!!!
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ width: 250 }} pt={{xs:3, sm:0}} pb={{xs:3,sm:3}}>
                <Box>
                    <Card varient='outlined' elevation={10}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                OFFER ZONE
                            </Typography>
                            <Typography variant="h5" component="div">
                                50%
                            </Typography>
                            <Typography variant="h5" component="div">
                                GRAB THE OFFER NOW
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                !!!!!
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ width: 250 }} pt={{xs:3, sm:0}} pb={{xs:3,sm:3}}>
                <Box>
                    <Card varient='outlined' elevation={10}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                OFFER ZONE
                            </Typography>
                            <Typography variant="h5" component="div">
                                50%
                            </Typography>
                            <Typography variant="h5" component="div">
                                GRAB THE OFFER NOW
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                !!!!!
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ width: 250 }} pt={{xs:3, sm:0}} pb={{xs:3,sm:3}}>
                <Box>
                    <Card varient='outlined' elevation={10}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                OFFER ZONE
                            </Typography>
                            <Typography variant="h5" component="div">
                                50%
                            </Typography>
                            <Typography variant="h5" component="div">
                                GRAB THE OFFER NOW
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                !!!!!
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ width: 250 }} pt={{xs:3, sm:0}} pb={{xs:3,sm:3}}>
                <Box>
                    <Card varient='outlined' elevation={10}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                OFFER ZONE
                            </Typography>
                            <Typography variant="h5" component="div">
                                50%
                            </Typography>
                            <Typography variant="h5" component="div">
                                GRAB THE OFFER NOW
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                !!!!!
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ width: 250 }} pt={{xs:3, sm:0}} pb={{xs:3,sm:3}}>
                <Box>
                    <Card varient='outlined' elevation={10}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                OFFER ZONE
                            </Typography>
                            <Typography variant="h5" component="div">
                                50%
                            </Typography>
                            <Typography variant="h5" component="div">
                                GRAB THE OFFER NOW
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                !!!!!
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Cards