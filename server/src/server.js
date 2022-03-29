
const express =require ('express');
const cors = require('cors');

const data=require('./data/data')

const app= express();
app.use(cors());

app.get('/orderhistory',(req,res)=>{
    res.send(data.Products);
});

app.listen(8002);
