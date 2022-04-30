import { Grid, Paper } from '@mui/material'
import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './TurfList.css'
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosinstance'
import { TurfContext } from '../../Store/turfcontext';
import { FilterContext } from '../../Store/filtercontext'
import { FilterCategoryContext } from '../../Store/filtercategorycontrext'
import { FilterPriceContext } from '../../Store/filterpricecontext';
import { TurfViewContext } from '../../Store/turfviewcontext';
import { SearchContext } from '../../Store/searchcontext';

function TurfList() {
    const { turf } = useContext(TurfContext)
    const { filters } = useContext(FilterContext)
    const { filterCategory } = useContext(FilterCategoryContext)
    const { filterPrice } = useContext(FilterPriceContext)
    const {setTurfView} = useContext(TurfViewContext)
    const {search} = useContext(SearchContext)
    const navigate = useNavigate();
    
    const handleClick = (id) => {
        axios.get(`admin_panel/turfs/edit_turfs/${id}`, {
            headers: {
                'authToken': localStorage.getItem("usertoken"),
            }
        })
        .then((res)=>{
            setTurfView(res.data.turf[0])
        })
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
                    turf.filter((data) => {
                        if (filters === "") {
                            return data
                        }
                        else if (data.location.includes(filters)) {
                            return data
                        }
                    }).filter((data) => {
                        if (filterCategory === "") {
                            return data
                        }
                        else if (data.category.includes(filterCategory)) {
                            return data
                        }
                    }).filter((data) => {
                        if (filterPrice === "") {
                            return data
                        }
                        else if (data.price < filterPrice) {
                            return data
                        }
                    }).filter((data) => {
                        if (search === "") {
                            return data
                        } else if (data.centername.toLowerCase().includes(search.toLowerCase())) {
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
                                        width: 500,
                                        m: '12px 0',
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                                    }}>
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} >
                                            <Typography component="div" variant="h5" fontSize={20} fontWeight={800} color='secondary'>
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
                                                    onClick={() => handleClick(data._id)}
                                                    color='secondary'
                                                    sx={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '20%' }}>
                                                    Book Now
                                                </Button>
                                            </CardActions>
                                        </CardContent>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 230 }}
                                            image={data.turfPictures}
                                            alt="Live from space album cover"
                                        />
                                    </Card>
                                </Grid>
                            ) : (
                                <Grid item xs={12} md={6} p={1}>
                                    <Card sx={{
                                        display: 'flex',
                                        height: 215,
                                        width: 500,
                                        m: '12px 0',
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        justifyContent: 'space-between'
                                    }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 230 }}
                                            image={data.turfPictures}
                                            alt="Live from space album cover"
                                        />
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}  >
                                            <Typography component="div" variant="h5" fontSize={20} fontWeight={800} color='secondary'>
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
                                                    onClick={() => handleClick(data._id)}
                                                    color='secondary'
                                                    sx={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '20%' }}
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
            </Grid>
        </Paper>

    )
}

export default TurfList