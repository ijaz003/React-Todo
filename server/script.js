const express=require("express");
const app=express();
const port=5000;
const cors=require('cors');
require("./mongo")
const router=require('./route/todoRoute')

app.use(cors())
app.use(express.json())
app.use('/',router);

app.listen(port,()=>{
    console.log(`Listening port ${port}`)
})


app.post('/data',)