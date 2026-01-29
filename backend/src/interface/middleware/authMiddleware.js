const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    console.log(' Auth middleware called'); 
    console.log('Headers:', req.headers.authorization); 
    
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log(' No token found'); 
      return res.status(401).json({
        success: false,
        error: 'No token provided. Please login.'
      });
    }

    const token = authHeader.substring(7); 
    console.log(' Token found:', token.substring(0, 20) + '...'); 

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-change-this'
    );

    console.log(' Token verified, userId:', decoded.userId); 

    // Add user ID to request object
    req.userId = decoded.userId;
    req.userEmail = decoded.email;

    next();
  } catch (error) {
    console.error(' Auth error:', error.message); 
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token. Please login again.'
    });
  }
};

module.exports = authMiddleware;