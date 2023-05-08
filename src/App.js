import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "./store/authContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/shared-pages/dashboard/DashboardPage";
import LandingPage from "./pages/login-pages/LandingPage";
import TicketDetails from "./pages/shared-pages/ticketDetails/TicketDetails";
import NewTicket from "./pages/tech-pages/NewTicket";
import ProductLaborSearch from "./pages/tech-pages/ProductLaborSearch";
import TicketSearch from "./pages/tech-pages/TicketSearch";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <main>
          <Routes>
            // if no token go to landing page, if token, go to dashboard
            <Route
              path="/"
              element={!authCtx.token ? <LandingPage /> : <Dashboard />}
            />
            <Route
              path="/ticket/:id"
              element={authCtx.token ? <TicketDetails /> : ""}
            />
            <Route
              path="/searchTickets"
              element={authCtx.employee ? <TicketSearch /> : ""}
            />
            <Route
              path="/newTicket"
              element={authCtx.employee ? <NewTicket /> : ""}
            />
            <Route
              path="/searchItems"
              element={authCtx.employee ? <ProductLaborSearch /> : ""}
            />
          </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
