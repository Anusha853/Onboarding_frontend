import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import PlanCarousel from './components/PlanCarousel';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import AuthPage from './components/AuthPage';
import Plans from './components/Plans'; 
import VerificationResult from './components/VerificationResult';
import DocumentVerification from './components/DocumentVerification';
import './styles.css';
import './Styles/AirtelPlans.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlanConfirmation from './components/PlanConfirmation';
import ProfilePage from './components/ProfilePage';
import ChooseUs from './components/ChooseUs';
//import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App" >
      <Navbar/>
        <Routes>
          {/* Home Page Route */}
          <Route 
            path="/" 
            element={
              <>
                <Header />
                <PlanCarousel />
                <ChooseUs/>
                <Testimonials />
                <Footer />
              </>
            } 
          />
          {/* Contact Us Route */}
          <Route path="/contact-us" element={<ContactUs />} />
          {/* Auth Page Route */}
          <Route path="/auth" element={<AuthPage />} />
          {/* Plans Route */}
          <Route path="/plans" element={<Plans />} /> {/* Add this line */}
          <Route path="/plan-confirmation" element={<PlanConfirmation />} />
          <Route path="/doc-verify" element={<DocumentVerification/>} />
          <Route path="/result" element={<VerificationResult/>} />
          <Route path="/profile" element={<ProfilePage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
