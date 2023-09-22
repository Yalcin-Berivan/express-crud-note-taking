const mongoose=require("mongoose");
const Note=new mongoose.Schema({
    category:String,
    title:String,
    body:String
});

const NoteModel=mongoose.model('Note',Note);
module.exports=NoteModel;