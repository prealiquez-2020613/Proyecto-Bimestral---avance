import {Router} from 'express';
import {getAll, get, deleteAccount, deleteUser, updateUser, updatePassword, updateRole} from './user.controller.js';
import {validateJwt, adminValidation} from '../../middlewares/validate.jwt.js';
import {UpdateValidator, newPasswordValidation, deleteAccountValidation, updateRoleValidation} from '../../helpers/validators.js';

const api = Router();


//RUTAS PRIVADAS
api.get('/gettAllUsers',[validateJwt], [adminValidation], getAll);
api.get('/findUser/:id', [validateJwt], [adminValidation], get);
api.delete('/deleteAccount', [validateJwt], [deleteAccountValidation], deleteAccount);
api.delete('/deleteUser/:userId', [validateJwt], [adminValidation], deleteUser);
api.put('/updateUser', [validateJwt], [UpdateValidator], updateUser);
api.put('/updateUserRole/:id', [validateJwt], [adminValidation], [updateRoleValidation], updateRole);
api.put('/updatePasswordUser/:id', [validateJwt], [newPasswordValidation], updatePassword);

export default api;