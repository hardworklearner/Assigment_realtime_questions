import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Store token for authenticated requests
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("username", response.data.userName);
        navigate("/home");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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

        <button type="submit" className="primary">
          Login
        </button>
        <button onClick={handleSignup} className="signup">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Login;
