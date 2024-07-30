import mongoose, { Schema, model, Document } from "mongoose";


export interface IRole extends Document {

    role: string,
    isDeleted?: boolean
}

console.log("Hi from Role model")

const roleSchema: Schema = new Schema({

    role: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default model<IRole>("Roles", roleSchema);