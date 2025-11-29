function asyncHandler(func) {
  return function (req, res, next) {
    Promise.resolve(func(req, res, next)).catch(next);
  };
}



//USER CONTROLLER 
exports.getUser = async (req, res) => {
  // Example: DB call
  const user = await User.findById(req.params.id);

  res.json({
    success: true,
    data: user
  });
};

//ROUTE MEIN USE KARTE HAIN 
// routes/user.routes.js

const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/user.controller');
const asyncHandler = require('../utils/asyncHandler');

router.get('/:id', asyncHandler(getUser));
router.put('/:id', asyncHandler(updateUser));




// Global Error Handler Middleware (most important)
// middlewares/errorHandler.js

module.exports = (err, req, res, next) => {
  console.log("Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error"
  });
};
