//VALIDACIONES EN RELACIÓN A LA DB

import User from '../src/user/user.model.js';
import Category from '../src/category/category.model.js';
import {isValidObjectId, Schema} from 'mongoose';

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username});
    if(alreadyUsername){
        console.error(`Username ${username} already exist`);
        throw new Error(`Username ${username} already exist`);
    }
};

export const existEmail = async(email)=>{
    const alreadyExist = await User.findOne({email});
    if(alreadyExist){
        console.error(`Email ${email} already exist`);
        throw new Error(`Email ${email} already exist`);
    }
};

export const existCategory = async(name)=>{
    const alreadyExist = await Category.findOne({name});
    if(alreadyExist){
        console.error(`Category ${name} already exist`);
        throw new Error(`Category ${name} already exist`);
    }
};

export const objectIdValid = async (objectId)=>{
    if(!isValidObjectId(objectId)){
        throw new Error('Keeper is not objectId')
    }
};

export const findUser = async (id)=>{
    try {
        const userExist = await User.findById(id);
        if (!userExist) return false;
        return userExist;
    } catch (error) {
        console.error(error);
        return false;
    }
}