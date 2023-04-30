import React from "react";
import "./nav.scss";

function Navbar(props) {
  const handleClick = (content) => {
    props.onNavItemClick(content);
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#" onClick={() => handleClick("home")}>Home</a>
        </li>
        <li>
          <a href="#" onClick={() => handleClick("profile")}>Profile</a>
        </li>
        <li>
          <a href="#" onClick={() => handleClick("history")}>History</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
