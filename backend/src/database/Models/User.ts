import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model("User", userSchema);

