import React from 'react'
import classes from './SearchBar.module.css'

const SearchBar = (props) => {
  return (
    <div className={classes.searchContainer}>
      <input className={classes.searchInput} placeholder={props.placeholder}></input>
      <button className={classes.searchBtn}>Search</button>
    </div>
  )
}

export default SearchBar