const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path =require('path');
const items=require('./routes/API/Items');

const app=express();

//bodyparser

app.use(bodyParser.json());

//db config

const db=require('./config/keys').mongoURI;

//connect to mongo

mongoose.connect(db,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})
.then(()=>{
    console.log('db connected');
})
.catch(err=>console.log('db connection failed'));

//use routes

app.use('/api/items',items);

//server static assests if in production

if(process.env.NODE_ENV==='production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build', 'index.html'));
    })
}

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("currently listening on port 5000"));