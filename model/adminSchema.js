// import mongoose from "mongoose";

// import {Schema,models} from "mongoose";
import{models, Schema} from "mongoose"
import mongoose from "mongoose"

const adminSchema = new Schema({
 email:{
    type:String,
    required:true,
    toLowerCase:true,
    unique:true,
    trim:true,
    minLength : [12,'Email should be at least 12 Strings'],
 },
 password:{
    type:String,
    required:true,
   
 }


})

module.exports = models.Admin || mongoose.model("Admin", adminSchema)

