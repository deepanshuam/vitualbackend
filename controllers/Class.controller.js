import Class from "../models/class.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new class
const createClass = asyncHandler(async (req, res) => {
  const { className, description, instructor, units } = req.body;

  if (!className || !description || !instructor) {
    throw new ApiError(400, "Class name, description, and instructor are required");
  }

  const newClass = new Class({
    className,
    description,
    instructor,
    units
  });

  const savedClass = await newClass.save();

  return res.status(201).json(new ApiResponse(200, savedClass, "Class created successfully"));
});

// Get all classes
const getAllClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find().populate('instructor');
  
  return res.status(200).json(new ApiResponse(200, classes, "Classes fetched successfully"));
});

// Get a single class by ID
const getClassById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const classData = await Class.findById(id).populate('instructor');

  if (!classData) {
    throw new ApiError(404, "Class not found");
  }

  return res.status(200).json(new ApiResponse(200, classData, "Class fetched successfully"));
});

// Update a class by ID
const updateClass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { className, description, units } = req.body;

  const updatedClass = await Class.findByIdAndUpdate(
    id,
    { className, description, units },
    { new: true, runValidators: true }
  ).populate('instructor');

  if (!updatedClass) {
    throw new ApiError(404, "Class not found");
  }

  return res.status(200).json(new ApiResponse(200, updatedClass, "Class updated successfully"));
});

// Delete a class by ID
const deleteClass = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedClass = await Class.findByIdAndDelete(id);

  if (!deletedClass) {
    throw new ApiError(404, "Class not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Class deleted successfully"));
});

export { createClass, getAllClasses, getClassById, updateClass, deleteClass };
