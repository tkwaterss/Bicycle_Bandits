import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import AuthContext from "../../store/authContext";
import Container from "../../components/UI/Container";
import classes from "./Landing.module.css";
import LargeBtn from "../../components/UI/LargeBtn";
import Input from "../../components/UI/Input";

const Register = () => {
  //! Need to add validation with yup
  //! Need to implement formatting functions where needed
  //! pull formatting function folder out to root directory
  //! Need to check that passwords match and remove confirm

  const authCtx = useContext(AuthContext);

  //TODO setup validation
  // const validationSchema = yup.object({
  //   firstname: yup,
  //   lastname: yup,
  //   email: yup,
  //   password: yup,
  //   confirmPass: yup,
  //   phone: yup,
  //   address: yup,
  // })

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPass: "",
      phone: "",
      address: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values, helpers) => {
      console.log(values);
      axios
        .post("http://localhost:4040/register", values)
        .then(({ data }) => {
          authCtx.login(data.token, data.exp, data.userId, data.employee);
          console.log("after auth", data);
        })
        .catch((err) => {
          console.log("Sorry there was an issue with your registration", err);
        });
      helpers.resetForm();
    },
  });

  return (
    <Container className={classes.registerContainer}>
      <h3>ENTER YOUR INFORMATION</h3>
      <form onSubmit={formik.handleSubmit} className={classes.registerForm}>
        <div className={classes.registerInputs}>
          <Input
            id="firstname"
            name="firstname"
            type="text"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            placeholder="First Name"
          >
            First Name
          </Input>
          <Input
            id="lastname"
            name="lastname"
            type="text"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            placeholder="Last Name"
          >
            Last Name
          </Input>
          <Input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder={"email"}
          >
            Email
          </Input>
          <Input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
          >
            Password
          </Input>
          <Input
            id="confirmPass"
            name="confirmPass"
            type="password"
            value={formik.values.confirmPass}
            onChange={formik.handleChange}
            placeholder="Confirm Password"
          >
            Confirm Password
          </Input>
          <Input
            id="phone"
            name="phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Phone"
          >
            Phone
          </Input>
          <Input
            id="address"
            name="address"
            type="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder="address"
          >
            Address
          </Input>
        </div>

        <LargeBtn type="submit" className={classes.submitBtn}>
          SUBMIT
        </LargeBtn>
      </form>
    </Container>
  );
};

export default Register;
