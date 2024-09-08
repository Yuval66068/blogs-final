import { Schema } from "mongoose";

export const imageSchema = new Schema({
    url: {type:String, required:true, minLength:2, maxLength: 500},
    alt: {type:String, required:true, minLength:2, maxLength: 50},
},{ _id: false })