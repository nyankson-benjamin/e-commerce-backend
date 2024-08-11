const { Router } = require("express");
const authController = require("../controllers/authController");
const authRoute = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: johndoe
 *               email: johndoe@example.com
 *               password: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
authRoute.post("/user/register", authController.signup);

/**
 * @swagger
 * /confirm:
 *   post:
 *     summary: Confirm user registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *             example:
 *               token: "confirmation_token"
 *     responses:
 *       200:
 *         description: User confirmed successfully
 *       400:
 *         description: Invalid or expired token
 */
authRoute.post("/confirm", authController.confirm);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: johndoe@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized, invalid credentials
 */
authRoute.post("/user/login", authController.login);

/**
 * @swagger
 * /forgetPassword:
 *   post:
 *     summary: Request a password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: johndoe@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: Email not found
 */
authRoute.post("/forgetPassword", authController.forgetPassword);

/**
 * @swagger
 * /resetPassword:
 *   post:
 *     summary: Reset a user's password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               token: "reset_token"
 *               newPassword: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token
 */
authRoute.post("/resetPassword", authController.resetPassword);

/**
 * @swagger
 * /getToken:
 *   post:
 *     summary: Refresh an access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: "refresh_token"
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized, invalid refresh token
 */
authRoute.post("/getToken", authController.refreshToken);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized, access token is missing or invalid
 */
authRoute.get('/user/profile', authController.protectedRoute, (req, res) => {
    // This route is protected, only accessible with a valid access token
    res.json({ message: 'User profile', user: req.user });
});

module.exports = authRoute;
