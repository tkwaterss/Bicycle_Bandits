import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import AuthContext from "../../store/authContext";
import Container from "../../components/UI/Container";
import classes from "./Landing.module.css";
import Input from "../../components/UI/Input";
import LargeBtn from "../../components/UI/LargeBtn";
import { toLowerCase } from "../../utils/formatting";
import RiseLoader from "react-spinners/RiseLoader";

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const { loading, setLoading } = props;

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("This field is required"),
    password: yup.string().required("Please enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, helpers) => {
      values.email = toLowerCase(values.email);
      setLoading(true);

      axios
        .post("/login", values)
        .then(({ data }) => {
          authCtx.login(data.token, data.exp, data.userId, data.employee);
          console.log("after auth", data);
          setLoading(false);
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
          id="email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="email"
          invalid={formik.touched.email && formik.errors.email ? true : false}
        >
          Email
        </Input>
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : (
          ""
        )}
        <Input
          id="password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="name"
          invalid={
            formik.touched.password && formik.errors.password ? true : false
          }
        >
          Password
        </Input>
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : (
          ""
        )}
        <LargeBtn type="submit" className={classes.submitBtn}>
          {loading ? (
            <RiseLoader size={8} color="#FFFBDB"></RiseLoader>
          ) : (
            "SUBMIT"
          )}
        </LargeBtn>
      </form>
    </Container>
  );
};

export default Login;
