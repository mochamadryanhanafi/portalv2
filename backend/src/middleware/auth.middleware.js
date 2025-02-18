const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized, please login' });
  }
  next();
};

const adminMiddleware = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
