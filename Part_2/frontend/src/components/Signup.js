import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state for validation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await signup({ username, password, confirmPassword });
      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Store token for authenticated requests
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("username", response.data.userName);
        navigate("/home"); // Redirect to homepage if signup is successful
      }
    } catch (error) {
      alert("Error during signup!");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* Display error message if passwords don't match */}
        <button type="submit">Sign Up</button>
        <button className="login" onClick={() => navigate("/")} type="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
