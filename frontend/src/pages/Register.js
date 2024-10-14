import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom"; // To handle redirection

// Regex for password validation (at least 8 characters, 1 uppercase, 1 special character, 1 digit)
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Validation for email format
const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must have at least 8 characters, 1 uppercase, 1 special character, and 1 digit"
      );
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);

        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/"); // Redirect to Home page
          window.location.reload();
        }, 2000);
      } else {
        setErrorMessage("Login failed: " + data.message);
        setTimeout(() => setErrorMessage(""), 2000);
      }
    } catch (error) {
      setErrorMessage("Login failed: " + error.message);
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto bg-white my-16 rounded-xl shadow-xl overflow-hidden">
      <div className="w-1/2 p-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">
          Log in to <span className="text-blue-900">Artify</span>
        </h2>

        {/* Modal for login success */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-center font-bold text-green-500">
                Login Successful!
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-center space-x-4 mb-6">
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img src="/images/google.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img
              src="/images/instagram.png"
              alt="Instagram"
              className="w-6 h-6"
            />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img
              src="/images/linkedin.png"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </button>
        </div>
        <p className="text-center text-gray-500 mb-6">
          or use your email account
        </p>
        {/* Display error message */}
        {errorMessage && (
          <div className="text-center text-red-500 mb-4">{errorMessage}</div>
        )}

        {/* Login form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-full text-white bg-blue-400 hover:bg-blue-500 transition-all duration-300"
          >
            LOG IN
          </button>
        </form>
      </div>
      <div className="w-1/2 bg-blue-400 p-12 text-white flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
        <p className="text-center mb-8">
          Enter your personal details and start your journey with us
        </p>
        <button
          onClick={() => (window.location.href = "/signup")}
          className="px-12 py-3 border-2 border-white rounded-full text-white hover:bg-blue-500 transition-all duration-300"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

const SignupComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    if (username.length < 3) {
      setErrorMessage("Username must be at least 3 characters long");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must have at least 8 characters, 1 uppercase, 1 special character, and 1 digit"
      );
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (data.message) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/login"); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        setErrorMessage("Signup failed: " + data.message);
        setTimeout(() => setErrorMessage(""), 2000);
      }
    } catch (error) {
      setErrorMessage("Signup failed: " + error.message);
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto bg-white my-16 rounded-xl shadow-xl overflow-hidden">
      <div className="w-1/2 bg-blue-400 p-12 text-white flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-center mb-8">
          To keep connected with us, please login with your personal info
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="px-12 py-3 border-2 border-white rounded-full text-white hover:bg-blue-500 transition-all duration-300"
        >
          LOG IN
        </button>
      </div>

      <div className="w-1/2 p-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">
          Create <span className="text-blue-900">Account</span>
        </h2>

        {/* Modal for signup success */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-center font-bold text-green-500">
                Signup Successful!
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-center space-x-4 mb-6">
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img src="/images/google.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img
              src="/images/instagram.png"
              alt="Instagram"
              className="w-6 h-6"
            />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img
              src="/images/linkedin.png"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </button>
        </div>

        <p className="text-center text-gray-500 mb-6">
          or use your email for registration
        </p>
        {/* Display error message */}
        {errorMessage && (
          <div className="text-center text-red-500 mb-4">{errorMessage}</div>
        )}

        {/* Signup form */}
        <form className="space-y-6" onSubmit={handleSignup}>
          <div className="relative">
            <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-full text-white bg-blue-400 hover:bg-blue-500 transition-all duration-300"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export { LoginComponent, SignupComponent };
