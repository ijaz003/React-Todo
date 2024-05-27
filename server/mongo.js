const Mongoose=require("mongoose");

Mongoose.connect("mongodb://localhost:27017/todoList").then(()=>{
    console.log("Database is connected !")
}).catch((err)=>{
    console.log("There is something error ",err)
})