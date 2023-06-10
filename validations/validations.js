import {body} from "express-validator";



export const loginValidations=[
  body('email', 'It is not email').isEmail(),
  body('password','Minimum must be 5 symbols').isLength({min:5}),

];


export const registerValidations=[
  body('email', 'It is not email').isEmail(),
  body('password','Minimum must be 5 symbols').isLength({min:5}),
  body('fullName', 'Please write a full name').isLength({min:3}),
  body('avatarUrl', 'Link is a bad').optional().isURL(),
];




