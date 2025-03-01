import {Router} from 'express';
import { addToCart, removeFromCart, getCart } from '../shoppingCart/shoppingCart.controller.js';
import { validateJwt, clientValidation } from '../../middlewares/validate.jwt.js';
import { addToCartValidator } from '../../helpers/validators.js';

const api = Router();

//Rutas privadas
api.post('/addToCart', [validateJwt], [clientValidation], [addToCartValidator], addToCart);
api.put('/removeFromCart', [validateJwt], [clientValidation], removeFromCart);
api.get('/getCart', [validateJwt], [clientValidation], getCart);

export default api;