import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import AuthContext from "../../store/authContext";
import Container from "../../components/UI/Container";
import classes from "./Landing.module.css";
import Input from "../../components/UI/Input";
import LargeBtn from "../../components/UI/LargeBtn";

const Login = () => {
  const authCtx = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, helpers) => {
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
      helpers.resetForm();
    },
  });
  return (
    //contain the login form and logic here
    <Container className={classes.loginContainer}>
      <h3>ENTER LOGIN INFO</h3>
      <form onSubmit={formik.handleSubmit} className={classes.loginForm}>
        <Input
          id={"email"}
          type={"email"}
          name={"email"}
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder={"email"}
        >
          Email
        </Input>
        <Input
          id={"password"}
          type={"password"}
          name={"password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder={"name"}
        >
          Password
        </Input>
        <LargeBtn type={"submit"} className={classes.submitBtn}>
          SUBMIT
        </LargeBtn>
      </form>
    </Container>
  );
};

export default Login;
