import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Register.css"; // Import your CSS
import logo from "../../assets/lab.png"; // Your image path (adjust as needed)

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Send POST request to backend for registration
    axios
      .post("http://localhost:3000/auth/register", { email, password })
      .then((response) => {
        // On success, navigate to the home page
        navigate("/"); // Redirect to the home page
      })
      .catch((error) => {
        if (error.response) {
          // If error has a response (server-side error)
          setErrorMessage(error.response.data.error);
        } else {
          // Network error or other client-side error
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        {/* Logo/Image Section */}
        <div className="logo-container">
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <h2 className="register-title">Register to Pathology Management</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;