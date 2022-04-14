import {createContext,useState} from 'react'

export const SearchContext=createContext('')

function Search({children}){
    const [search,setSearch]=useState('')
    return(
    <SearchContext.Provider value={{search,setSearch}}>
        {children}
    </SearchContext.Provider>
    )
}


export default Search 