import React, { useEffect, useRef } from "react";
import {
  MicrosoftLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import { useState } from "react";
import { register } from "../../api/auth";
import { notifications } from '@mantine/notifications';

interface SignUpModalProps {
  onClose: () => void;
  onLogInClick: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose, onLogInClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [hovered, setHovered] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const validatePassword = (value: string): string => {
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return "Password must contain at least one special character";
    } else if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    return "";
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleRepeatPasswordChange = (value: string) => {
    setRepeatPassword(value);
    setRepeatPasswordError(value === password ? "" : "Passwords do not match");
  };

  const validateEmail = (value: string) => {
    const isValid = value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    return isValid ? "" : "Enter a valid email address";
  };
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleSignUp = async (event: React.FormEvent) => {
    console.log('pula', email, password)
    event.preventDefault();
 

    if (passwordError || repeatPasswordError || emailError) {
      return;
    }

    try {
      await register(email, password);
      onClose();
    } catch (error) {
      notifications.show({
        autoClose: 6000,
        color: 'red',
        title: '🤔 This email already exists!',
        message: 'Looks like you already have an account! 🤥 Try to login instead or use a different email address! 🚀',
      })
      console.error(error);
    }
  };

  const handleLogInClick = () => {
    onClose();
    onLogInClick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="p-6 bg-white rounded-md w-96">
        <h2 className="mb-4 text-2xl font-semibold">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 mt-1 border rounded-md "
              style={{ borderColor: emailError ? "#EA1179" : "" }}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
            />
            {emailError && (
              <p style={{ color: "#EA1179" }} className="text-sm">
                {emailError}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              style={{ borderColor: passwordError ? "#EA1179" : "" }}
              className={`mt-1 p-2 w-full border rounded-md`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
            />
            {passwordError && (
              <p style={{ color: "#EA1179" }} className="text-sm ">
                {passwordError}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Repeat Password
            </label>
            <input
              type="password"
              className={`mt-1 p-2 w-full border rounded-md`}
              style={{ borderColor: passwordError ? "#EA1179" : "" }}
              placeholder="Repeat your password"
              value={repeatPassword}
              onChange={(e) => handleRepeatPasswordChange(e.target.value)}
              required
            />
            {repeatPasswordError && (
              <p style={{ color: "#EA1179" }} className="text-sm ">
                {repeatPasswordError}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center mb-2">
            <button
              type="button"
              style={{
                backgroundColor: hovered ? "#416D19" : "#9bcf53",
                transition: "background-color 0.3s"
              }}
              className="w-full px-4 py-2 text-white rounded-md"
              onMouseOver={() => setHovered(true)}
              onMouseOut={() => setHovered(false)}
              onClick={handleSignUp}
            >
              Sign In
            </button>
          </div>

          <div className="flex items-center justify-center my-6">
            <hr className="w-full mt-2 mb-2 border-t border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or</span>
            <hr className="w-full mt-2 mb-2 border-t border-gray-300" />
          </div>

          <div className="items-center justify-center mb-4 space-y-2 text-sm">
            <GoogleLoginButton
              text="Sign up with Google"
              onClick={() => alert("Hello")}
              style={{
                fontSize: "14px",
                backgroundColor: "#fff",
                color: "#272829"
              }}
              activeStyle={{ background: "#F5F7F8" }}
            />
            <MicrosoftLoginButton
              text="Sign up with Microsoft"
              onClick={() => alert("Hello")}
              style={{
                fontSize: "14px",
                background: "#fff",
                color: "#272829"
              }}
              activeStyle={{ background: "#F5F7F8" }}
            />
          </div>

          <div className="flex items-center justify-center mb-2">
            <hr className="w-full mb-2 border-t border-gray-300" />
          </div>

          <div className="mb-2 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={handleLogInClick}
              >
                Log In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
