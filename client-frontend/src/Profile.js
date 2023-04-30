import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.scss";

function Profile() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [offHours, setOffHours] = useState([]);
  const [off, setOff] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${sessionStorage.getItem("token")}`;

  

  //   useEffect(() => {
  //     const getAds = async () => {
  //       const res = await axios.get('/ads')
  //       console.log(res.data)
  //     }
  //     getAds()
  //   }, [])
  //   useEffect(() => {
  //     console.log(offHours);
  //   }, [offHours]);
  //   useEffect(() => {
  //     setOff(offHours.length ? offHours : off);
  //     console.log(offHours)
  // }, [offHours]);
  let initialized = false;
  useEffect(() => {
    // if(!initialized){
    initialized = true;
    console.log("in effect");
    axios
      .post("https://login-gwub.onrender.com/user/profile", { withCredentials: true })

      .then((response) => {
        // sessionStorage.setItem("name", response.data.data[0].name);
        // sessionStorage.setItem("email", response.data.data[0].email);
        // sessionStorage.setItem("offHours", response.data.data[0].offHours);
        // console.log(sessionStorage.getItem("offHours"));
        // sessionStorage.setItem("name", response.data.data[0].name);
        setUsername(response.data.data[0].name);
        setEmail(response.data.data[0].email);
        setOffHours(response.data.data[0].offHours);
        setOff(offHours.length ? offHours : off);
        let date = new Date(response.data.data[0].dateOfBirth);
        date = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join(
          "/"
        );
        setDOB(date);
        setLoaded(true);
        setLoading(false);
        console.log(name, email, offHours, loaded, loading, off);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });

    // console.log('rendering:', data.length, loading)
    return () => {};
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <table>
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{name}</td>
          </tr>
          <tr>
            <th>DOB:</th>
            <td>{dob}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{email}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <h2>Off Hours</h2>
        <ul>
          {offHours.map((offHour) => (
            <li key={offHour._id}>
              {offHour.dayOfWeek}: {offHour.startTime} - {offHour.endTime}
            </li>
          ))}
        </ul>
      </div>
      <button>Edit Profile</button>
    </div>
  );
}

export default Profile;
