import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css'
import ReactDOM from 'react-dom/client'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import HomePage from './pages/HomePage.jsx'
import OptionsPage from './pages/OptionsPage.jsx'
import OwnedNFTPage from './pages/OwnedNFTPage.jsx'
import SellNFTPage from './pages/SellNFTPage.jsx'
import UploadNFTPage from './pages/UploadNFT.jsx'
import OngoingSwapPage from './pages/OngoingSwapPage.jsx'
import FormABondPage from './pages/FormABondPage.jsx'
import ActiveDatePage from './pages/DatePage.jsx'
import ActiveBondPage from './pages/BondPage.jsx'
import MyProfilePage from './pages/MyProfilePage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import FormABondItemPage from './pages/FormABondItemPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import UploadNFTFinishPage from './pages/UploadNFTFinishPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
  

const Main = () => {
  // Check if the user is logged in by checking if the token exists in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
      setIsLoggedIn(true);
  };

  const handleLogout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
  };

  return (
      <Router>
          <Routes>
              {/* Public Routes */}
              <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="/resetpassword" element={<ResetPasswordPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

              
              {/* Protected Routes */}
              <Route
                  path="/home"
                  element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />}
              />
              <Route
                  path="/options"
                  element={isLoggedIn ? <OptionsPage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/ownedAsset"
                  element={isLoggedIn ? <OwnedNFTPage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/sellNFT"
                  element={isLoggedIn ? <SellNFTPage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/uploadAsset"
                  element={isLoggedIn ? <UploadNFTPage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/ongoingswap"
                  element={isLoggedIn ? <OngoingSwapPage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/formabond"
                  element={isLoggedIn ? <FormABondPage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/activedate"
                  element={isLoggedIn ? <ActiveDatePage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/bondhighlight"
                  element={isLoggedIn ? <ActiveBondPage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/myprofile"
                  element={isLoggedIn ? <MyProfilePage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/search"
                  element={isLoggedIn ? <SearchPage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/formabonditem"
                  element={isLoggedIn ? <FormABondItemPage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/profile"
                  element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
              />
              <Route
                  path="/uploadAssetFinish"
                  element={isLoggedIn ? <UploadNFTFinishPage /> : <Navigate to="/login" />}
              />
              
              {/* Default Route */}
                <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
          </Routes>
      </Router>
  );
};



ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
