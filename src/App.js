import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "./store/authContext";


import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/login-pages/LandingPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        // if no token go to landing page, if token, go to dashboard
        <Route path="/" element={!authCtx.token ? <LandingPage /> : <Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
