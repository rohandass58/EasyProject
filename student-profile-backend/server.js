// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

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

app.get('/api/profile', (req, res) => {
  res.json(profileData);
});

app.put('/api/profile', (req, res) => {
  profileData = req.body;
  res.json(profileData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
