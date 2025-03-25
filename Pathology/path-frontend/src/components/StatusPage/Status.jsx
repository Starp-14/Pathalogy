import React, { useEffect, useState } from "react";
import "./Status.css";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import noDataImg from "../../assets/nodata.png";

const Status = () => {
  const [activeBar, setActiveBar] = useState("Pending");
  const [data, setData] = useState([]);
  const [clickedUpdate, setclickedUpdate] = useState(false);
  const [clickedPatient, setclickedPatient] = useState(null);

  const updateIcon = (item) => {
    setclickedUpdate(true);
    setclickedPatient(item);
  };

  const deletePatient = async (id) => {
    await axios
      .delete(`http://localhost:3000/patient/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPatient();
  }, [activeBar]);

  const fetchPatient = async () => {
    await axios
      .get(`http://localhost:3000/patient/getstatus/${activeBar}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="statusPage">
      <div className="statusPageMain">
        <div className="statusBar">
          <div
            className={`status ${
              activeBar === "Pending" ? "activeBarStatus" : ""
            }`}
            onClick={() => setActiveBar("Pending")}
          >
            Pending
          </div>
          <div
            className={`status ${
              activeBar === "Completed" ? "activeBarStatus" : ""
            }`}
            onClick={() => setActiveBar("Completed")}
          >
            Completed
          </div>
        </div>
        <div className="statusList">
          {data.map((item) => (
            <div className="rowList" key={item.id}>
              <div className="statusName">{item?.name}</div>
              <div className="statusDoctor">
                <div className="drName">{item.examinedBy}</div>
                <div className="statusDate">
                  Examined Date:
                  {item.examinedDate} Report Date:
                  {item.reportDate}
                </div>
              </div>
              <div className="statusbtn">
                {activeBar == "Pending" ? (
                  <div
                    className="icons"
                    style={{ backgroundColor: "rgb(212, 224, 39)" }}
                    onClick={() => {
                      updateIcon(item);
                    }}
                  >
                    <UpdateIcon />
                  </div>
                ) : null}
                {activeBar == "Pending" ? (
                  <div
                    className="icons"
                    style={{ backgroundColor: "rgb(228, 45, 61)" }}
                    onClick={() => deletePatient(item._id)}
                  >
                    <DeleteIcon />
                  </div>
                ) : null}

                <Link
                  to={
                    activeBar === "Completed"
                      ? `/prescription/${item._id}`
                      : `/report/${item._id}`
                  }
                  className="icons"
                  style={{ backgroundColor: "rgb(85, 238, 34)" }}
                >
                  <AssignmentIcon />
                </Link>
              </div>
            </div>
          ))}
          {data.length == 0 && (
            <div>
              <img src={noDataImg} width={200} alt="" />
            </div>
          )}
        </div>
      </div>
      {clickedUpdate && (
        <Modal
          item={clickedPatient}
          handleClose={() => setclickedUpdate(false)}
        />
      )}
    </div>
  );
};

export default Status;
