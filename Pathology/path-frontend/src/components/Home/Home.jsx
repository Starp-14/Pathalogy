import React, { useEffect, useState } from "react";
import "./Home.css";
import labPic from "../../assets/lab.png";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";
import axios from "axios";

const Home = () => {
  const [listOfTest, setListOfTest] = useState([]);
  const [activeIndex, setActive] = useState(0);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [clickAddtest, setclickAddtest] = useState(false);
  useEffect(() => {
    fetchdataOnLoading();

    // setselectedIndex(listOfTest[0]);

    // console.log(selectedIndex);
  }, []);

  const fetchdataOnLoading = async () => {
    axios
      .get("http://localhost:3000/test/get")
      .then((response) => {
        const data = response.data.data;
        setListOfTest(data);
        setselectedIndex(data[0]);
        // console.log(response.data); // response.data contains the actual response
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const handleClickLink = (index) => {
    setActive(index);
    setselectedIndex(listOfTest[index]);
  };

  const handleClosebtn = () => {
    setclickAddtest(false);
  };

  return (
    <div className="home">
      <div className="introHome">
        <div className="homeLogo">
          <div className="imgdiv">
            <img className="lablogo" src={labPic} alt="labPic" />
          </div>
          <div className="introPart">
            <div className="titleminor">Enterprise Limited</div>
            <div className="title">Pathology Management</div>
            <div className="descrip">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              itaque in atque eos voluptatem ad ipsa, minima quae libero
              aspernatur?Lorem ipsum dolor sit amet consectetur adipisicing
              elit.
            </div>
            <div className="buttons">
              <div className="btn" onClick={() => setclickAddtest(true)}>
                Create
              </div>
              <div className="btn">
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href="#contact"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="testHome">
        <div className="testleft">
          <div className="totaltest">{listOfTest.length} Tests available</div>
          <div className="testname">
            {listOfTest?.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClickLink(index)}
                className={`testnametitle ${
                  activeIndex === index ? "activeLink" : ""
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className="testright">
          {selectedIndex ? (
            <>
              <div className="topright">{selectedIndex.name}</div>
              <div className="bottomright">
                <div className="righttopbottom">
                  {selectedIndex.description}
                </div>
                <div className="rightbottombottom">
                  <div className="btmleft">
                    {/* {selectedIndex.requirements.map((item, index) => (
                      <div key={index} className="btmleftdetail">
                        {item.key} :{" "}
                        <span className="spancol">{item.value}</span>
                      </div>
                    ))} */}
                    <div className="btmleftdetail">
                      {"Fasting"}:
                      <span className="spancol">{selectedIndex?.fasting}</span>
                    </div>
                    <div className="btmleftdetail">
                      {"Normal range"}:
                      <span className="spancol">
                        {selectedIndex?.normalRange}
                      </span>
                    </div>
                    <div className="btmleftdetail">
                      {"Abnormal range"}:
                      <span className="spancol">
                        {selectedIndex?.abnormalRange}
                      </span>
                    </div>
                    <div className="btmleftdetail">
                      {"Price"}:
                      <span className="spancol">{selectedIndex?.price}</span>
                    </div>
                  </div>
                  <div className="btmright">
                    <img
                      src={selectedIndex.imgLink}
                      className="tube"
                      alt="Test"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="topright">Select a test to view details.</div>
          )}
        </div>
      </div>
      <div className="contactHome">
        <div className="contactFormtitle" id="contact">
          Contact Us
        </div>
        <div className="contactForm">
          <div className="inputFields">
            <input
              type="email"
              className="inputbox"
              placeholder="Enter email:"
            />
            <input type="text" className="inputbox" placeholder="Enter name:" />
            <input
              type="number"
              className="inputbox"
              placeholder="Enter Number:"
            />
            <textarea
              type="textbox"
              placeholder="Type your msg here..."
              className="textArea"
              rows={5}
            ></textarea>
          </div>
          <div className="sendbtn">Send</div>
        </div>
      </div>
      <Footer></Footer>
      {clickAddtest && <Modal handleClose={handleClosebtn} />}
    </div>
  );
};

export default Home;
