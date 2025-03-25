import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import Navlogo from "../../assets/logo.png"; // Import the logo file
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [clickAddtest, setclickAddtest] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    imgLink: "",
    fasting: "",
    normalRange: "",
    abnormalRange: "",
  });

  const ref = useRef();

  // Fetch user data from localStorage to check if the user is admin
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clickAddtest && ref.current && !ref.current.contains(event.target)) {
        setclickAddtest(false); // Corrected function name
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickAddtest]);

  const handleInputs = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onClickCreate = async () => {
    console.log(input);
    await axios
      .post("http://localhost:3000/test/post", input)
      .then((res) => {
        window.location.reload();
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    setOpenCreate(true);
  };

  const handleClose = () => {
    setOpenCreate(false);
  };

  return (
    <div className="nav">
      <div className="leftside">
        <img src={Navlogo} className="Navlogo" alt="Logo" />
        <Link to="/" className="navLinks">
          Home
        </Link>
      </div>

      <div className="rightside">
        {/* Conditionally render options based on isAdmin */}
        {user && user.isAdmin && (
          <>
            <div className="navLinks" onClick={handleClick}>
              Create New
            </div>
            <Link to={"/status"} className="navLinks">
              Report
            </Link>
            <div className="navLinks">
              <div
                className="navAddtest"
                onClick={() => {
                  setclickAddtest(true);
                }}
              >
                Add test
              </div>

              {clickAddtest && (
                <div className="addTest-modal" ref={ref}>
                  <div className="input-test-modal">
                    <div className="testLabel">Name</div>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => {
                        handleInputs(e);
                      }}
                      value={input.name}
                    />
                  </div>

                  <div className="input-test-modal">
                    <div className="testLabel">Description</div>
                    <input
                      type="text"
                      name="description"
                      onChange={(e) => {
                        handleInputs(e);
                      }}
                      value={input.description}
                    />
                  </div>

                  <div className="input-test-modal">
                    <div className="testLabel">Price</div>
                    <input
                      type="text"
                      name="price"
                      onChange={(e) => {
                        handleInputs(e);
                      }}
                      value={input.price}
                    />
                  </div>

                  <div className="input-test-modal">
                    <div className="testLabel">Image Link</div>
                    <input
                      type="text"
                      name="imgLink"
                      onChange={(e) => {
                        handleInputs(e);
                      }}
                      value={input.imgLink}
                    />
                  </div>

                  <div className="input-test-modal">
                    <div className="testLabel">Fasting</div>
                    <input
                      type="text"
                      name="fasting"
                      onChange={(e) => {
                        handleInputs(e);
                      }}
                      value={input.fasting}
                    />
                  </div>

                  <div className="input-test-modal">
                    <div className="testLabel">Normal range</div>
                    <input
                      type="text"
                      name="normalRange"
                      onChange={(e) => {
                        handleInputs(e);
                      }}
                      value={input.normalRange}
                    />
                  </div>

                  <div className="input-test-modal">
                    <div className="testLabel">Abnormal</div>
                    <input
                      type="text"
                      name="abnormalRange"
                      onChange={(e) => {
                        handleInputs(e);
                      }}
                      value={input.abnormalRange}
                    />
                  </div>

                  <div className="create-test" onClick={onClickCreate}>
                    Create
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {openCreate && <Modal handleClose={handleClose} />}
    </div>
  );
};

export default Navbar;
