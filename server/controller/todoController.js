const todoModle=require('../model/todoModel')
const todoController=async (req,res)=>{
    try{
        const newTodo=new todoModle({
            text:req.body.data
        })
        const savedTodo=await newTodo.save()
        res.status(200).json({message:"Data Added Sucessfully"})
        console.log(savedTodo)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports=todoController;