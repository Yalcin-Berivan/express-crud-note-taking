const express = require('express');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const NoteModel=require('./notes.schema');
const mongoose=require('mongoose');
main().catch(err=> console.log(err));

 async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/my-db');

//NOTLARI GETİR
 app.get('/notes',async (req,res)=>{
    const notes=await NoteModel.find();
    res.send(notes);
 });
// // iD'Sİ VERİLEN NOTU ÇEKME
app.get('/notes/:id',async(req,res)=>{
    const id=req.params.id;
    const notes=await NoteModel.findById(id);
    res.send(notes);
});
// NOT OLUŞTURMA 
app.post('/notes',async(req,res)=>{
    const body=req.body;
    await NoteModel.create(body);
    res.send(body);
});


//NOT SİLME
app.delete('/notes/:id',async(req,res)=>{
    const id=req.params.id;
    await NoteModel.deleteOne({_id:id})
    res.send('kayıt silindi')
});

//NOT GÜNCELLEME
app.put('/notes/:id',async(req,res)=>{
    const id=req.params.id;
    const body=req.body;
    await NoteModel.findOneAndUpdate({_id:id},body)
    res.send(body);
});
const port=3000;
app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda başlatıldı`);
});


}

