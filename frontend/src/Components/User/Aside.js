import { Box, Grid, Paper, Typography, FormControlLabel, Checkbox } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { TurfContext } from '../../Store/turfcontext'
import { FilterContext } from '../../Store/filtercontext';
import axios from '../../axiosinstance';
import { FilterCategoryContext } from '../../Store/filtercategorycontrext';
import { FilterPriceContext } from '../../Store/filterpricecontext';

function Aside() {
  const { turf } = useContext(TurfContext)
  const { setFilters } = useContext(FilterContext)
  const { setFilterCategory } = useContext(FilterCategoryContext)
  const { setFilterPrice } = useContext(FilterPriceContext)

  const [category, setCategory] = useState([])

  const area = turf.map((data) => (data.location))
  const uniqueArea = [...new Set(area)]

  const getCategoryData = async () => {
    try {
      const data = await axios.get("admin_panel/category", {
        headers: {
            'authToken': localStorage.getItem("usertoken"),
        }
    })
      setCategory(data.data.category)
    } catch (error) {
      alert(error)
    }
  }


  const handleChangeArea = (e) => {
    if (e.target.checked) {
      setFilters(e.target.value)
    } else {
      setFilters('')
    }
  }

  const handleChangeCategory = (e) => {
    if (e.target.checked) {
      setFilterCategory(e.target.value)
    } else {
      setFilterCategory('')
    }
  }

  const handleChangePrice = (e) => {
    if (e.target.checked) {
      setFilterPrice(e.target.value)
    } else {
      setFilterPrice('')
    }
  }

  useEffect(() => {
    getCategoryData();
  }, [])

  return (
    <Grid container>
      <Paper sx={{ height: 600, width: 275, margin: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '2px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            padding: 5,
          }}>
          <Box sx={{ margin: '5px 0' }}>
            <Typography
              variant='h1'
              fontFamily=''
              fontSize='1.7rem'
              fontWeight={600}
              borderBottom={1}
              color='text.secondary'>
              <FilterAltIcon color='text.secondary' sx={{ marginRight: 2 }} />
              Filter
            </Typography>
          </Box>
          <Box>
            <Typography
              marginTop={3}
              fontWeight={600}
              fontSize={20}>
              Area
            </Typography>
            {
              uniqueArea.map((data, index) => (
                <Box>
                  <FormControlLabel
                    label={data}
                    control={
                      <Checkbox
                        value={data}
                        onChange={(e) => handleChangeArea(e)}
                      />
                    } />
                </Box>
              ))
            }
          </Box>
          <Box>
            <Typography
              marginTop={3}
              fontWeight={600}
              fontSize={20}>
              Category
            </Typography>
            {
              category.map((data, index) => (
                <Box>
                  <FormControlLabel
                    label={data.category}
                    control={
                      <Checkbox
                        value={data.category}
                        onChange={(e) => handleChangeCategory(e)}
                      />
                    } />
                </Box>
              ))
            }
          </Box>
          <Box>
            <Typography
              marginTop={3}
              fontWeight={600}
              fontSize={20}>
              Price
            </Typography>
            <Box>
              <FormControlLabel
                label='< 1500'
                control={
                  <Checkbox
                    value={1499}
                    onChange={(e) => handleChangePrice(e)}
                  />
                } />
            </Box>
            <Box>
              <FormControlLabel
                label='< 1750'
                control={
                  <Checkbox
                    value={1749}
                    onChange={(e) => handleChangePrice(e)}
                  />
                } />
            </Box>
            <Box>
              <FormControlLabel
                label='< 2000'
                control={
                  <Checkbox
                    value={1999}
                    onChange={(e) => handleChangePrice(e)}
                  />
                } />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid >
  )
}

export default Aside