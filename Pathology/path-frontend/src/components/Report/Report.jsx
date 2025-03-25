import React, { useEffect, useState } from "react";
import "./report.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Report = () => {
  const { id } = useParams();
  const [patientDetails, setpatientDetails] = useState(null);
  const [testData, settestData] = useState(null);
  const [inputField, setInputField] = useState([
    { id: 0, name: "", range: "", unit: "", result: "" },
  ]);
  console.log(id);
  useEffect(() => {
    fetchdataOnLoading();
  }, []);
  console.log(patientDetails, testData);

  const handleFinalSubmit = async () => {
    await axios
      .put(`http://localhost:3000/patient/${patientDetails?._id}`, {
        ...patientDetails,
        result: inputField,
        status: "Completed",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error("Error:", err); // Check what error is printed
        alert("Something went wrong.");
      });
  };

  const fetchdataOnLoading = async () => {
    console.log("Fetching data for ID:", id); // Debugging log

    await axios
      .get(`http://localhost:3000/patient/${id}/testDetails`) // Removed `input`
      .then((res) => {
        console.log("Response:", res);
        const putData = res.data.patient;
        const testData = res.data.test;
        setpatientDetails(putData);
        settestData(testData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const onChangeInput = (e, index) => {
    const updatedRows = inputField.map((row, i) => {
      if (i === index) {
        return { ...row, [e.target.name]: e.target.value };
      }
      return row;
    });
    setInputField(updatedRows);
  };

  const addRow = () => {
    const newRow = {
      id: inputField.length + 1,
      name: "",
      range: "",
      unit: "",
      result: "",
    };
    setInputField([...inputField, newRow]);
  };

  const removeRow = () => {
    if (inputField.length > 1) {
      setInputField(inputField.slice(0, -1));
    }
  };

  // console.log(inputField);

  return (
    <div className="report-page">
      <div className="reportDiv">
        {/* Report Information Section */}
        <div className="report-infos">
          <div className="report-info">Name: {patientDetails?.name}</div>
          <div className="report-info">
            Examined By: {patientDetails?.examinedBy}
          </div>
        </div>

        {/* Test Details Section */}
        <div className="report-inputBlock">
          <div className="report-tests">
            <div className="name-of-test">{testData?.name}</div>
          </div>

          {/* Input Rows for Test Details */}
          <div className="inputRows">
            {inputField.map((item, index) => (
              <div className="inputRow" key={item.id}>
                <div className="input-row-group">
                  <div className="input-test-name">Test name</div>
                  <input
                    type="text"
                    value={item.name}
                    name="name"
                    onChange={(e) => onChangeInput(e, index)}
                    className="input-field-tests"
                  />
                </div>
                <div className="input-row-group">
                  <div className="input-test-name">Normal Range</div>
                  <input
                    type="text"
                    name="range"
                    value={item.range}
                    onChange={(e) => onChangeInput(e, index)}
                    className="input-field-tests"
                  />
                </div>
                <div className="input-row-group">
                  <div className="input-test-name">Unit</div>
                  <input
                    type="text"
                    name="unit"
                    value={item.unit}
                    onChange={(e) => onChangeInput(e, index)}
                    className="input-field-tests"
                  />
                </div>
                <div className="input-row-group">
                  <div className="input-test-name">Result</div>
                  <input
                    type="text"
                    name="result"
                    value={item.result}
                    onChange={(e) => onChangeInput(e, index)}
                    className="input-field-tests"
                  />
                </div>
              </div>
            ))}

            {/* Buttons */}
            {/* <div className="btn-grp-add-rem">
              <button className="add-btn-row" onClick={addRow}>
                Add
              </button>
              {inputField.length > 1 ? (
                <button
                  className="add-btn-row"
                  onClick={() => removeRow(inputField.length - 1)}
                  disabled={inputField.length === 1}
                >
                  Remove
                </button>
              ) : null} */}
            <Link
              to={`/prescription/${id}`}
              className="add-btn-row"
              onClick={handleFinalSubmit}
            >
              Report
            </Link>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Report;
