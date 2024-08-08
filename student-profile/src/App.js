import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileDetails from './components/ProfileDetails';
import ProfileEdit from './components/ProfileEdit';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ProfileDetails />} />
          <Route path="/edit" element={<ProfileEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
