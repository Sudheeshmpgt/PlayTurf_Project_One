import {createContext,useState} from 'react'
 
export const FilterCategoryContext=createContext('') 

function FilterCategory({children}){
    const [filterCategory,setFilterCategory]=useState('') 
    return(
    <FilterCategoryContext.Provider value={{filterCategory,setFilterCategory}}>
        {children}
    </FilterCategoryContext.Provider>
    )
}


export default FilterCategory