import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import express from 'express';

const app = express();

// Increase the maximum allowed header size
app.maxHttpHeaderSize = 16 * 1024; // Adjust the value as needed

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    // Ensure that the token is present in the request headers
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token not provided",
      });
    }

    // Verify the token
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};

// Admin access
export const isAdmin = async (req, res, next) => {
  try {
    // Ensure that the user object is present in the request
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin access required",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

export default app;
