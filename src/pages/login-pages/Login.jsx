import React, { useContext } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import AuthContext from "../../store/authContext";
import Container from "../../components/UI/Container"
import classes from './Landing.module.css';

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
    <Container className={classes.loginContainer}>
      <h2>ENTER LOGIN INFO</h2>
      <form onSubmit={formik.handleSubmit} className={classes.loginForm}>
        <TextField
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="Email"
          variant="filled"
          size="small"
        ></TextField>
        <TextField
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          label="Password"
          variant="filled"
          size="small"
        ></TextField>
        <Button variant="contained" type="submit">
          SUBMIT
        </Button>
      </form>
    </Container>
  );
};

export default Login;
