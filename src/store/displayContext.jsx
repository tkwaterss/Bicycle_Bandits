import React, { createContext, useDeferredValue, useReducer } from "react";

let initalState = {
  landingDisplay: "landing",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return { ...state, landingDisplay: action.payload };
    default:
      return state;
  }
};

const DisplayContext = createContext();

export const DisplayContextProvider = (props) => {
  const [displayState, displayDispatch] = useReducer(reducer, initalState);
  return (
    <DisplayContext.Provider value={{ displayState, displayDispatch }}>
      {props.children}
    </DisplayContext.Provider>
  );
};

export default DisplayContext;
