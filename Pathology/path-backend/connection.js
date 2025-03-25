const mongooose = require('mongoose')

mongooose.connect('mongodb://localhost:27017/pathalogy-backend').then(()=>{
  console.log("mongoose connected successfully");
  
}).catch(err=>{
  console.log("something went wrong");
  
})