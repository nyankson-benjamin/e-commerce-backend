const { Router } = require("express");
const products = require("../controllers/productsController");
const productRoute = Router();

// /**
//  * @swagger
//  * /products:
//  *   get:
//  *     summary: Retrieve a list of products
//  *     tags: [Products]
//  *     responses:
//  *       200:
//  *         description: A list of products.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Product'
//  *       500:
//  *         description: Internal Server Error
//  */
productRoute.get("/products", products.products);

/**
 * @swagger
 * /addtocart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             example:
 *               productId: "60c72b2f9b1e8a3a2b3e4e2b"
 *               quantity: 2
 *     responses:
 *       200:
 *         description: Product added to cart
 *       400:
 *         description: Bad request
 */
productRoute.post("/addtocart", products.AddtoCart);

/**
 * @swagger
 * /bulkAddToCart:
 *   post:
 *     summary: Add multiple products to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *             example:
 *               - productId: "60c72b2f9b1e8a3a2b3e4e2b"
 *                 quantity: 2
 *               - productId: "60c72b3e9b1e8a3a2b3e4e3c"
 *                 quantity: 1
 *     responses:
 *       200:
 *         description: Products added to cart
 *       400:
 *         description: Bad request
 */
productRoute.post("/bulkAddToCart", products.addBulk);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Retrieve the user's cart items
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: A list of cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       500:
 *         description: Internal Server Error
 */
productRoute.get("/cart", products.getCarts);

/**
 * @swagger
 * /delete/cartItem:
 *   delete:
 *     summary: Delete a cart item
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *             example:
 *               productId: "60c72b2f9b1e8a3a2b3e4e2b"
 *     responses:
 *       200:
 *         description: Cart item deleted
 *       404:
 *         description: Cart item not found
 */
productRoute.delete("/delete/cartItem", products.deleteCartItem);

/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: Purchase items in the cart
 *     tags: [Purchase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethod:
 *                 type: string
 *               address:
 *                 type: string
 *             example:
 *               paymentMethod: "credit_card"
 *               address: "123 Main St, Springfield"
 *     responses:
 *       200:
 *         description: Purchase successful
 *       400:
 *         description: Bad request
 */
productRoute.post("/purchase", products.PurchaseItem);

module.exports = productRoute;
