import { imageSchema } from './image';
import { Schema } from "mongoose";

export const blogSchema = new Schema({
    title: {type:String},
    subtitle: {type:String},
    body: {type:String},
    image: {type: imageSchema},
    userId: {type:String, required:true},
    likes: [{type:String}],
}, {timestamps:true})