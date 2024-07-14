const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Verify JWT token
const checkAuthenticated = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Access denied' });

    req.user = await User.findById(decoded.UserInfo.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    //console.log('User:', req.user);
    next();
  });
});

// Verify Admin Role
const checkAdmin = asyncHandler(async (req, res, next) => {
  //console.log("Checking admin role for user:", req.user);

  if (req.user && req.user.role.includes('admin')){
    console.log("User is admin");
    next();
  } else {
    console.log("User is not admin");
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
});

module.exports = { checkAuthenticated, checkAdmin };
