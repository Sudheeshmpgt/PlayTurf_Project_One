import React, { useContext } from 'react'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { SearchContext } from '../../Store/searchcontext';

function Search() {
  const { search, setSearch } = useContext(SearchContext)

  const searchChange = (data) => {
    setSearch(data.target.value)
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(-6.5),
    marginLeft: '25%',
    width: '70%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '40ch',
      },
    },
  }));
  return ( 
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        value={search}
        onChange={searchChange}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
}

export default Search

