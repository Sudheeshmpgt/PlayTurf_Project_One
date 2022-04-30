import {createContext,useState} from 'react'
 
export const BookingContext=createContext('') 

function Booking({children}){
    const [booking,setBooking]=useState('') 
    return(
    <BookingContext.Provider value={{booking,setBooking}}>
        {children}
    </BookingContext.Provider>
    )
}


export default Booking