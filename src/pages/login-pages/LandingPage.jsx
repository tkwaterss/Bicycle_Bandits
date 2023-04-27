import React, {useContext} from 'react'
import DisplayContext from '../../store/displayContext'

import Landing from './Landing'
import Login from './Login'
import Register from './Register'

//^This page is just for showing one of the three displays

const LandingPage = () => {
  const { displayState } = useContext(DisplayContext);

  let content

  if (displayState.landingDisplay === 'landing') {
    content = <Landing />
  }

  if (displayState.landingDisplay === 'login') {
    content = <Login />
  }

  if (displayState.landingDisplay === 'register') {
    content = <Register />
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default LandingPage