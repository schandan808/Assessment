
import mongoose, { Schema } from 'mongoose';

let UserSchma = new Schema({
    name:{type:String},
    role: { type: String, required: true ,enum:["admin", 'user']}, 
    email:{type:String , required: true },
    password:{type:String, required: true },
    accessToken:{type:String},
},{
    timestamps:true
})
export const Users= mongoose.model('Users', UserSchma);

// export{
//     Users
// }