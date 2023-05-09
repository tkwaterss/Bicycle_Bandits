import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../../store/authContext";
import Container from "../../components/UI/Container";
import classes from "./Landing.module.css";
import LargeBtn from "../../components/UI/LargeBtn";
import Input from "../../components/UI/Input";
import { toLowerCase, toTitleCase } from "../../utils/formatting";
import RiseLoader from "react-spinners/RiseLoader";

const Register = (props) => {
  const authCtx = useContext(AuthContext);
  const [employee, setEmployee] = useState(false);
  const { loading, setLoading } = props;

  const validationSchema = yup.object().shape({
    firstname: yup.string().required("This field is required"),
    lastname: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("This field is required"),
    password: yup
      .string()
      .required("This field is required")
      .min(8, "Password must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password ahould contain at least one uppercase and lowercase character"
      )
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
      ),
    confirmPass: yup.string().when("password", (password, field) => {
      if (password) {
        return field
          .required("The passwords do not match")
          .oneOf([yup.ref("password")], "The passwords do not match");
      }
    }),
    phone: yup
      .number()
      .min(1000000000, "Phone number must be at least 10 digits")
      .max(9999999999, "Phone number cannot be more than 10 digits")
      .typeError("Phone number must be a number")
      .required("A phone number is required"),
    address: yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPass: "",
      phone: "",
      address: "",
      employee: employee,
    },
    validationSchema: validationSchema,
    onSubmit: (values, helpers) => {
      setLoading(true);
      console.log(values);
      values.firstname = toTitleCase(values.firstname);
      values.lastname = toTitleCase(values.lastname);
      values.email = toLowerCase(values.email);
      values.employee = employee;

      axios
        .post("http://localhost:4040/register", values)
        .then(({ data }) => {
          authCtx.login(data.token, data.exp, data.userId, data.employee);
          console.log("after auth", data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Account Already Exists!",
            text: err.response.data,
            icon: "error",
            confirmButtonText: "Enter New Info",
          });
        });
      helpers.resetForm();
    },
  });

  console.log(formik.errors);
  console.log(formik.touched);

  return (
    <Container className={classes.registerContainer}>
      <h3>ENTER YOUR INFORMATION</h3>
      <form onSubmit={formik.handleSubmit} className={classes.registerForm}>
        <div></div>
        <div className={classes.registerInputs}>
          <Input
            id="firstname"
            name="firstname"
            type="text"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="First Name"
            invalid={
              formik.touched.firstname && formik.errors.firstname ? true : false
            }
          >
            First Name
          </Input>
          {formik.touched.firstname && formik.errors.firstname ? (
            <div>{formik.errors.firstname}</div>
          ) : (
            ""
          )}
          <Input
            id="lastname"
            name="lastname"
            type="text"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Last Name"
            invalid={
              formik.touched.lastname && formik.errors.lastname ? true : false
            }
          >
            Last Name
          </Input>
          {formik.touched.lastname && formik.errors.lastname ? (
            <div>{formik.errors.lastname}</div>
          ) : (
            ""
          )}
          <Input
            id="email"
            name="email"
            type="email"
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
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
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
          <Input
            id="confirmPass"
            name="confirmPass"
            type="password"
            value={formik.values.confirmPass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Confirm Password"
            invalid={
              formik.touched.confirmPass && formik.errors.confirmPass
                ? true
                : false
            }
          >
            Confirm Password
          </Input>
          {formik.touched.confirmPass && formik.errors.confirmPass ? (
            <div>{formik.errors.confirmPass}</div>
          ) : (
            ""
          )}
          <Input
            id="phone"
            name="phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Phone"
            invalid={formik.touched.phone && formik.errors.phone ? true : false}
          >
            Phone
          </Input>
          {formik.touched.phone && formik.errors.phone ? (
            <div>{formik.errors.phone}</div>
          ) : (
            ""
          )}
          <Input
            id="address"
            name="address"
            type="tel"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="address"
            invalid={
              formik.touched.address && formik.errors.address ? true : false
            }
          >
            Address
          </Input>
        </div>
        <LargeBtn
          type="submit"
          className={classes.registerBtn}
          function={() => setEmployee(true)}
        >
          {loading ? (
            <RiseLoader size={8} color="#FFFBDB"></RiseLoader>
          ) : (
            "REGISTER AS EMPLOYEE"
          )}
        </LargeBtn>
        <LargeBtn
          type="submit"
          className={classes.registerBtn}
          function={() => setEmployee(false)}
        >
          {loading ? (
            <RiseLoader size={8} color="#FFFBDB"></RiseLoader>
          ) : (
            "REGISTER AS CUSTOMER"
          )}
        </LargeBtn>
      </form>
    </Container>
  );
};

export default Register;
