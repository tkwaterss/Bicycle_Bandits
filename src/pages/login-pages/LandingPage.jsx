import React, { useContext, useState } from "react";
import DisplayContext from "../../store/displayContext";

import Landing from "./Landing";
import Login from "./Login";
import Register from "./Register";

//^This page is just for showing one of the three displays

const LandingPage = () => {
  const { displayState } = useContext(DisplayContext);
  const [loading, setLoading] = useState(false);

  let content;

  if (displayState.landingDisplay === "landing") {
    content = <Landing />;
  }

  if (displayState.landingDisplay === "login") {
    content = <Login loading={loading} setLoading={setLoading} />;
  }

  if (displayState.landingDisplay === "register") {
    content = <Register loading={loading} setLoading={setLoading} />;
  }

  return <>{content}</>;
};

export default LandingPage;
