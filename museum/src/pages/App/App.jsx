import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import TicketingPage from "../TicketingPage/TicketingPage";
import CheckOutPage from "../TicketingPage/CheckOutPage";
import Exhibition from "../Exhibition/Exhibition";
import HomePage from "../HomePage/HomePage";
import MapPage from "../MapPage/MapPage";
import ItineraryPage from "../ItineraryPage/ItineraryPage";
import ExhibitionDetails from "../Exhibition/ExhibitionDetails";
import Subscription from "../../components/Footer/Subscription";
import Footer from "../../components/Footer/Footer";
import ItinerarySelectPage from "../ItineraryPage/ItinerarySelectPage";
import { Navigate } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/exhibition/:id" element={<ExhibitionDetails />} />
          <Route path="/ticketing" element={<TicketingPage />} />
          <Route path="/check-out" element={<CheckOutPage />} />
          <Route
            path="/itinerary"
            element={user ? <ItineraryPage /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/auth"
            element={<AuthPage setUser={setUser} user={user} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>

      <Footer />
    </main>
  );
}

//comment here to test branch
