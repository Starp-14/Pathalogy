const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const testRoutes = require('./Routes/testRoute');
const patientRoutes = require('./Routes/patientRoute');
const authRoutes = require('./Routes/authRoute'); // Import authRoute

require('./connection'); // MongoDB connection

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/patient', patientRoutes);
app.use('/test', testRoutes);
app.use('/auth', authRoutes); // Add auth route for user authentication

// Server configuration
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
