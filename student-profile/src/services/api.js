// src/services/api.js
import axios from 'axios';

const API_URL = 'https://student-profile-backend.vercel.app/api/profile';
//http://localhost:5000/api/profile

const getProfile = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const updateProfile = async (newProfileData) => {
  const response = await axios.put(API_URL, newProfileData);
  return response.data;
};

export default { getProfile, updateProfile };
//
