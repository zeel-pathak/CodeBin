import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        default: "null"
    },
    expireAt: {
        type: Date,
        default: Date.now() + (604800000)   // expires in 7 Days
      },

});

export default mongoose.model('Documents', documentSchema)