import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
    id :{
        type: String,
        unique: true,
    },
    date : {
        type: Date,
        required: true,
        default: Date.now
    },
    title:{
        type: String,
        default: Date.now + " Journal Entry"
    },
    content:{
        type:String,
        required:true,
        default: "Write about your day here!"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user:{
        type: String,
        ref: 'User'
    }
},{collection: 'journal',timestamps: true});

export const Journal = mongoose.model('Journal', JournalSchema);