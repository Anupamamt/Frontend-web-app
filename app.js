// Task1: initiate app and run server at 3000

const { urlencoded } = require('express')
const express=require('express')
const app=new express()

const PORT=3000

app.use(express.json())
app.use(urlencoded({extended:true}))


const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://anupamamt:anupama2000@cluster0.nfdclmf.mongodb.net/CompanyDB?retryWrites=true&w=majority')
.then(()=>{
    console.log("MY mongodb is connected succesfully")
})
.catch(error=>{
    console.log('Connection error'+error)
})

const EMPLOYEE_DATA=require('./models/model')
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',(req,res)=>{
    EMPLOYEE_DATA.find({},(err,employ)=>{
      if(err){
        res.send(err)
      }
      res.json(employ)
    })
  })
  
//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',(req,res)=>{
    EMPLOYEE_DATA.findOne({"_id":req.params.id},(err,employ)=>{
      if(err){
        res.send(err)
      }
      res.json(employ)
    })
  })



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async(req,res)=>{
    try{
        let item=req.body;
        const user=new EMPLOYEE_DATA(item)
        const SavedUser=await user.save()
        res.send(SavedUser)
    }
    catch(error){
        console.log("An error occured : "+error)
    }
})


//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',(req,res)=>{
  EMPLOYEE_DATA.remove({"_id":req.params.id},(err,contact)=>{
    if(err){
      res.send("The error is "+err)
    }
    res.json(contact)
  })
})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',(req,res)=>{
  EMPLOYEE_DATA.findOneAndUpdate({"_id":req.body._id},req.body,{new:true,useFindAndModify:false},(err,emp)=>{
    if(err){
      res.send("The error is "+err)
    }
    res.json(emp)
  })
})


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
app.listen(PORT,()=>{
    console.log("The app is listening to port 3000");
})


