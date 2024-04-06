import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpModal from "./auth/SignUpModal";
import LoginModal from "./auth/LoginModal";
import { StorageKey } from "../types/store.type";

const Header: React.FC = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleSignUpModalClose = () => {
    setIsSignUpModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("eventsme.access.token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem(StorageKey.EventsMe)
]);

  const handleMyAccountClick = () => {
    navigate("/eventsme/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("eventsme.access.token");
    navigate("/eventsme/events");
    setIsLoggedIn(false);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 border-b">
      <div className="text-2xl font-semibold text-gray-900">EventMe</div>

      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <button
              className="px-4 py-1 text-gray-800 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
              onClick={handleMyAccountClick}
            >
              My Account
            </button>
            <button
              className="px-4 py-1 text-gray-800 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="px-4 py-1 text-gray-800 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
              onClick={handleLoginClick}
            >
              LogIn
            </button>
            <button
              className="px-4 py-1 text-gray-800 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
              onClick={handleSignUpClick}
            >
              SignUp
            </button>
          </>
        )}
      </div>

      {isSignUpModalOpen && (
        <SignUpModal
          onClose={handleSignUpModalClose}
          onLogInClick={handleLoginClick}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal
          onClose={handleLoginModalClose}
          onSignUpClick={handleSignUpClick}
        />
      )}
    </header>
  );
};

export default Header;
