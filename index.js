import express from 'express';

import mongoose from "mongoose";
import cors from 'cors'
import multer from 'multer';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import {loginValidations, registerValidations, updateValidations} from './validations/validations.js';

import  checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';

import * as RoleController from './controllers/RoleController.js';

import * as TicketController from './controllers/TicketController.js';

import handleValidationsErrors from "./utils/handleValidationsErrors.js";


mongoose
    .connect('mongodb+srv://bogdanvyzhlov:123@cluster0.gacy6ht.mongodb.net/metro?retryWrites=true&w=majority')
    .then(()=> console.log('DB OK'))
    .catch((err)=>console.log('DB error', err));


const app=express();

app.use(cors());

app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
        },
    },
    apis: ['/Users/bogdanvyzlov/wa_ss2022_xvyzhlov/index.js'], // Укажите путь к вашему файлу с роутами
};

const swaggerSpec = swaggerJSDoc(options);




const storage = multer.diskStorage({
    destination: (_,__, cb)=>{
        cb(null, 'uploads')
    },
    filename: (_,file, cb)=>{
        cb(null, file.originalname)
    },
});

const upload = multer({storage});

RoleController.createRoles().then(()=>{
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/', (req, res)=>{
        res.send('Hello world!');
    });
    /**
     * @swagger
     * /upload:
     *   post:
     *     summary: Upload an image
     *     description: Endpoint to upload an image file.
     *     parameters:
     *       - in: formData
     *         name: image
     *         type: file
     *         required: true
     *     responses:
     *       200:
     *         description: URL of the uploaded image
     */
    app.use('/uploads', express.static('uploads'));
    app.post('/upload', checkAuth('passenger'), upload.single('image'), (req,res)=>{
        res.json({
            url: `/uploads/${req.file.originalname}`,
        });
    });
    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: User login
     *     description: Endpoint for user login.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: User data and authentication token
     */
    app.post('/auth/login',loginValidations ,handleValidationsErrors,UserController.login );
    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: User registration
     *     description: Endpoint for user registration.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               fullName:
     *                 type: string
     *
     *     responses:
     *       200:
     *         description: User data and authentication token
     */
    app.post('/auth/register', registerValidations,handleValidationsErrors, UserController.register);
    /**
     * @swagger
     * /auth/me:
     *   get:
     *     summary: Get user profile
     *     description: Endpoint to retrieve user profile.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: User profile
     */
    app.get('/auth/me', checkAuth('passenger','worker','admin', 'technician'), UserController.getMe);
    /**
     * @swagger
     * /tickets:
     *   get:
     *     summary: Get all tickets
     *     description: Endpoint to retrieve all tickets.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: List of tickets
     */
    app.get('/tickets', checkAuth('passenger'), TicketController.getAll);
    /**
     * @swagger
     * /tickets/{id}:
     *   get:
     *     summary: Get a ticket
     *     description: Endpoint to retrieve a specific ticket.
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         type: string
     *         required: true
     *         description: Ticket ID
     *     responses:
     *       200:
     *         description: Ticket details
     */
    app.get('/tickets/:id', checkAuth('passenger'), TicketController.getOne);
    /**
     * @swagger
     * /tickets:
     *   post:
     *     summary: Create a ticket
     *     description: Endpoint to create a new ticket.
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               numberOfTicket:
     *                 type: number
     *     responses:
     *       200:
     *         description: Created ticket
     */
    app.post('/tickets',checkAuth(['passenger','worker']), TicketController.create);


    app.get('/auth/users', checkAuth('admin'), UserController.getAllUsers);




    app.post('/auth/users/:id', checkAuth('admin'), updateValidations, handleValidationsErrors,UserController.updateUser);

    app.delete('/auth/users/:id', checkAuth('admin'),  UserController.deleteUser);

    app.get('/auth/users/:id', checkAuth('admin'), UserController.getUserById);

    app.listen(4444,(err)=>{
        if(err){
            return console.log(err);
        }
        console.log('Server OK')
    });

});

