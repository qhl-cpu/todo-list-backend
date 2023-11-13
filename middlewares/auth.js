const jwt = require('jsonwebtoken');
const User = require('../models/todoModel');

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.MY_SECRET);
    req.user = user;
    next();
  } catch (error) {
    // res.clearCookie("token");
    return res.status(401).json({ error: error.message });
  }
};

module.exports = auth;
