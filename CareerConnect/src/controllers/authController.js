const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword, renderWithUser } = require('../utils/helpers');

// Landing page (role selection)
exports.landingPage = (req, res) => {
  res.render('landing', { 
    title: 'CareerConnect - Choose Your Path',
    user: null,
    isStudent: false,
    isMentor: false
  });
};

// Registration page
exports.registerPage = (req, res) => {
  const role = req.query.role || 'student';
  if (!['student', 'mentor'].includes(role)) {
    return res.status(400).render('error', { 
      title: '400 - Bad Request',
      message: 'Invalid role',
      user: req.session?.user || null,
      isStudent: req.session?.user?.role === 'student',
      isMentor: req.session?.user?.role === 'mentor'
    });
  }
  res.render('auth/register', { 
    title: 'Register - CareerConnect', 
    role,
    user: null,
    isStudent: false,
    isMentor: false
  });
};

// Register user
exports.register = async (req, res) => {
  try {
    const { email, password, confirmPassword, fullName, role } = req.body;

    // Validation
    if (!email || !password || !confirmPassword || !fullName || !role) {
      return res.status(400).render('auth/register', {
        title: 'Register - CareerConnect',
        role,
        error: 'All fields are required',
        user: null,
        isStudent: false,
        isMentor: false
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).render('auth/register', {
        title: 'Register - CareerConnect',
        role,
        error: 'Passwords do not match',
        user: null,
        isStudent: false,
        isMentor: false
      });
    }

    if (password.length < 6) {
      return res.status(400).render('auth/register', {
        title: 'Register - CareerConnect',
        role,
        error: 'Password must be at least 6 characters',
        user: null,
        isStudent: false,
        isMentor: false
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).render('auth/register', {
        title: 'Register - CareerConnect',
        role,
        error: 'Email already registered',
        user: null,
        isStudent: false,
        isMentor: false
      });
    }

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      password,
      fullName,
      role,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Save basic user info in session for view rendering
    req.session.user = user.toJSON ? user.toJSON() : { id: user._id, email: user.email, role: user.role, fullName: user.fullName };

    // Redirect to role-specific dashboard
    if (user.role === 'student') {
      return res.redirect('/student-dashboard');
    } else if (user.role === 'mentor') {
      return res.redirect('/mentor-dashboard');
    }
    return res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Registration failed',
      user: req.session?.user || null,
      isStudent: req.session?.user?.role === 'student',
      isMentor: req.session?.user?.role === 'mentor'
    });
  }
};

// Login page
exports.loginPage = (req, res) => {
  res.render('auth/login', { 
    title: 'Login - CareerConnect',
    user: null,
    isStudent: false,
    isMentor: false
  });
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render('auth/login', {
        title: 'Login - CareerConnect',
        error: 'Email and password are required',
        user: null,
        isStudent: false,
        isMentor: false
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).render('auth/login', {
        title: 'Login - CareerConnect',
        error: 'Invalid email or password',
        user: null,
        isStudent: false,
        isMentor: false
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).render('auth/login', {
        title: 'Login - CareerConnect',
        error: 'Invalid email or password',
        user: null,
        isStudent: false,
        isMentor: false
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Save basic user info in session for view rendering
    req.session.user = user.toJSON ? user.toJSON() : { id: user._id, email: user.email, role: user.role, fullName: user.fullName };

    // Redirect to role-specific dashboard
    if (user.role === 'student') {
      return res.redirect('/student-dashboard');
    } else if (user.role === 'mentor') {
      return res.redirect('/mentor-dashboard');
    }

    return res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Login failed',
      user: req.session?.user || null,
      isStudent: req.session?.user?.role === 'student',
      isMentor: req.session?.user?.role === 'mentor'
    });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  // Destroy session user
  if (req.session) {
    req.session.destroy(() => {
      return res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
};
