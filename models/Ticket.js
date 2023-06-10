import mongoose from "mongoose";


const  ticketSchema = new mongoose.Schema({



        expires: {
            type: String,
            required: true,
        },



    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },



},
{
    timestamps:true,
}



);


export default mongoose.model('Ticket', ticketSchema);