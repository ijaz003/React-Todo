const todoModel=require('../model/todoModel')

const readData=async(req,res)=>{
    const data=await todoModel.find({})
    res.send(data)
}

module.exports=readData;