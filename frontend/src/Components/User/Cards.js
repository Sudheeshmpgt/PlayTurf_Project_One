import React from 'react'
import { Card, Grid, CardContent, CardActions, Button, Typography } from '@mui/material'
import { Box } from '@mui/system'

function Cards() {


    return (
        <>
        <Typography 
        component='Box'
        sx={{marginLeft:'auto',
        marginRight:'auto',
        }}>
        <h1 style={{marginTop:'50px'}}>
        TURFS
        </h1>
        </Typography>
        <Grid container 
        columnSpacing={5}
        maxWidth='xl'
        px={{xs:3,sm:3}}
        py={{xs:3,sm:3}}
            sx={{
                marginTop: '10px',
                marginBottom: '20px',
                // margin:'30px 10px',
                display: 'flex',
                justifyContent: 'space-evenly'
            }}>
            <Grid item xs={12} md={4} sx={{ width: 250 }} pt={{xs:3, sm:0}} pb={{xs:3,sm:3}}>
                <Box>
                    <Card varient='outlined' elevation={10}>
                        <CardContent sx={{ textAlign: 'center' }}>
                        <img style={{height:'280px', width:300, marginTop:35}}
                            alt='football court' 
                            src='https://cdn.arturf.com/wp-content/uploads/2019/02/Non-Infill-Football-Grass-Field-France-1.jpg'></img> 
                        </CardContent>
                        <CardActions>
                            <Button size="small">View</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ width: 250 }} pt={{xs:3, sm:0}} pb={{xs:3,sm:3}}>
                <Box>
                    <Card varient='outlined' elevation={10}>
                        <CardContent sx={{ textAlign: 'center' }}>
                        <img style={{height:'280px', width:300, marginTop:35}}
                            alt='football court' 
                            src='https://images.unsplash.com/photo-1600066975952-912a81940822?ixlib=rb-1.2.1
                            &ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGZvb3RiYWxsJTIwdHVyZnxlbnwwfDJ8MHx8
                            &auto=format&fit=crop&w=500&q=60'></img> 
                        </CardContent>
                        <CardActions>
                            <Button size="small">View</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ width: 250 }} pt={{xs:3, sm:0}} pb={{xs:3,sm:3}}>
                <Box>
                    <Card varient='outlined' elevation={10}>
                        <CardContent sx={{ textAlign: 'center' }}>
                        <img style={{height:'280px', width:300, marginTop:35}}
                            alt='football court' 
                            src='https://5.imimg.com/data5/UF/VO/WA/SELLER-2751211/fifa-certified-artificial-football-grass-500x500.jpg'></img> 
                        </CardContent>
                        <CardActions>
                            <Button size="small">View</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
        </Grid>
        </>

    )
}

export default Cards