import React from 'react'
import {Button} from '@mui/material'
import { TextField } from '@mui/material'

const Register = () => {
  return (
    //contain the register form and logic here
    <div>
      <h2>ENTER REGISTRATION INFO</h2>
      <TextField label="First Name" variant="filled"></TextField>
      <TextField label="Last Name" variant="filled"></TextField>
      <TextField label="Email" variant="filled"></TextField>
      <TextField label="Password" variant="filled"></TextField>
      <TextField label="Confirm Password" variant="filled"></TextField>
      <TextField label="Phone" variant="filled"></TextField>
      <TextField label="Street" variant="filled"></TextField>
      <TextField label="City/State" variant="filled"></TextField>
      <Button variant="contained">SUBMIT</Button>
    </div>
  )
}

export default Register