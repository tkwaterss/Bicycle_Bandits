import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/authContext";
import { DisplayContextProvider } from "./store/displayContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DisplayContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DisplayContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
