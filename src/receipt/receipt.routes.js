import {Router} from 'express';
import { generateReceipt, getReceiptsByUser, updateReceiptStatus, getReceiptsByUserById } from '../receipt/receipt.controller.js';
import { validateJwt, adminValidation, clientValidation } from '../../middlewares/validate.jwt.js';
import {generateReceiptValidator} from '../../helpers/validators.js';

const api = Router();

//Rutas privadas
api.post('/generateReceipt', [validateJwt], [clientValidation], [generateReceiptValidator], generateReceipt);
api.get('/getReceiptsByUser', [validateJwt], [clientValidation], getReceiptsByUser);
api.get('/getReceiptsByUserById/:userId', [validateJwt], [adminValidation], getReceiptsByUserById);
api.put('/updateReceiptStatus', [validateJwt], [adminValidation], updateReceiptStatus);

export default api;