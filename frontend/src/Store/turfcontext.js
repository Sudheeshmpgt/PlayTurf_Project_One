import {createContext,useState} from 'react'

export const TurfContext=createContext([])

function Turf({children}){
    const [turf,setTurf]=useState([])
    return(
    <TurfContext.Provider value={{turf,setTurf}}>
        {children}
    </TurfContext.Provider>
    )
}



export default Turf