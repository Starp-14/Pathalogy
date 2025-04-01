import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import pathologyLogo from "../../assets/lab.png"; // Import pathology image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    axios
      .post("http://localhost:3000/auth/login", { email, password })
      .then((response) => {
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate(`/?email=${encodeURIComponent(email)}`);
      })
      .catch((error) => {
        setErrorMessage(
          error.response
            ? error.response.data.error
            : "An error occurred. Please try again."
        );
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          src={pathologyLogo}
          alt="Pathology Logo"
          className="pathology-logo"
        />
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
    </div>
  );
};

export default Login;
