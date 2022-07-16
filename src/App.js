import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "components/Layout/Navbar";
import Footer from "components/Layout/Footer";
import {
  Home,
  Login,
  Admin,
  AlumniForum,
  OfficeBearers,
  Events,
  GalleryPage,
  AlumniMeet,
  AllPhotos,
  SeminarSessions,
  RegistrationPage,
  ForgotPassword,
} from "pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route element={<Navbar />}>
            <Route path="/alumni-forum" element={<AlumniForum />} />
          </Route>
          <Route element={<WithNavAndFooter />}>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/alumni-meet" element={<AlumniMeet />} />
            <Route path="/gallery/all-photos" element={<AllPhotos />} />
            <Route path="/gallery/seminar-sessions" element={<SeminarSessions />} />
            <Route path="/office-bearers" element={<OfficeBearers />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

const WithNavAndFooter = () => {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
};

export default App;
