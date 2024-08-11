const { Router } = require("express");
const users = require("../controllers/usersController");
const usersRoute = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [users]

 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60c72b2f9e1d4e3a2c9b1e49
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *       500:
 *         description: Internal Server Error
 */

usersRoute.get("/users", users.users);
module.exports = usersRoute;
