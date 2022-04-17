const mongoose=require('mongoose');
const UserData=new mongoose.Schema({
   Firstname:{
       type:String,
       required:true
   },
   Lastname:{
       type:String,
       required:true
   },
   Age:{
       type:Number,
       required:true
   }

})

const Users=mongoose.model("User-data",UserData);
module.exports=Users;