import React, { useState, useEffect } from "react";
import imgLogo from "../../assets/lab.png";
import "./prescription.css";
import html2Canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests
// import { response } from "express";

const Prescription = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [patient, setPatientData] = useState(null);
  useEffect(() => {
    handleOnPageLoading(); // Fetch patient data on page load
  }, []);
  // Fetch data from the server and update state
  const handleOnPageLoading = async () => {
    await axios
      .get(`http://localhost:3000/patient/get/${id}`)
      .then((response) => {
        const data = response.data.data;
        setPatientData(data);
      })
      .catch((err) => {
        console.log(err); // Log error if the request fails
      });
  };

  console.log(patient);

  const downLoadPDF = () => {
    const input = document.getElementById("pdfDownload");

    html2Canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const impwidth = 210;

      const ingHeight = (canvas.height * impwidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, impwidth, ingHeight);
      // pdf.save(`${details?.name}.pdf`);
      pdf.save(`${patient?.name}.pdf`);
    });
    // navigate("/");
  };

  return (
    <div className="prescription">
      <div className="presdownload" id="pdfDownload">
        <div className="header-logos">
          <img src={imgLogo} className="presc-logo" />
          <div className="pathologyDesc">
            <div className="namePathology">Pathology Lab</div>
            <div className="addressDetails">Near Infosys, Vihar Phase 2</div>
          </div>
          <div className="mobNo">+91-7228796580</div>
        </div>

        <div className="patient-info">
          <div className="patient-info-row">
            <div className="info-detail">
              <div className="patient-name-attr">Name :</div>
              <div className="patient-name-value">{patient?.name}</div>
            </div>
            <div className="info-detail-age">
              <div className="patient-name-attr">Age:</div>
              <div className="patient-name-value">{patient?.age}</div>
            </div>

            <div className="info-detail">
              <div className="patient-name-attr">Address:</div>
              <div className="patient-name-value">{patient?.address}</div>
            </div>
          </div>
          {/* checked1 */}

          <div className="patient-info-row">
            <div className="info-detail">
              <div className="patient-name-attr">Examined By:</div>
              <div className="patient-name-value">{patient?.examinedBy}</div>
            </div>

            <div className="info-detail-age">
              <div className="patient-name-attr">Email: </div>
              <div className="patient-name-value">{patient?.email}</div>
            </div>

            <div className="info-detail">
              <div className="patient-name-attr">Examined Date:</div>
              <div className="patient-name-value">{patient?.examinedDate}</div>
            </div>
          </div>
        </div>

        <div className="result-section">
          <div className="particular-test">
            <table className="table">
              <thead className="thead">
                <tr>
                  <th></th>
                  <th>Normal Range</th>
                  <th>Unit</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {patient?.result?.map((item, id) => {
                  return (
                    <tr className="finalPresTableRow">
                      <td>{item.name}</td>
                      <td>{item.range}</td>
                      <td>{item.unit}</td>
                      <td>{item.result}</td>
                    </tr>
                  );
                })}
                {/* <tr className="finalPresTableRow">
                  <td>{tests?.nae}</td>
                  <td>{"89-100"}</td>
                  <td>{"Ml"}</td>
                  <td>{"95"}</td>
                </tr> */}
              </tbody>
            </table>

            <div className="footer-prescription">
              <div className="examinedBy">
                <div className="signature">
                  <div>Examined By:</div>
                  <div>{patient?.examinedBy}</div>
                </div>
                <div className="signature">
                  <div>Report Date:</div>
                  <div>{patient?.reportDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pdf-down-btn" onClick={downLoadPDF}>
          Download report
        </div>
      </div>
    </div>
  );
};

export default Prescription;
