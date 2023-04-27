import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

const Login = () => {
  return (
    //contain the login form and logic here
    <div>
      <h2>ENTER LOGIN INFO</h2>
      <TextField label="Email" variant="filled"></TextField>
      <TextField label="Password" variant="filled"></TextField>
      <Button variant="contained">SUBMIT</Button>
    </div>
  );
};

export default Login;
