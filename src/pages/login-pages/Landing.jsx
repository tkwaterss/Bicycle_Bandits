import React, { useContext } from "react";
import Button from "@mui/material/Button";
import DisplayContext from "../../store/displayContext";
import Container from '../../components/UI/Container';

import classes from "./Landing.module.css";

const Landing = () => {
  const { displayDispatch } = useContext(DisplayContext);

  return (
    <Container className={classes.landingContainer}>
      <h3>A New Bicycle Service Experience</h3>
      <p>Bicycle Bandits is all about customer convenience. You can track service progress, shop for the latest gear, and pay for it all right here. We strive to make your bike shop experience as smooth as possible.</p>
      <div className={classes.landingBtns}>
        <div className={classes.registerGroup}>
          <p>
            New To Bicycle Bandits?
          </p>
        <Button
          onClick={() =>
            displayDispatch({ type: "CHANGE_PAGE", payload: "register" })
          }
          variant="contained"
        >
          Register
        </Button>
        </div>
        <div className={classes.loginGroup}>
          <p>
            Already Signed Up?
          </p>
        <Button
          onClick={() =>
            displayDispatch({ type: "CHANGE_PAGE", payload: "login" })
          }
          variant="contained"
        >
          Login
        </Button>
        </div>
      </div>
    </Container>
  );
};

export default Landing;
