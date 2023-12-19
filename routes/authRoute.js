import express from 'express';
import axios from 'axios';
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getOrdersController,
  updateProfileController,
  getAllOrdersController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const app = express();

// Increase the maximum allowed header size
app.maxHttpHeaderSize = 16 * 1024; // Adjust the value as needed
axios.defaults.maxContentLength = 1000000; // Set to a value that suits your needs

// Router object
const router = express.Router();

// Routing
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

// Test routes
router.get("/test", requireSignIn, isAdmin, testController);

// Protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//updatprof
router.put('/profile', requireSignIn, updateProfileController)

router.put('/orders', requireSignIn, getOrdersController)

router.put('/all-orders', requireSignIn, getAllOrdersController)
export default router;
