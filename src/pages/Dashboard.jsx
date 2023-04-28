import React, { useContext } from 'react'
import AuthContext from '../store/authContext'

const Dashboard = () => {
  const authCtx = useContext(AuthContext);

  let display
  if (authCtx.employee) {
    display = <h1>Employee</h1>
  } else if (!authCtx.employee) {
    display = <h1>Customer</h1>
  }
  return (
    <div>{display}</div>
  )
}

export default Dashboard