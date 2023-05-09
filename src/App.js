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
import TicketSearch from "./pages/tech-pages/TicketSearch";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <main>
          <Routes>
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
          </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
