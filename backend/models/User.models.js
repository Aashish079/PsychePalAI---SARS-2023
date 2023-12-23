import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    email:{
        type: String,
    },
    username:{
        type: String,
        required: false,
        unique: true
    },
    entries:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journal'
    }]

},{
    collection: 'users',
    timestamps: true
});

export const User = mongoose.model('User', UserSchema);