import {createTheme} from '@mui/material/styles'

export const Theme = createTheme({
    palette:{
        primary:{
            main: '#393939',
            light:'#636363',
            dark:'#131313'
        },
        secondary:{
          light:'#ff8d41',
          main:'#FF5A09',
          dark:'#c42200'
        }
    },
  typography:{
    fontFamily:[
      'Open Sans,sans-serif',
      
    ],
    fontSize:'1rem',
    body2:{
      fontFamily:['sans-serif','Atkinson Hyperlegible, sans-serif'],
      fontSize:'1rem'
    }
  },
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
          textTransform:'none',
        }
      }
    },
    MuiButtonBase:{
      defaultProps:{
        disableRipple: true,
      }
    },
    MuiPaper:{
      defaultProps:{
        elevation: 5,
      }
    },
    MuiCard:{
        defaultProps:{
            elevation:5,
        }
    }
  }
})