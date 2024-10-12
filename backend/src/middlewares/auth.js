import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // get token
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthenticated" });

  //   verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.userID = decoded.id;
    next();
  });
};

export default verifyToken;
