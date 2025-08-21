import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/User-Controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const UserRoute = express.Router();
UserRoute.use(authenticate)
UserRoute.get("/get-user/:userid", getUser);
UserRoute.put("/update-user/:userid", upload.single("file"), updateUser);
UserRoute.get("/get-all-user", getAllUsers);
UserRoute.delete("/delete/:id", deleteUser);

export default UserRoute;
