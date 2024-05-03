
import mongoose, { Schema } from 'mongoose';

let ProductSchma = new Schema({
    name:String,
    category: String,
    price:String,
    band:String,
},{
    timestamps:true
})
export const Products= mongoose.model('Product', ProductSchma);

