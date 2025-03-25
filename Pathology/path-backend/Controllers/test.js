const test = require('../Models/testModel')


exports.postTest = async(req,res)=>{
  try{
    const body = req.body;
    const isDataExist = await test.findOne({name:body.name})
    if(isDataExist){
      res.status(202).json({
        "status":"fail",
        "message":"Data already exist"
      })
    }else{
      const dataEnter = await test.create(body);
      res.status(200).json({
        status:"success",
        "message":"Added successfully",
        data:dataEnter
      })
    }
    
  }catch(err){
    res.status(404).json({
      error:err,
      status:"fail",
      "message":"technical issue"
    })
  }

  
}

exports.getTest = async(req,res)=>{
  try {
    const testData = await test.find({})
    if(testData){
      res.status(200).json({
        "status":"success",
        "message":" test availabe",
        data:testData
      })
    }else{
      res.status(202).json({
        "status":"fail",
        "message":"no test availabe",
        
      })
    }
    
  } catch (err) {
    res.status(404).json({
      error:err,
      status:"fail",
      "message":"technical issue"
    })
  }
}

exports.getTestById = async(req,res)=>{
  const {id} = req.params
  console.log(id)
  
  try {
    const testData = await test.findById(id)
    if(testData){
      res.status(200).json({
        "status":"success",
        "message":" test availabe",
        data:testData
      })
    }else{
      res.status(202).json({
        "status":"fail",
        "message":"no test availabe",
        
      })
    }
    
  } catch (err) {
    res.status(404).json({
      error:err,
      status:"fail",
      "message":"technical issue"
    })
  }
}