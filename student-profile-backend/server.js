const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https://easy-project.vercel.app/favicon.ico"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      // You can add more directives here as needed
    }
  }
}));

// Middleware for CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// Constant data
let profileData = {
  personalDetails: {
    name: "John Doe",
    age: 22,
    email: "johndoe@example.com",
    contactNumber: "123-456-7890",
  },
  educationalHistory: [
    { degree: "B.Sc. in Computer Science", institution: "University A", year: "2018-2022" },
    { degree: "High School Diploma", institution: "School B", year: "2014-2018" }
  ],
  enrolledCourses: [
    { courseName: "React Development", instructor: "Jane Smith", duration: "3 months" },
    { courseName: "Node.js Basics", instructor: "John Brown", duration: "2 months" }
  ]
};

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API. Navigate to /api/profile to access the profile data.');
});

// API route to get profile data
app.get('/api/profile', (req, res) => {
  res.json(profileData);
});

// API route to update profile data
app.put('/api/profile', (req, res) => {
  profileData = req.body;
  res.json(profileData);
});

// Export the app for Vercel
module.exports = app;
