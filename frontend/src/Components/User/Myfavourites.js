import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Button, Box, Paper } from '@mui/material'
import axios from '../../axiosinstance'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import imageOne from '../../Images/Soccer.gif'

function Myfavourites() {
    const [favourite, setFavourite] = useState([])
    const length = favourite.length
    const userId = localStorage.getItem("userId")
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`get_favourites/${userId}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                setFavourite(res.data.turf)
            })
        return () => {
        }
    }, [])

    const handleClick = (id) => {
        navigate('/turfview', { state: { id: id } })
    }

    const handleRemoveClick = (id) => {
        const data = {
            turfId: id,
            userId: userId
        }
        axios.post(`addfavourites`, data, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
            .then((res) => {
                setFavourite(res.data.turf)
            })
    }

    return (
        <Grid container>
            {
                length === 0 ? (
                   
                        <Card sx={{margin:'30px auto'}}>
                            <CardContent>
                                <Typography
                                textAlign='center'
                                color='text.secondary'
                                fontSize={22}
                                fontFamily='Open Sans,sans-serif'
                                fontWeight={900}>
                                    You Have No Favourites Yet!!
                                </Typography>
                            </CardContent>
                            <CardMedia
                            component='img'
                            image={imageOne}
                            />
                        </Card>
                ) :
                    (
                        <Grid item sx={{ display: 'flex', flexDirection: 'column', margin: '30px auto' }} >
                            {
                                favourite.map((data, index) => (
                                    <Card sx={{ marginTop: 5, maxWidth: 845, borderRadius: 3 }}>
                                        <CardMedia height='440' component='img' image={data.turfDetails[0].turfPictures[0]}>
                                        </CardMedia>
                                        <CardContent>
                                            <Typography
                                                color='secondary'
                                                fontFamily='Atkinson Hyperlegible, sans-serif'
                                                fontSize='2rem'
                                                textAlign='center'
                                            >
                                                {data.turfDetails[0].centername}
                                            </Typography>
                                            <Typography fontFamily='Open Sans,sans-serif' fontSize={18} fontWeight={600} textAlign='center' color='text.secondary'>
                                                {data.turfDetails[0].category} / {data.turfDetails[0].location} / Rs.{data.turfDetails[0].price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions >
                                            <Box width='100%' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Button variant='contained' onClick={() => handleRemoveClick(data.turfDetails[0]._id)} >
                                                        Remove
                                                    </Button>
                                                </Box>
                                                <Box>
                                                    <Button variant='contained' color='secondary' onClick={() => handleClick(data.turfDetails[0]._id)} >
                                                        Book Now
                                                    </Button>
                                                </Box>
                                            </Box>

                                        </CardActions>
                                    </Card>
                                ))
                            }
                        </Grid>
                    )

            }

        </Grid >
    )
}

export default Myfavourites