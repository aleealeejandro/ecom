const express = require('express');
const router = express.Router();

const {
	   create,
	   productById, 
	   read, 
	   remove, 
	   update, 
	   list, 
	   listRelated, 
	   listCategories, 
	   listBySearch, 
	   photo,
	   listSearch
} = require('../controllers/product');

const {
	   requireSignin,
	   isAuth,
	   isAdmin
} = require('../controllers/auth');

const {userById} = require('../controllers/user');

// reads product
router.get('/product/:productId', read);
// creates product
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
// deletes product
router.delete('/product/:productId/:userId', requireSignin, isAdmin, isAuth, remove);
// updates product
router.put('/product/:productId/:userId', requireSignin, isAdmin, isAuth, update);
// lists all the products
router.get('/products', list);

router.get("/products/search", listSearch);

// list all products with the same category
router.get('/products/related/:productId', listRelated);
// lists all the categories that are being used by products
router.get('/products/categories', listCategories);

router.post("/products/by/search", listBySearch);

router.get('/product/photo/:productId', photo)

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
