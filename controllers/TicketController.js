import TicketModel from '../models/Ticket.js';
import UserModel from "../models/User.js";



export const getAll= async (req,res)=>{
try {
    const userId=req.params.user_id;
    const tickets = await TicketModel.find({ user: userId });
    res.json(tickets);


} catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'Failed to get all tickets',
    });
}



};


export const  create= async (req,res)=>{
  try {
      const user = await UserModel.findById(req.body.user_id);
      const doc= new TicketModel({
          expires: req.body.expires,
          user_id: user._id,
      });
     const ticket = await doc.save();


     res.json(ticket);

  } catch (err) {
      console.log(err);
      res.status(500).json({
          message: 'Failed to create ticket',
      });
  }



};

export  const getOne= async (req, res)=>{
    try{
     const ticketID= req.params.id;
     const ticket=await TicketModel.findById(ticketID);
     if(!ticket){
         return res.status(404).json({
             message: 'Not found',
         });
     }
     res.json(ticket);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to open',
        });
    }




};