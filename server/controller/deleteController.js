const todoModel=require('../model/todoModel');

const deleteData=async (req,res)=>{
    const data=await todoModel.deleteOne({_id:req.body.id});
    if(data.acknowledged){
        res.status(200).json({message:"Successfully deleted "})
    }
}

module.exports=deleteData;