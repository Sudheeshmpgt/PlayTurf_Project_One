import {createContext,useState} from 'react'

export const TurfViewContext=createContext([])

function TurfView({children}){
    const [turfView,setTurfView]=useState([])
    return(
    <TurfViewContext.Provider value={{turfView,setTurfView}}>
        {children}
    </TurfViewContext.Provider>
    )
}



export default TurfView