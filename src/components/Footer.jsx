import React from 'react'
import classes from './Footer.module.css';
import {BsLinkedin, BsGithub, BsInstagram} from 'react-icons/bs';

const Footer = () => {
  return (
    <footer>
      <div className={classes.socialContainer}>
        <BsLinkedin id={classes.linked} size='1.5em' color="#FFFBDB" />
        <BsGithub id={classes.github} size='1.5em' color="#FFFBDB" />
        <BsInstagram id={classes.instagram} size='1.5em' color="#FFFBDB" />
      </div>
    </footer>
  )
}

export default Footer