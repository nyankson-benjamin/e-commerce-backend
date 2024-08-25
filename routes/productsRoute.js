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
 * /updatecartquantity:
 *   patch:
 *     summary: Update the quantity of an item in the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               itemId:
 *                 type: string
 *                 description: The ID of the item in the cart
 *               quantity:
 *                 type: integer
 *                 description: The quantity to add to the current amount
 *             example:
 *               userId: "60c72b2f9b1e8a3a2b3e4e2b"
 *               itemId: "60d21b4667d0d8992e610c85"
 *               quantity: 3
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Quantity updated successfully"
 *       400:
 *         description: Bad request, e.g., missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields"
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart item not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
productRoute.patch("/updatecartquantity", products.updateCartQuantity);


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
productRoute.post("/purchase", products.PurchaseItems);

/**
 * @swagger
 * /purchasemultiple:
 *   post:
 *     summary: Purchase multiple items in the cart
 *     tags: [Purchase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               itemIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The ID of the item to be purchased
 *             example:
 *               userId: "60c72b2f9b1e8a3a2b3e4e2b"
 *               itemIds: 
 *                 - "60c72b2f9b1e8a3a2b3e4e2c"
 *                 - "60c72b2f9b1e8a3a2b3e4e2d"
 *     responses:
 *       200:
 *         description: Items marked as purchased
 *       404:
 *         description: Some items were not found in the cart
 *       500:
 *         description: An error occurred while purchasing the items
 */
productRoute.post("/purchasemultiple", products.PurchaseMultipleItems);


module.exports = productRoute;
