const Mongoose=require('mongoose');

const Schema=new Mongoose.Schema({
    text:String
})

module.exports=Mongoose.model('/todo',Schema)