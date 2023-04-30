import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Signin from './Signin';
// import Home from './Home';
import Profile from './Profile';
// import AppointmentsList from './AppointmentsList';
import Main from './Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Signin />} />
        <Route path="/home"   element={<Main />} /> 
        <Route path="/profile"   element={<Profile />} />
        {/* <Route path="/appointments"   element={<AppointmentsList />} /> */}
        {/* <Route path="/split"   element={<SplitPage />} /> */}
      </Routes>
    </BrowserRouter>,
);
