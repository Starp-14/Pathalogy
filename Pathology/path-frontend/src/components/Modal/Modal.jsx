import React, { useEffect, useState } from "react";
import "./Modal.css"; // Ensure proper styling is applied to the modal
import axios from "axios";
import { useSearchParams } from "react-router-dom"; // Import for getting URL params

const Modal = ({ item, handleClose }) => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Get email from URL
  console.log("Extracted Email from URL:", email);
  const initialInputState = {
    name: item ? item.name : "",
    age: item ? item.age : "",
    address: item ? item.address : "",
    mobile: item ? item.mobile : "",
    examinedBy: item ? item.examinedBy : "",
    examinedDate: item ? item.examinedDate : "",
    selectedTest: item ? item.selectedTest : "",
    reportDate: item ? item.reportDate : "",
    email: email || "", // Automatically set email from URL
  };

  const [input, setInput] = useState(initialInputState);
  const [listOfTest, setListOfTest] = useState([]);

  useEffect(() => {
    handleSelectOption();
  }, []);

  const handleSelectOption = async () => {
    try {
      const res = await axios.get("http://localhost:3000/test/get");
      setListOfTest(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputs = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCreateNew = async () => {
    console.log("Sending Patient Data:", input);

    try {
      if (!item) {
        await axios.post("http://localhost:3000/patient/post", input);
      } else {
        await axios.put(`http://localhost:3000/patient/${item?._id}`, input);
      }
      handleClose();
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  const handleClear = () => {
    setInput(initialInputState);
  };

  return (
    <div className="modal">
      <div className="modal-card">
        <div className="modaltitlebox">
          <div className="modal-title">
            {item ? "Update Patient" : "Create New"}
          </div>
          <div className="x-btn" onClick={handleClose}>
            X
          </div>
        </div>

        {/* Input Fields */}
        <div className="modal-body">
          <div className="inputRow">
            <div className="inputBox">
              <div className="inputLabel">Name</div>
              <input
                type="text"
                className="input-modal"
                placeholder="Enter Name:"
                name="name"
                value={input.name}
                onChange={handleInputs}
              />
            </div>
            <div className="inputBox">
              <div className="inputLabel">Age</div>
              <input
                type="text"
                placeholder="Enter age:"
                className="input-modal"
                name="age"
                value={input.age}
                onChange={handleInputs}
              />
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="inputRow">
            <div className="inputBox">
              <div className="inputLabel">Address</div>
              <input
                type="text"
                className="input-modal"
                placeholder="Enter Address:"
                name="address"
                value={input.address}
                onChange={handleInputs}
              />
            </div>
            <div className="inputBox">
              <div className="inputLabel">Mobile No</div>
              <input
                type="text"
                placeholder="Enter Mobile Number:"
                className="input-modal"
                name="mobile"
                value={input.mobile}
                onChange={handleInputs}
              />
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="inputRow">
            <div className="inputBox">
              <div className="inputLabel">Examined By</div>
              <input
                type="text"
                className="input-modal"
                placeholder="Examined By:"
                name="examinedBy"
                value={input.examinedBy}
                onChange={handleInputs}
              />
            </div>
            <div className="inputBox">
              <div className="inputLabel">Examined Date</div>
              <input
                type="date"
                className="input-modal"
                name="examinedDate"
                value={input.examinedDate}
                onChange={handleInputs}
              />
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="inputRow">
            <div className="inputBox">
              <div className="inputLabel">Selected Test</div>
              <select
                className="input-modal"
                name="selectedTest"
                value={input.selectedTest}
                onChange={handleInputs}
              >
                <option value="">Select a Test</option>
                {listOfTest?.map((testItem) => (
                  <option key={testItem._id} value={testItem._id}>
                    {testItem.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputBox">
              <div className="inputLabel">Report Date</div>
              <input
                type="date"
                className="input-modal"
                name="reportDate"
                value={input.reportDate}
                onChange={handleInputs}
              />
            </div>
          </div>
        </div>

        {/* Display Email (Hidden) */}
        <input type="hidden" name="email" value={input.email} />

        {/* Buttons */}
        <div className="modalBtn">
          <div className="submit" onClick={handleCreateNew}>
            Submit
          </div>
          <div className="submit" onClick={handleClear}>
            Clear
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
