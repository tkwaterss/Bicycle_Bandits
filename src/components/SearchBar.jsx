import React from "react";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  return (
    <>
      <input
        type="text"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={classes.searchInput}
        placeholder={props.placeholder}
      ></input>
      <button type="submit" className={classes.searchBtn}>
        Search
      </button>
    </>
  );
};

export default SearchBar;
