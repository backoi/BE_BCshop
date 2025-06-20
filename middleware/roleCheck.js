const roleCheck = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ msg: `Can't access this action, required role: ${role}` });
    }
    next();
  };
};

module.exports = roleCheck;
