import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { LoginComponent, SignupComponent } from "./pages/Register";
import GalleryPage from "./pages/GalleryPage";

// Create a layout with bg-blue-100 without altering the component sizes
const AuthPage = ({ component: Component }) => {
  return (
    <div className="bg-blue-100 min-h-screen">
      {" "}
      {/* Full page background */}
      <div className="container mx-auto py-4">
        {" "}
        {/* Ensures padding around the component */}
        <Component /> {/* Render the Login/Signup component */}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />

          {/* Add Login route with AuthPage wrapper */}
          <Route
            path="/login"
            element={<AuthPage component={LoginComponent} />}
          />

          {/* Add Signup route with AuthPage wrapper */}
          <Route
            path="/signup"
            element={<AuthPage component={SignupComponent} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
