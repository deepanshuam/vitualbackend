import { User } from "../models/user.model.js";
import Class from '../models/class.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get total students, teachers, and books
export const getAdminStats = asyncHandler(async (req, res) => {
  // Count the number of students
  const totalStudents = await User.countDocuments({ role: 'student' });

  // Count the number of teachers
  const totalTeachers = await User.countDocuments({ role: 'teacher' });

  // Count the number of books
  const totalClass = await Class.countDocuments();

  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      totalTeachers,
      totalClass,
    }
  });
});
