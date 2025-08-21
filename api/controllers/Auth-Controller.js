import bcrypt from "bcryptjs";
import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//Register
export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      //User already Registered
      next(handleError(409, "User Already Registered"));
    }
    //Register User
    const hashedPassword = bcryptjs.hashSync(password);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

//Login
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Compare email from db if user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      next(handleError(404, " Invalid login credentials"));
    }

    //Compare password from db
    const hashedPassword = user.password;
    const comparePassword = bcrypt.compare(password, hashedPassword);
    if (!comparePassword) {
      next(handleError(404, "Invalid login credentials"));
    }

    //Setting Token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );

    //Setting cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    //Convert it in Object to delete password
    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    //Send response if credentials are correct
    res.status(200).json({
      success: true,
      user: newUser,
      message: "User Logged In Successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

//Google Login
export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;

    //Compare email from db if user exists or not
    let user;
    user = await User.findOne({ email });
    if (!user) {
      //Create New User
      const password = Math.random().toString();
      const hashedPassword = bcryptjs.hashSync(password);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      });
      user = await newUser.save();
    }
    //Setting Token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );

    //Setting cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    //Convert it in Object to delete password
    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    //Send response if credentials are correct
    res.status(200).json({
      success: true,
      user: newUser,
      message: "Logged In Successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

//Logout
export const Logout = async (req, res, next) => {
  try {
    //Setting cookie
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    //Send response if credentials logout
    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
