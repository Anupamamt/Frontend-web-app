const mongoose=require('mongoose')

//schema definition
const Schema=mongoose.Schema;

//modelling
const Employee_Details=new Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
})

const Employee=mongoose.model('employee',Employee_Details)

module.exports=Employee