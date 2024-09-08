import { Schema } from "mongoose";
import { nameSchema } from "./name";
import { imageSchema } from "./image";

export const userSchema = new Schema({
    name: {type:nameSchema},
    phone: {type:String},
    email: {type:String},
    password: {type:String},
    image: {type: imageSchema},
    role: {type:String, required:false, default:"basic"},
}, {timestamps:true})