const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).redirect('/auth/login');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).redirect('/auth/login');
    }
    req.user = user;
    next();
  });
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).render('error', { message: 'Access Denied' });
    }
  };
};

const checkAnyRole = (roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).render('error', { message: 'Access Denied' });
    }
  };
};

module.exports = { authenticateToken, checkRole, checkAnyRole };
