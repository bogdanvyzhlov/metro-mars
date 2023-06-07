import express from 'express';

import mongoose from "mongoose";

import {registerValidations} from './validations/auth.js'

import  checkAuth from './utils/checkAuth.js'

import * as UserController from './controllers/UserController.js'

import * as RoleController from './controllers/RoleController.js'

mongoose
    .connect('mongodb+srv://bogdanvyzhlov:123@cluster0.gacy6ht.mongodb.net/metro?retryWrites=true&w=majority')
    .then(()=> console.log('DB OK'))
    .catch((err)=>console.log('DB error', err));


const app=express();

app.use(express.json());

RoleController.createRoles().then(()=>{


    app.get('/', (req, res)=>{
        res.send('Hello world!');
    });


    app.post('/auth/login', UserController.login );
    app.post('/auth/register', registerValidations, UserController.register);
    app.get('/auth/me', checkAuth, UserController.getMe);

    app.listen(4444,(err)=>{
        if(err){
            return console.log(err);
        }
        console.log('Server OK')
    });

});

