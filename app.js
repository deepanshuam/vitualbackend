import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import classRouter from "./routes/class.route.js";
import discussRouter from "./routes/discussion.route.js";
import adminRouter from "./routes/admin.route.js";

import { corsOptions } from "./config/config.js";

const app = express();

// setup to access the permission of the cors
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     console.log('Incoming request:', req.body, req.file);
//     next();
//   });

// configuration
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// To acess and set the user server cookies.
app.use(cookieParser());

//routes path define
app.use("/api/v1/users", userRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/discussion", discussRouter);
app.use("/api/v1/admin", adminRouter); // Register admin routes
export { app };
