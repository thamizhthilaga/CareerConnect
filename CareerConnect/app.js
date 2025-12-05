require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectDB = require('./src/config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Static files
app.use(express.static(path.join(__dirname, 'src/public')));

// Routes
app.get('/', (req, res) => {
  res.render('landing', { 
    title: 'CareerConnect - Choose Your Path',
    user: null,
    isStudent: false,
    isMentor: false
  });
});

app.use('/auth', require('./src/routes/authRoutes'));
app.use('/', require('./src/routes/generalRoutes'));
app.use('/assessment', require('./src/routes/assessmentRoutes'));
app.use('/learning', require('./src/routes/learningRoutes'));
app.use('/community', require('./src/routes/communityRoutes'));
app.use('/jobs', require('./src/routes/jobRoutes'));
app.use('/resume', require('./src/routes/resumeRoutes'));

// 404 Error handler
app.use((req, res) => {
  res.status(404).render('error', { 
    title: '404 - Not Found', 
    message: 'Page not found',
    user: req.session?.user || null,
    isStudent: req.session?.user?.role === 'student',
    isMentor: req.session?.user?.role === 'mentor'
  });
});


// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { 
    title: 'Server Error', 
    message: err.message || 'Something went wrong!',
    user: req.session?.user || null,
    isStudent: req.session?.user?.role === 'student',
    isMentor: req.session?.user?.role === 'mentor'
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
