import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    tc:{
        type: Boolean,
        required: true,
    },
    blogs: [{
        type : mongoose.Types.ObjectId,
        ref: "Blog",
        required: true,
    }],
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
