import Enrollment from '../models/enrollment.model.js';

// Middleware to check if the user is enrolled in the class
export const checkEnrollment = async (req, res, next) => {
  const { classId } = req.params; // Assumes the class ID is passed in the request parameters
  const userId = req.user._id;    // Assumes you have a `req.user` from JWT authentication

  // Check if the user is enrolled in the class
  const enrollment = await Enrollment.findOne({ class: classId, user: userId });
  
  if (!enrollment) {
    return res.status(403).json({
      statusCode: 403,
      success: false,
      message: 'Access denied. You are not enrolled in this class.'
    });
  }

  // If the user is enrolled, proceed to the next middleware or route handler
  next();
};
