import React, { useContext } from "react";
import Button from "@mui/material/Button";
import DisplayContext from "../../store/displayContext";

const Landing = () => {
  const {displayState, displayDispatch} = useContext(DisplayContext)

  return (
    <div>
      <h3>Welcome blah blah</h3>
      <p>some blurb about logging in or registering</p>
      <div>
        <Button onClick={() => displayDispatch({type: "CHANGE_PAGE", payload: 'login'})} variant="contained">
          Login
        </Button>
        <Button onClick={() => displayDispatch({type: "CHANGE_PAGE", payload: 'register'})} variant="contained">
          Register
        </Button>
      </div>
      <p>Some more information about the site</p>
    </div>
  );
};

export default Landing;
