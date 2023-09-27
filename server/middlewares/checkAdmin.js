
const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ err: true, message: 'Unauthorized: No token provided' });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ err: true, error: true, message: "Invalid token format" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: true, error: true, message: "Internal Server Error" });
  }
};

export default  checkAdmin ;