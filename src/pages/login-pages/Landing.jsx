import React from "react";
import Button from "@mui/material/Button";

const Landing = () => {
  return (
    <div>
      <h3>Welcome blah blah</h3>
      <p>some blurb about logging in or registering</p>
      <div>
        <Button variant="contained">
          Login
        </Button>
        <Button variant="contained">
          Register
        </Button>
      </div>
      <p>Some more information about the site</p>
    </div>
  );
};

export default Landing;
