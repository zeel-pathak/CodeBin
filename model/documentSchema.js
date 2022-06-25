import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true
    }

});

export default mongoose.model('Documents', documentSchema)