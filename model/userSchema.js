import mongoose from "mongoose";

const {Schema,models} = mongoose;

const userSchema = new Schema({
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
   
 },
 country:{
    type:String,
    required:true,
   
 },
 city:{
    type:String,
    required:true,
   
 }


})

module.exports = models.User || mongoose.model("User", userSchema)