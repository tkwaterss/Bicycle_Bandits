import React, { useContext } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import AuthContext from "../../store/authContext";

const Login = () => {
  const authCtx = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://localhost:4040/login", values)
        .then(({ data }) => {
          authCtx.login(data.token, data.exp, data.userId, data.employee);
          console.log("after auth", data);
        })
        .catch((err) => {
          console.log("Sorry there was an issue with your login", err);
        });
    },
  });
  return (
    //contain the login form and logic here
    <div>
      <h2>ENTER LOGIN INFO</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="Email"
          variant="filled"
        ></TextField>
        <TextField
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          label="Password"
          variant="filled"
        ></TextField>
        <Button variant="contained" type="submit">
          SUBMIT
        </Button>
      </form>
    </div>
  );
};

export default Login;
