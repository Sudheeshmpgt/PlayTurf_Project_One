import {createContext,useState} from 'react'
 
export const FilterContext=createContext('')

function Filter({children}){
    const [filters,setFilters]=useState('') 
    return(
    <FilterContext.Provider value={{filters,setFilters}}>
        {children}
    </FilterContext.Provider>
    )
}


export default Filter