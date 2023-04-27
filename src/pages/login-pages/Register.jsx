import React from 'react'
import {Button} from '@mui/material'
import { TextField } from '@mui/material'
import {Formik} from 'formik';

const Register = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  }

  const onSubmit = (values) => {

  }

  return (
    //! IMPLEMENTING FORMIK TO CAPTURE DATA
    <div>
      <h2>ENTER REGISTRATION INFO</h2>
      {/* <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          
          )} */}

      {/* </Formik> */}
          <TextField label="Last Name" variant="filled"></TextField>
          <TextField label="Email" variant="filled"></TextField>
          <TextField label="Password" variant="filled"></TextField>
          <TextField label="Confirm Password" variant="filled"></TextField>
          <TextField label="Phone" variant="filled"></TextField>
          <TextField label="address" variant="filled"></TextField>
          <Button variant="contained">SUBMIT</Button>
    </div>
  )
}

export default Register