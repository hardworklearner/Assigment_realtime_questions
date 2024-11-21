// src/components/UserInfo.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserInfo.css"; // Optional: Add your custom styles

const UserInfo = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch user data from local storage (assuming you store the user's name there)
  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Assuming you store the username after login
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Clear stored username
    localStorage.removeItem("userId"); // Clear stored userId
    navigate("/"); // Navigate to the login page
  };

  return (
    <div className="user-info">
      <span className="user-greeting">Greeting, {username}!</span>
      <div className="dropdown">
        <button className="dropdown-btn" onClick={toggleDropdown}>
          &#9660; {/* Downward arrow symbol */}
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
