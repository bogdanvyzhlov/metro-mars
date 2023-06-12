
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import RoleModel from "../models/Role.js";





export  const register = async (req, res) =>{

    try {

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const role = await RoleModel.findOne({name: 'passenger'});
        const hash = await bcrypt.hash(password, salt);
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
            roleId: role._id,
            role: role.name
        });

        const user = await doc.save();
        const token = jwt.sign({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }, 'secret123',
            {
                expiresIn: '30d',
            }
        );
        const { passwordHash, ...userData} = user._doc;
        res.json({
            ...userData,
            token,
        });
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Failed to register'
        });
    }
};


 export const getAllUsers= async (req,res)=> {
     try {

         const users = await UserModel.find();
         if(!users){
             return res.status(404).json({
                 message: 'Users is undefined'
             });
         }

         res.json(users);
     } catch (error) {
         console.error('Error:', error);
         res.status(500).json({error: 'Failed to fetch users'});

     }
 };


export const updateUser = async (req,res)=>{

    try {

        const Userid  = await req.params.id;
        const {fullName, email, role}  = await req.body;
        const role1 = await RoleModel.findOne({name:req.body.role});
        const role_id= role1._id;
        const user = await UserModel.findByIdAndUpdate(Userid, { fullName, email, role_id, role }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
};

export  const login= async (req,res)=>{
    try{

        const user= await UserModel.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({
                message:'User is unedefined',
            });
        }
        const isValidPass= await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPass){
            return res.status(404).json({
                message:'Invalid username or password',
            });
        }
        const token = jwt.sign({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }, 'secret123',
            {
                expiresIn: '30d',
            }
        );
        const { passwordHash, ...userData} = user._doc;
        res.json({
            ...userData,
            token,

        });


    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Failed to log in'
        });
    };




};

export const getMe= async (req, res)=>{
    try {
        const userId= req.params.id;
        const user= await UserModel.findOne(req.userId);
        if(!user){
            return res.status(404).json({
                message: 'User is undefined'
            });
        }
        const { passwordHash, ...userData} = user._doc;
        res.json(userData);



    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'No access'
        });
    }


};
export const getUserById= async (req, res)=>{
    try {

        const user= await UserModel.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                message: 'User is undefined'
            });
        }
        const { passwordHash, ...userData} = user._doc;
        res.json(userData);



    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'No access'
        });
    }


};


export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        await  UserModel.deleteOne(user);

        res.status(200).json({
            message: 'User deleted successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete user',
        });
    }
};



