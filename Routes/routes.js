const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const wishlistController = require('../Controllers/wishlistController')
const cartController = require('../Controllers/cartController')

const router = new express.Router()

// getAllProducts
router.get('/all-products',productController.getAllProducts)
// register 
router.post('/register',userController.register)
// login
router.post('/login',userController.login)
// viewProduct
router.get('/view-product/:id',productController.getOneProduct)
// addToWishlist
router.post('/add-to-wishlist',jwtMiddleware,wishlistController.addToWishlist)
// getWishlist
router.get('/get-wishlist',jwtMiddleware,wishlistController.getWishlist)
// removeWishlist
router.delete('/wishlist/remove/:id',jwtMiddleware,wishlistController.deleteWishlist)
// addToCart
router.post('/add-to-cart',jwtMiddleware,cartController.addToCart)
// getCart
router.get('/get-cart',jwtMiddleware,cartController.getCart)
// removeWishlist
router.delete('/cart/remove/:id',jwtMiddleware,cartController.deleteCart)
// incrementCart
router.get('/cart/increment/:id',jwtMiddleware,cartController.incrementCart)
// decrementCart
router.get('/cart/decrement/:id',jwtMiddleware,cartController.decrementCart)
// emptyCart
router.delete('/empty-cart',jwtMiddleware,cartController.emptyCart)

module.exports = router