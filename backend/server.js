require('dotenv').config()
const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');

const fileUpload = require('express-fileupload');
const PORT = process.env.PORT||9000

app.use(fileUpload());

app.use(express.json());    
app.use(express.urlencoded({extended:false}));
app.use(cors())

//serving static files
app.use(express.static(path.join(__dirname,'public')));

//connect mongodb database
require('./server/database/database')();

//calling routes
app.use('/',require('./server/router/router'));

app.listen(PORT,()=>{
    console.log("Server started at http://localhost:9000");
})