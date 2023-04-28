import React from 'react'
import classes from './Footer.module.css';
import {BsLinkedin, BsGithub, BsInstagram} from 'react-icons/bs';

const Footer = () => {
  return (
    <footer>
      <div className={classes.socialContainer}>
        <BsLinkedin size='1.5em' color="#FFFBDB" />
        <BsGithub size='1.5em' color="#FFFBDB" />
        <BsInstagram size='1.5em' color="#FFFBDB" />
      </div>
    </footer>
  )
}

export default Footer