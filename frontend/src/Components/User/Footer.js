import { Grid, Link,Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function Footer() {

  return (
    
      <Grid
      container 
      px={{xs:3,sm:20}}
      py={{xs:3,sm:5}}
      sx={{background:'linear-gradient(#4D4C4C, #000000)', color:'white'}}>
          <Grid container 
          spacing={5} 
          columnSpacing={50} 
          maxWidth='xl'
          sx={{display:'flex',
          justifyContent:'space-around',
          alignItems:'center'}}>
            <Grid item xs={12} md={6} >
              <Box fontSize='1.2rem' borderBottom={1} >Quick Links</Box>
              <Box >
                <Link color='inherit' underline='none'>Home</Link>
              </Box>
              <Box >
                <Link color='inherit' underline='none'>About us</Link>
              </Box>
              <Box >
                <Link color='inherit' underline='none'>Contact us</Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box fontSize='1.2rem' borderBottom={1}>Connect Us</Box>
              <Box >
                <Link color='inherit' underline='none'>Facebook</Link>
              </Box>
              <Box >
                <Link color='inherit' underline='none'>Instagram</Link>
              </Box>
              <Box >
                <Link color='inherit' underline='none'>Linked In</Link>
              </Box>
            </Grid>
          </Grid>
          <Container>
          <Box textAlign='center' pt={{xs:5, sm:7}} pb={{xs:5,sm:0}}>
            Play turf &reg; {new Date().getFullYear()}
          </Box>
          </Container>
          
      </Grid>

  )
}

export default Footer