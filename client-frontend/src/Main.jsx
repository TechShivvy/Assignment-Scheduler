import { React, useState } from "react";
import "./Main.scss";
import Navbar from "./Navbar";
import Profile from "./Profile";

function Main() {
  const [leftContent, setLeftContent] = useState("default");

  const handleNavItemClick = (content) => {
    setLeftContent(content);
  };
  return (
    <div className="split-page">
      <Navbar onNavItemClick={handleNavItemClick} />
      <div className="content-wrapper">
        <div className="left-side">
          {leftContent === "home" && (
            <>
              <h2>Left Side</h2>
              <p>This is the default content of the left side.</p>
            </>
          )}
          {leftContent === "profile" && (
            <div>
              <Profile />
            </div>
          )}
          {leftContent === "history" && (
            <>
              <h2>History</h2>
              <p>This is the History content.</p>
            </>
          )}
        </div>
        <div className="right-side">
          <h2>Upcoming Assignments</h2>
          <p></p>
          <br></br>
          <div className="card">
            <h3 className="card-title">with john</h3>
            <div className="card-body">
              <p>This is the body of card 1.</p>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">with danny</h3>
            <div className="card-body">
              <p>This is the body of card 2.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
