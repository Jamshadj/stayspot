import jwt from 'jsonwebtoken';

const checkAdmin = (req, res, next) => {
  const token = req.cookies.adminToken; // Assuming you store the token in a cookie

  if (!token) {
    return res.status(401).json({ err: true, message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token,  process.env.TOKEN_SECERET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ err: true, message: 'Unauthorized: Invalid token' });
    } else {
      // Attach the user information to the request object
      req.user = decodedToken;
      next();
    }
  });
};

export default  checkAdmin ;