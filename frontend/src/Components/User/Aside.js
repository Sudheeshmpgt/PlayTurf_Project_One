import { Box, Grid, Paper, Button, Typography, ListItemButton, ListItemIcon, ListItemText, Collapse, List, } from '@mui/material'
import React, { useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Aside() {
  const [openArea, setOpenArea] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const handleClickArea = () => {
    setOpenArea(!openArea);
  };
  const handleClickCategory = () => {
    setOpenCategory(!openCategory);
  };
  return (
    <Grid container>
      <Paper sx={{ height: 600, width: 275, margin: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
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
          <Box sx={{ margin: '5px 0' }}>
            <List>
              <ListItemButton onClick={handleClickArea}>
                <ListItemText
                  sx={{
                    color: 'black',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    fontFamily: 'Open Sans,sans-serif'
                  }}>
                  Area
                </ListItemText>
                {openArea ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openArea} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText onClick={handleClickArea} primary="Ernakulam" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText onClick={handleClickArea} primary="Palakkad" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Box>
          <Box sx={{ margin: '5px 0' }}>
            <List>
              <ListItemButton onClick={handleClickCategory}>
                <ListItemText
                  sx={{
                    color: 'black',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    fontFamily: 'Open Sans,sans-serif'
                  }}>
                  Category
                </ListItemText>
                {openCategory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCategory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText onClick={handleClickCategory} primary="Football" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText onClick={handleClickCategory} primary="Cricket" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Box>
          <Box sx={{ margin: '5px 0' }}>
            <Button sx={{ color: 'black', fontWeight: 600, fontSize: '1.1rem', fontFamily: 'Open Sans,sans-serif' }}>


            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid >
  )
}

export default Aside