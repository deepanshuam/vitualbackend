// class.controller.js
import { Router } from "express";
import { createClass, getAllClasses, getClassById, updateClass, deleteClass } from "../controllers/class.controller.js";
import { verifyJWT, isTeacher } from "../middleware/Auth.Middleware.js";

const router = Router();

// Routes for class operations
router.route("/classroute")
  .post(verifyJWT, isTeacher, createClass)
  .get(verifyJWT, getAllClasses);

  router.route("/getclass").get(getAllClasses);

router.route("/:id").get(getClassById)
  .put(verifyJWT, isTeacher, updateClass)
  .delete(verifyJWT, isTeacher, deleteClass);

export default router;
