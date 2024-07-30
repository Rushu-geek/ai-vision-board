import mongoose, { Schema, model, Document } from "mongoose";


export interface IUser extends Document {

    name: string,
    email: string,
    userRole: string
    street?: string,
    city?: string,
    state: string,
    postal: string,
    password?: string,
    dob?: string,
    token: string,
    refreshToken: string,
    phone?: string,
    gender?: "male" | "female"
    isDeleted?: boolean
}

const userSchema: Schema = new Schema({

    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    userRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles'
    },
    city: {
        type: String,
    },
    dob: {
        type: String,
    },
    state: {
        type: String
    },
    postal: {
        type: String
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
console.log("Hi from UserModel")

export default model<IUser>("Users", userSchema);