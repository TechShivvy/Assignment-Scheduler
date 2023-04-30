import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // assuming appointments page is a separate route
import "./home.scss";
function AppointmentsList() {
  const location = useLocation();
  const appointments = location.state ? location.state.appointments : [];

  // assuming appointments is an array of objects containing appointment information
  // and each appointment has properties like title, date, time, location, etc.
  const sortedAppointments = appointments.length ? appointments.sort((a, b) => a.date - b.date) : [];
  return (
    <div>
      <nav>
        <div className="topbar">
          <form className="search-bar">
            <input type="text" placeholder="Search" />
            <button type="submit"><i className="fas fa-search"></i></button>
          </form>
          <Link to="/appointments" className="button">Appointments</Link>
          <button className="settings-icon"><i className="fas fa-cog"></i></button>
        </div>
      </nav>
      <div className="appointments-list">
        <h1>Upcoming Appointments</h1>
        {sortedAppointments.map((appointment) => (
          <div className="appointment" key={appointment.id}>
            <h2>{appointment.title}</h2>
            <p>Date: {appointment.date.toLocaleDateString()}</p>
            <p>Time: {appointment.time}</p>
            <p>Location: {appointment.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentsList;
