import jwt from 'jsonwebtoken';
import { findUser } from '../helpers/db.validators.js';

//Validar que venga un token y no haya expirado
export const validateJwt = async(req, res, next) =>{
    try {

        let secretKey = process.env.SECRET_KEY;
        let {authorization} = req.headers;

        if(!authorization) return res.status(401).send({message : 'Unauthorized'});
        let user = jwt.verify(authorization, secretKey);

        const validateUser = await findUser(user.uid);
        if(!validateUser) return res.status(404).send({succes : false, message : 'User Not Found - Unathorized'});

        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).send({message : 'Invalid Token'});
    }
}

//VALIDACIÓN DE CLIENTE
export const clientValidation = (req, res, next) =>{
    try {
        if(req.user.role !== 'CLIENT'){
            return res.status(403).send({message : 'ACCESS DENIED - Just CLIENTS'});
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send({message : 'General Error'});
    }
};

//VALIDACIÓN DE CLIENTE
export const adminValidation = (req, res, next) =>{
    try {
        if(req.user.role !== 'ADMIN'){
            return res.status(403).send({message : 'ACCESS DENIED - Just ADMINS'});
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send({message : 'General Error'});
    }
};