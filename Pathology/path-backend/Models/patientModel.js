const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  name:{
    required: true,
    type:String
  },
  status:{
    default:"Pending",
    type:String
  },
  age:{
    required: true,
    type:String
  },
  mobile:{
    required: true,
    type:String
  },
  address:{
    required: true,
    type:String
  },
  examinedBy:{
    required: true,
    type:String
  },
  examinedDate:{
    required: true,
    type:String
  },
  selectedTest:{
    required: true,
    type:mongoose.Schema.Types.ObjectId,
  },
  reportDate:{
    required: true,
    type:String
  },
  email:{
    required: true,
    type:String,
  },

  result:[{
    name:{
      required:true,
      type:String
    },
    range:{
      required:true,
      type:String
    },
    unit:{
      required:true,
      type:String
    },
    result:{
      required:true,
      type:String
    },
  }]
},
{
  timestamps:{
    createdAt:true,
    updatedAt:true
  }

})

const report = mongoose.model('patient',Schema)
module.exports = report;