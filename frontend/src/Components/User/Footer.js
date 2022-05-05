import { Grid, Link, Container } from '@mui/material'
import { Box } from '@mui/system'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import React from 'react'

function Footer() {

  return (
    <Grid
      container
      px={{ xs: 3, sm: 20 }}
      py={{ xs: 3, sm: 5 }}
      sx={{ background: 'linear-gradient(#4D4C4C, #000000)', color: 'white' }}>
      <Grid container
        spacing={5}
        columnSpacing={50}
        maxWidth='xl'
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
        <Grid item xs={12} md={6} >
          <Box fontSize='1.2rem' fontFamily='Open Sans,sans-serif' mb={2} borderBottom={1} >Quick Links</Box>
          <Box mb={1.2} display='flex'>
            <HomeIcon sx={{ fontSize: 23, marginRight: 1.5 }} />
            <Link color='inherit' fontFamily='Open Sans,sans-serif' underline='none'>Home</Link>
          </Box>
          <Box mb={1.2} display='flex'>
            <InfoIcon sx={{ fontSize: 23, marginRight: 1.5 }} />
            <Link color='inherit' fontFamily='Open Sans,sans-serif' underline='none'>About us</Link>
          </Box>
          <Box mb={1.2} display='flex'>
            <PhoneIcon sx={{ fontSize: 23, marginRight: 1.5 }} />
            <Link color='inherit' fontFamily='Open Sans,sans-serif' underline='none'>Contact us</Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box fontSize='1.2rem' fontFamily='Open Sans,sans-serif' mb={2} borderBottom={1}>Connect Us</Box>
          <Box mb={1.2} display='flex'>
            <FacebookIcon sx={{ fontSize: 23, marginRight: 1.5 }} />
            <Link color='inherit' fontFamily='Open Sans,sans-serif' underline='none'>Facebook</Link>
          </Box>
          <Box mb={1.2} display='flex'>
            <InstagramIcon sx={{ fontSize: 23, marginRight: 1.5 }} />
            <Link color='inherit' fontFamily='Open Sans,sans-serif' underline='none'>Instagram</Link>
          </Box>
          <Box mb={1.2} display='flex'>
            <LinkedInIcon sx={{ fontSize: 23, marginRight: 1.5 }} />
            <Link color='inherit' fontFamily='Open Sans,sans-serif' underline='none'>Linked In</Link>
          </Box>
        </Grid>
      </Grid>
      <Container>
        <Box textAlign='center' fontFamily='Open Sans,sans-serif' fontSize={14} pt={{ xs: 5, sm: 7 }} pb={{ xs: 5, sm: 0 }}>
          Play turf &reg; {new Date().getFullYear()}
        </Box>
      </Container>

    </Grid>

  )
}

export default Footer