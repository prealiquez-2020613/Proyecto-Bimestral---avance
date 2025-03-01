'use strict'

import express from 'express' //Servidor HTTP
import morgan from 'morgan' //Logs
import helmet from 'helmet' //Seguridad para HTTP
import cors from 'cors' //Acceso al API
import authRoutes from '../src/auth/auth.routes.js'
import { limiter } from '../middlewares/rate.limit.js'
import userRoutes from '../src/user/user.routes.js';
import categoryRoutes from '../src/category/category.routes.js';
import productRoutes from '../src/products/product.routes.js';
import shoppingCartRoutes from '../src/shoppingCart/shoppingCart.routes.js';


const configs = (app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
};

const routes = (app)=>{
    app.use(authRoutes);
    app.use('/v1/user', userRoutes);
    app.use('/v1/category', categoryRoutes);
    app.use('/v1/product', productRoutes);
    app.use('/v1/shoppingCart', shoppingCartRoutes);
};


export const initServer = async()=>{
    
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)

    }catch(err){
        console.error('Server init failed', err)
    }
}
