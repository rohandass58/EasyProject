import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './ProfileDetails.css';

const ProfileDetails = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.getProfile().then(data => setProfile(data));
  }, []);

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="container profile-container mt-5">
      <h1 className="text-center">Profile Details</h1>
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">Personal Information</h2>
          <p><strong>Name:</strong> {profile.personalDetails.name}</p>
          <p><strong>Age:</strong> {profile.personalDetails.age}</p>
          <p><strong>Email:</strong> {profile.personalDetails.email}</p>
          <p><strong>Contact Number:</strong> {profile.personalDetails.contactNumber}</p>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">Educational History</h2>
          <ul className="list-group list-group-flush">
            {profile.educationalHistory.map((edu, index) => (
              <li className="list-group-item" key={index}>
                <strong>{edu.degree}</strong> from {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">Enrolled Courses</h2>
          <ul className="list-group list-group-flush">
            {profile.enrolledCourses.map((course, index) => (
              <li className="list-group-item" key={index}>
                <strong>{course.courseName}</strong> by {course.instructor} (Duration: {course.duration})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <Link to="/edit" className="btn btn-primary">Edit Profile</Link>
      </div>
    </div>
  );
};

export default ProfileDetails;
