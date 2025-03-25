const Patient = require('../Models/patientModel')
const test = require('../Models/testModel')
exports.postPatient = async (req, res) => {
  try {
    const { name, age, address, mobile, examinedBy, examinedDate, selectedTest, reportDate, email } = req.body;

    // Validation: Check for missing fields
    if (!name || !age || !address || !mobile || !examinedBy || !examinedDate || !selectedTest || !reportDate || !email) {
      return res.status(400).json({
        status: "fail",
        message: "All fields, including email, are required.",
      });
    }

    // Ensure email is included when creating a patient
    const newUser = await Patient.create({ 
      name, age, address, mobile, examinedBy, examinedDate, selectedTest, reportDate, email 
    });

    res.status(201).json({
      data: newUser,
      message: "Patient added successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: "fail",
      message: "Server error, please try again later.",
    });
  }
};


exports.getPatientById = async (req,res) =>{
  try {
    const {id} = req.params;
    const isUser = await Patient.findById(id)
    if(isUser){
      res.status(200).json({
        data:isUser,
        "message":"Patient get successfully"
      })
    }else{
      res.status.json({
      "message":"no such Patient "
      })
    }
    
    
  } catch (err) {
    res.status(202).json({
      error:err,
      status:"fail",
      "message":"Some technical issue",
    })
  }
}


exports.getPatientByStatus = async (req,res) =>{
  try {
    const {statusFind} = req.params;
    console.log(statusFind);
    
    const isData = await Patient.find({status:statusFind})
   
      res.status(200).json({
        data:isData,
        "message":"Patient get successfully"
      })
    
    
    
  } catch (err) {
    res.status(202).json({
      error:err,
      status:"fail",
      "message":"Some technical issue",
    })
  }
}

exports.updatePatient = async (req,res) =>{
  try {
      const body = req.body;
      const {id} = req.params;

      const updatePatient = await Patient.updateOne({_id:id},body)
      if(updatePatient){
      res.status(200).json({
        data:updatePatient,
        "message":"Patient updated successfully"
      })
    }
    
    
    
  } catch (err) {
    res.status(202).json({
      error:err,
      status:"fail",
      "message":"Some technical issue",
    })
  }
}

exports.getPatientTestDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const isPatientData = await Patient.findById(id);
    // console.log("Patient Data:", isPatientData); // Debugging statement

    if(isPatientData){
        const testDetail = await test.findById(isPatientData.selectedTest);
        console.log(testDetail);
        res.status(200).json({
          "message":"got data succesfully",
          patient : isPatientData,
          test : testDetail
          })
    }else{
      res.status.json({
        "message":"no such Patient try again "
        })
    }
  } catch (err) {
    res.status(202).json({
      error:err,
      status:"fail",
      "message":"Some technical issue",
    })
  }


}

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Patient.deleteOne({_id:id});
    // console.log("Patient Data:", isPatientData); // Debugging statement

    if(deletedUser.deletedCount>0){
      res.status(200).json({
        "message":"patient deleted succesfully",
        deletedUser : deletedUser
        })
    }else{
      res.status.json({
        "message":"no  Patients "
        })
    }
  } catch (err) {
    res.status(202).json({
      error:err,
      status:"fail",
      "message":"Some technical issue",
    })
  }


}


