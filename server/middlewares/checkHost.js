import jwt from 'jsonwebtoken';
import HostModel from '../models/HostModel.js';

const checkHost = async(req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ err: true, message: 'Unauthorized: No token provided' });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ err: true, error: true, message: "Invalid token format" });
    }

    const jwtToken = tokenParts[1];
    
    // Verify the host's token and retrieve user details
    const verifiedJWT = jwt.verify(jwtToken, process.env.TOKEN_SECRET_KEY);
    
    const host = await HostModel.findById(verifiedJWT.id, { password: 0 });

    if (!host) {
      return res.status(404).json({ err: true, error: true, message: "Host not found" });
    }
    if (host.blocked) {
      return res.status(403).json({ err: true, error: true, message: "Host is blocked" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: true, error: true, message: "Internal Server Error" });
  }
};

export default  checkHost ;
