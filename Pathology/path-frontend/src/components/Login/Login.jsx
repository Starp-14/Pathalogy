import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Login.css"; // Import your CSS

const Login = () => {
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

    // Send POST request to backend for login
    axios
      .post("http://localhost:3000/auth/login", { email, password })
      .then((response) => {
        const user = response.data.user; // Assuming response contains the user object

        // Store user data in localStorage (including isAdmin)
        localStorage.setItem("user", JSON.stringify(user));

        // Navigate to the home page with the email in the URL
        navigate(`/?email=${encodeURIComponent(email)}`);
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
    <div className="login-container">
      <h2>Login to Pathology Management</h2>
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
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;