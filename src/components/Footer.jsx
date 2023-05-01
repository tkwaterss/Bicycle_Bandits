import React from "react";
import classes from "./Footer.module.css";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div className={classes.socialContainer}>
        <div className={classes.iconContainer}>
          <BsLinkedin className={classes.icon} size="1.5em" color="#FFFBDB" />
        </div>
        <div className={classes.iconContainer}>
          <BsGithub className={classes.icon} size="1.5em" color="#FFFBDB" />
        </div>
        <div className={classes.iconContainer}>
          <BsInstagram className={classes.icon} size="1.5em" color="#FFFBDB" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
