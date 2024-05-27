const express=require('express');
const router=express.Router();
const todoController=require('../controller/todoController');
const todoRead=require('../controller/readController');
const todoUpdate=require('../controller/updateController');
const todoDelete=require('../controller/deleteController');

router.route('/data').post(todoController);
router.route('/read').get(todoRead);
router.route('/update').put(todoUpdate);
router.route('/delete').delete(todoDelete);


module.exports=router