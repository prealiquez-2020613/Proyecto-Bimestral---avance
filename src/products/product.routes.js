import {Router} from 'express';
import {addProduct, getProducts, getProductById, updateProduct, deleteProduct, 
    getOutOfStockProducts, getBestSellingProducts, getProductsByCategory,
    searchProductsByName} from '../products/product.controller.js';
import { validateJwt, adminValidation } from '../../middlewares/validate.jwt.js';
import {addProductValidator, updateProductValidator} from '../../helpers/validators.js';

const api = Router();

//Rutas privadas
api.post('/addProduct', [validateJwt], [adminValidation], [addProductValidator], addProduct);
api.get('/getProducts', [validateJwt], getProducts);
api.get('/searchProduct/:id', [validateJwt], getProductById);
api.put('/updateProduct/:id', [validateJwt], [adminValidation], [updateProductValidator], updateProduct);
api.delete('/deleteProduct/:id', [validateJwt], [adminValidation], deleteProduct);
api.get('/getOutOfStockProducts', [validateJwt], [adminValidation], getOutOfStockProducts);
api.get('/getBestSellingProducts', [validateJwt], getBestSellingProducts);
api.get('/getProductsByCategory/:categoryId', [validateJwt], getProductsByCategory);
api.get('/searchProductsByName', [validateJwt], searchProductsByName);

export default api;