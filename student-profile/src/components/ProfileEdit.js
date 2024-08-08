import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getProfile().then(data => setProfile(data));
  }, []);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      personalDetails: {
        ...prevProfile.personalDetails,
        [name]: value
      }
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...profile.educationalHistory];
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    setProfile(prevProfile => ({ ...prevProfile, educationalHistory: updatedEducation }));
  };

  const handleCourseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCourses = [...profile.enrolledCourses];
    updatedCourses[index] = { ...updatedCourses[index], [name]: value };
    setProfile(prevProfile => ({ ...prevProfile, enrolledCourses: updatedCourses }));
  };

  const handleAddEducation = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      educationalHistory: [...prevProfile.educationalHistory, { degree: '', institution: '', year: '' }]
    }));
  };

  const handleAddCourse = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      enrolledCourses: [...prevProfile.enrolledCourses, { courseName: '', instructor: '', duration: '' }]
    }));
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = profile.educationalHistory.filter((_, i) => i !== index);
    setProfile(prevProfile => ({ ...prevProfile, educationalHistory: updatedEducation }));
  };

  const handleRemoveCourse = (index) => {
    const updatedCourses = profile.enrolledCourses.filter((_, i) => i !== index);
    setProfile(prevProfile => ({ ...prevProfile, enrolledCourses: updatedCourses }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.updateProfile(profile).then(() => {
      navigate('/');
    });
  };

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="container profile-container mt-5">
      <h1 className="text-center">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Personal Information</h2>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile.personalDetails.name}
                onChange={handlePersonalChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={profile.personalDetails.age}
                onChange={handlePersonalChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profile.personalDetails.email}
                onChange={handlePersonalChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="text"
                name="contactNumber"
                value={profile.personalDetails.contactNumber}
                onChange={handlePersonalChange}
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Educational History</h2>
            {profile.educationalHistory.map((edu, index) => (
              <div key={index} className="form-group">
                <label>Degree:</label>
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="form-control"
                />
                <label>Institution:</label>
                <input
                  type="text"
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="form-control"
                />
                <label>Year:</label>
                <input
                  type="text"
                  name="year"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="form-control"
                />
                <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveEducation(index)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn btn-primary mt-3" onClick={handleAddEducation}>Add Education</button>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Enrolled Courses</h2>
            {profile.enrolledCourses.map((course, index) => (
              <div key={index} className="form-group">
                <label>Course Name:</label>
                <input
                  type="text"
                  name="courseName"
                  value={course.courseName}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="form-control"
                />
                <label>Instructor:</label>
                <input
                  type="text"
                  name="instructor"
                  value={course.instructor}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="form-control"
                />
                <label>Duration:</label>
                <input
                  type="text"
                  name="duration"
                  value={course.duration}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="form-control"
                />
                <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveCourse(index)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn btn-primary mt-3" onClick={handleAddCourse}>Add Course</button>
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
