const port=3030;

const express = require('express');
const path = require("path");
// สร้างแอป Express  
const app = express();

// const { connect } = require('http2');

const htmlFolderPath = path.join(__dirname, "/HTML");
const staticFolderPath = path.join(__dirname, "/CSS");
app.use(express.static(staticFolderPath));

app.get('/todolist', (req,res)=>{
    console.log(req.url)
    console.log('test todolist');
    res.sendFile(path.join(htmlFolderPath, "todolist.html"));
})

app.get('/AddPD', (req,res)=>{
    console.log('test addPd');
    res.sendFile(path.join(htmlFolderPath, "AddPD.html"));
})

app.get('/EditProduct', (req,res)=>{
    console.log('test editPd');
    res.sendFile(path.join(htmlFolderPath, "EditProduct.html"));
})  

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
})