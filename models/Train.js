import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    schedule: [{
        station: {
            type: String,
            required:true,
        },
        arrivalTime: {
            type: String,
            required: true,
        },
    }],

});

export default mongoose.model('Train', trainSchema);
