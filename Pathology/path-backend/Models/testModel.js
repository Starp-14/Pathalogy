const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  name:{
    required: true,
    type:String
  },
  description:{
    required: true,
    type:String
  },
  price:{
    required: true,
    type:String
  },
  fasting:{
    required: true,
    type:String
  },
  imgLink:{
    type:String,
    default:"https://www.google.com/imgres?q=question%20mark%20img&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F2%2F25%2FIcon-round-Question_mark.jpg%2F2048px-Icon-round-Question_mark.jpg&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AIcon-round-Question_mark.jpg&docid=imHzbRKyjYbnOM&tbnid=pppTUjtAYiutoM&vet=12ahUKEwiwscCMhKWLAxV7RmwGHdH4MxgQM3oECE4QAA..i&w=2048&h=2048&hcb=2&itg=1&ved=2ahUKEwiwscCMhKWLAxV7RmwGHdH4MxgQM3oECE4QAA"
  },
  normalRange:{
    required: true,
    type:String
  },
  abnormalRange:{
    required: true,
    type:String
  }
},{
  timestamps:{
    createdAt:true,
    updatedAt:true
  }

})

const report = mongoose.model('test',Schema)
module.exports = report;