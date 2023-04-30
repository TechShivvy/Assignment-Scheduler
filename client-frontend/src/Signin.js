import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./sign.scss";
function EntryPage() {
  const [currentView, setCurrentView] = useState("logIn");

  const [email, setEmail] = useState("");
  console.log(email);
  const [password, setPassword] = useState("");
  console.log(password);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  const [name, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDOB] = useState("");

  const changeView = (view) => {
    setCurrentView(view);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:5000/user/signup", {
        name,
        email,
        password,
        dateOfBirth,
      })
      .then((response) => {
        if (response.data.status === "PENDING") {
          setMessage(
            "Signup request is pending approval. Please check your email for further instructions."
          );
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert("An error occurred while processing your request.");
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/user/signin", { email, password })
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setMessage(response.data.message);
          sessionStorage.clear();
          sessionStorage.setItem("token", response.data.token);
          // sessionStorage.setItem("email", response.data.data[0].email);
          // sessionStorage.setItem("name", response.data.data[0].name);
          // sessionStorage.setItem("dob", response.data.data[0].dateOfBirth);
          navigate("/home");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert("An error occurred while processing your request.");
      });
  };

  const currentViewComponent = () => {
    switch (currentView) {
      case "signUp":
        return (
          <form onSubmit={handleSignUp}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={name}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor="dateOfBirth">Date of Birth:</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDOB(e.target.value)}
                    required
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button type="button" onClick={() => changeView("logIn")}>
              Have an Account?
            </button>
          </form>
        );
      case "logIn":
        return (
          <form onSubmit={handleLogin}>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
              <li>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={() => changeView("signUp")}>
              Create an Account
            </button>
          </form>
        );
      default:
        break;
    }
  };

  return <section id="entry-page">{currentViewComponent()}</section>;
}

export default EntryPage;
