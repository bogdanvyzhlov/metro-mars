import mongoose from "mongoose";

const stationSchema= new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
    },
    aboutWork: {
        type: String,
        required: true,

    },
    coordinates: {
        type: {
            x: Number,
            y: Number,
        },
        required: true,
    },
    neighbors: [String],

},{
    timestamps:true,



});

export default mongoose.model('Station', stationSchema);