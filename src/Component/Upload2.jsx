import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  Stack,
  Toast,
} from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import { Box } from "@mui/material";
import LoginForm from "../images/Login_3.jpg";
import TextField from "@mui/material/TextField";
import ProgressBar from "react-bootstrap/ProgressBar";

function Upload2() {
  const [toogle, setToogle] = useState(true);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState(false);

  //const [showButton,setShowButton ]=(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [valid] = useState({
    vemail: "Ajay",
    vpass: "123456",
  });

  const { email, password } = data;
  function handleChange(e) {
    setData({ ...data, [e.target.name]: [e.target.value] });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (valid.vemail !== data.email[0]) {
      setError(true);
    } else {
      setError(false);
      if (valid.vpass !== data.password[0]) {
        setErrors(true);
      } else {
        setErrors(false);
        setToogle(false);
      }
    }
  };

  const [isSelected, setIsSelected] = useState(true);
  const [imageSelected, setImageSelected] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [butto, setButto] = useState(false);
  const [showError, setShowError] = useState("");
  const [fileRes, setFileRes] = useState("");
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dummy, setDummy] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showToastSucc, setShowToastSucc] = useState(false);
  const [images1, setImages1] = useState([]);

  const onChange1 = (e) => {
    for (let k = 0; k < e.target.files.length; k++) {
      var obj = {};
      obj["url"] = URL.createObjectURL(e.target.files[k]);
      obj["name"] = e.target.files[k].name;
      preview.push(obj);
    }
    console.log("addmore images url", preview);
    const dump = [];
    for (let i = 0; i < e.target.files.length; i++) {
      dump.push(e.target.files[i]);
    }

    console.log("dumping", dump);

    if (e.target.files.length > 0) {
      console.log("entered into loop");
      setImages1(e.target.files);
      setImageSelected([...imageSelected, ...dump]);
    }
    console.log("first", images1);
    setImageSelected([...imageSelected, ...dump]);
    console.log("next", imageSelected);
    console.log("final array size", imageSelected.length);
  };

  const onChange = (h) => {
    h.preventDefault();
    setImageSelected(h.target.files);
    const images = [];
    for (let i = 0; i < h.target.files.length; i++) {
      var obj = {};
      obj["url"] = URL.createObjectURL(h.target.files[i]);
      obj["name"] = h.target.files[i].name;
      images.push(obj);
      setPreview(images);
    }
    setPreview(images);
    console.log("images data", images);
    console.log("input fields ", imageSelected);
    //console.log("preview data",preview)
    setButto(true);

    console.log("previewData", preview);
    const imagions = [];

    //Deleting unwanted pics by comparing preview and selectedImage arrays
    for (let l = 0; l < imageSelected.length; l++) {
      for (let j = 0; j < preview.length; j++) {
        if (imageSelected[l].name === preview[j].name) {
          imagions.push(imageSelected[l]);
        }
      }
    }
    console.log("imagions", imagions);
  };

  const modalUp = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const uploadImage = (e) => {
    e.preventDefault();
    setLoading(true);

    //setImageSelected(imagions);
    console.log("imagions data1-=-", imageSelected.length);
    const formData = new FormData();
    let store = new Date();
    if (dummy) {
      const { $d } = startDate;
      store = $d;
    }

    let month = String(store.getMonth() + 1).padStart(2, "0");
    let day = String(store.getDate()).padStart(2, "0");
    let year = store.getFullYear();
    let output = year + "-" + month + "-" + day;
    console.log(output);

    formData.append("Date", output);

    Array.from(imageSelected).forEach((item) => {
      formData.append("Image", item);
    });
    const url = "https://actions-to-drive.herokuapp.com/upload";
    axios
      .post(url, formData)
      .then((result) => {
        setFileRes(result.data);
        setIsUploaded(true);

        setLoading(false);
        setShowToastSucc(true);
      })
      .catch((err) => {
        if (err.result) {
          setLoading(false);
          console.log(err.result);
        } else if (err.request) {
          setShowError(err.request);
          console.log(err.request);
          setLoading(false);
        }
      });

    setIsSelected(false);
  };

  return (

    <>
    <style>
      {
        `
        body{
          background-color:#f1f1f1;
        }
        `
      }
    </style>
      {toogle && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
            backgroundImage: `url(${LoginForm})`,
            
          }}
        >
          <div>
            <form onSubmit={submitHandler} style={{ width: "400px" }}>
              <Box
                display="flex"
                flexDirection={"column"}
                maxWidth={400}
                alignItems="center"
                justifyContent="center"
                margin="auto"
                padding={3}
                borderRadius={5}
                backgroundColor={"#ccc"}
                sx={{
                  ":hover": {
                    boxShadow: "5px  5px 20px #ccc",
                  },
                }}
              >
                <h2 style={{ padding: 20, fontFamily: "arial" }}>Login</h2>
                <div className="form-group">
                  <Row>
                    <label
                      style={{
                        fontSize: "large",
                        fontFamily: "arial",
                        fontWeight: "bold",
                        padding: "5px",
                      }}
                    >
                      Username
                    </label>
                  </Row>
                  <Row style={{ marginBottom: "5px" }}>
                    <input
                      type="text"
                      value={email}
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </Row>
                  {error && (
                    <p
                      style={{
                        color: "red",
                        fontFamily: "arial",
                        textAlign: "left",
                        padding: "5px",
                      }}
                    >
                      Enter valid Username
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <Row>
                    <label
                      style={{
                        fontSize: "large",
                        fontFamily: "Arial",
                        textAlign: "left",
                        fontWeight: "bold",
                        padding: "5px",
                      }}
                    >
                      Password
                    </label>
                  </Row>

                  <Row style={{ marginBottom: "5px" }}>
                    <input
                      type="password"
                      value={password}
                      name="password"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </Row>
                  {errors && (
                    <p
                      style={{
                        color: "red",
                        fontFamily: "Arial",
                        textAlign: "left",
                        padding: "5px",
                      }}
                    >
                      Enter valid Password
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  onSubmit={submitHandler}
                  style={{
                    margin: 20,
                    fontFamily: "Arial",
                    textAlign: "center",
                    width: "150px",
                    fontSize: "20px",
                  }}
                >
                  Login
                </Button>
              </Box>
            </form>
          </div>
        </div>
      )}

      {/* loadingSpinner   */}

      {loading && !toogle && (
        <div
          style={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h3 style={{ fontFamily: "arial" }}>Uploading files</h3>
          <ProgressBar style={{ width: "300px" }} animated="true" now={98} />
        </div>
      )}

      {/* uploadFile Starts */}

      {!toogle && (
        <>
          <style>
            {`
              .hover:hover{
                cursor:pointer;
              },
              `}
          </style>
          <Header />
          <div
            className="container"
            style={{
              position: "absolute",
              display: "flex",
              left: "50%",
              justifyContent: "center",
              fontFamily: "Arial",
              transform: "translate(-50%,20%)",backgroundColor:"#f1f1f1"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                borderRadius: "7px",
                fontFamily: "arial",
                fontWeight: "bold",
               
              }}
            >
              {isSelected && (
                <>
                  <Container>
                    <form style={{ margin: "0px" }}>
                      <h2
                        style={{
                          textAlign: "left",
                          color: "#1e3796",
                          fontFamily: "arial",
                          fontWeight: "bold",
                          marginBottom:"15px"
                        }}
                      >
                        Upload Pictures
                      </h2>
                      <div
                        style={{
                          padding: "12px",
                          margin: "0px",
                          backgroundColor: "#fff",
                          width: "auto",
                          height: "auto",
                          boxShadow: "0px 0px 7px -1px #000000",
                          borderRadius:"10px"
                        }}
                      >
                        <Row lg={12} style={{marginTop:"35px"}}>
                          <Col lg={12}>
                          <Stack
                              style={{
                                marginBottom: "-10px",
                                
                              }}
                            >
                              <label
                                htmlFor="dates"
                                style={{
                                  color: "#1e3796",
                                  fontFamily: "Arial",
                                  alignItems: "center",
                                  fontSize: "20px",
                                }}
                              >
                                <p
                                  style={{
                                    fontStyle: "arial",
                                    textAlign:"center",
                                    paddingRight:"0px",
                                    fontSize:"22px"
                                  }}
                                >
                                  Desired Month To Upload Pictures
                                </p>
                              </label>
                            </Stack>
                          
                             <Stack>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div>
                                  <div>
                                    <DatePicker
                                      views={["year", "month"]}
                                      minDate={dayjs("2019-03-01")}
                                      maxDate={dayjs("2024-12-01")}
                                      value={startDate}
                                      onChange={(startDate) => {
                                        setStartDate(startDate);
                                        setDummy(true);
                                        console.log("valueb:----", startDate);
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          helperText={null}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              </LocalizationProvider>
                            </Stack>
                          </Col>
                        </Row>

                        <Row lg={12}>
                          <Col
                            lg={12}
                            style={{
                              marginTop: "55px",
                              display: "inline-block",
                            }}
                          >
                            <Stack>
                              <script src="https://cdn.lordicon.com/qjzruarw.js"></script>
                              <lord-icon
                                src="https://cdn.lordicon.com/xhcrhqyw.json"
                                trigger="morph"
                                colors="primary:#808080"
                                style={{ width: "110px", height: "110px" }}
                              ></lord-icon>
                            </Stack>

                            <Stack>
                              <button
                                style={{
                                  fontWeight: "bold",
                                  fontFamily: "Arial",
                                  cursor: "pointer",
                                  alignItems: "center",
                                  padding: "5px",
                                  justifyContent: "center",
                                  width: "170px",
                                  fontSize: "18px",
                                  border: "1px solid #1e3796",
                                  backgroundColor: "#1e3796",
                                  color: "whitesmoke",
                                  borderRadius: "5px",
                                }}
                                onClick={modalUp}
                              >
                                Browse Files
                              </button>
                            </Stack>
                            <Stack>
                              
                            </Stack>
                          </Col>
                        </Row>
                        <Row style={{ margin: "50px 50px" }}>
                          <Col
                            style={{
                              border: "1px solid #cccccc",
                              height: "120px",
                              width: "250px",
                              margin: "10px",
                              padding: "4vh",
                            }}
                          >
                            <p style={{ width: "200px" }}>
                              You can choose up to 20 photos at a time
                            </p>
                          </Col>
                          <Col
                            style={{
                              border: "1px solid #cccccc",
                              height: "120px",
                              width: "250px",
                              margin: "9px",
                              padding: "3vh",
                            }}
                          >
                            <p style={{ width: "200px" }}>
                              Use Ctrl/Cmd or Shift to Select Multiple images at
                              a time
                            </p>
                          </Col>
                          <Col
                            style={{
                              border: "1px solid #cccccc",
                              height: "120px",
                              width: "250px",
                              margin: "10px",
                              padding: "3vh",
                            }}
                          >
                            <p style={{ width: "200px" }}>
                              You can upload pictures that are .JPEG,.JPG or.PNG
                            </p>
                          </Col>
                        </Row>
                      </div>

                      <Row style={{ width: "auto" }}>
                        {showModal && (
                          <div>
                            <Modal
                              show={showModal}
                              size="lg"
                              aria-labelledby="example-modal-sizes-title-lg"
                            >
                              <Modal.Header closeButton>
                                 <h3 style={{fontFamily:"arial",color:"#1e3796"}}>Upload Images</h3>
                              </Modal.Header>
                              <Modal.Body>
                                {preview.length < 1 && (
                                  <Container
                                    style={{
                                      border: "3px dotted gray",
                                      borderRadius: "55%",
                                      width: "300px",
                                      height: "300px",
                                      backgroundColor: "#eaeae1",
                                    }}
                                  >
                                    {preview.length < 1 && (
                                      <Row>
                                        <div>
                                          <div
                                            style={{
                                              position: "absolute",
                                              top: "40%",
                                              left: "50%",
                                              transform:
                                                "translate(-50%, -50%)",
                                              textAlign: "center",
                                            }}
                                          >
                                            <center>
                                              <img
                                                src={require("../images/uploadicon.png")}
                                                style={{
                                                  width: "70px",
                                                  padding: "10px 0px",
                                                }}
                                                alt="..."
                                              ></img>
                                              <label htmlFor="imageUpload">
                                                <h5
                                                  style={{
                                                    textAlign: "center",
                                                    color: "#1e3796",
                                                    fontWeight: "bold",
                                                    fontFamily: "Arial",
                                                    cursor: "pointer",
                                                    padding: "5px",
                                                    width: "200px",
                                                  }}
                                                >
                                                  Choose Upto 20 Images to
                                                  upload
                                                </h5>
                                              </label>
                                            </center>
                                          </div>
                                        </div>
                                      </Row>
                                    )}

                                    <Row style={{ justifyContent: "center" }}>
                                      <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        name="image"
                                        onChange={onChange}
                                        hidden
                                        multiple
                                        style={{
                                          color: "#1e3796",
                                          fontWeight: "bold",
                                          fontFamily: "Arial",
                                          cursor: "pointer",
                                        }}
                                      ></input>
                                    </Row>
                                  </Container>
                                )}

                                <Container
                                  style={{ height: "auto", marginTop: "20px" }}
                                >
                                  <Row>
                                    {preview.length > 0 &&
                                      preview.map((itms, index) => {
                                        return (
                                          <>
                                            <Col md={3}>
                                              <div className="container">
                                                <img
                                                  style={{
                                                    width: "150px",
                                                    height: "100px",
                                                    margin: "10px",
                                                  }}
                                                  src={itms.url}
                                                  alt={"image-" + index}
                                                  key={index}
                                                />

                                                <div
                                                  style={{
                                                    position: "absolute",
                                                    top: "-1%",
                                                    right: "5%",
                                                    backgroundColor: "white",
                                                    zIndex: "1",
                                                    cursor: "pointer",
                                                    transform:
                                                      "translate(-50%,50%)",
                                                  }}
                                                >
                                                  <div>
                                                    <i
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        console.log(
                                                          "deleted file num",
                                                          index
                                                        );
                                                        const se =
                                                          preview.filter(
                                                            (itm, ind) =>
                                                              ind !== index
                                                          );
                                                        setPreview(se);
                                                        console.log(se);
                                                      }}
                                                      className="fa-solid fa-xmark"
                                                      style={{
                                                        color: "red",
                                                        border: "1px solid red",
                                                        padding: "1.8px",
                                                        borderRadius: "1.5px",
                                                      }}
                                                    ></i>
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                          </>
                                        );
                                      })}
                                  </Row>
                                </Container>

                                <Container>
                                  {preview.length < 20 && preview.length >= 1 && (
                                    <button
                                      style={{
                                        backgroundColor: "#1e3796",
                                        color: "whitesmoke",
                                        verticalAlign: "middle",
                                        borderRadius: "5px",
                                        marginLeft: "25px",
                                      }}
                                    >
                                      <input
                                        id="add"
                                        onChange={onChange1}
                                        type="file"
                                        name="image"
                                        accept="image/jpeg,image/png"
                                        multiple
                                        hidden
                                      />
                                      <label
                                        style={{
                                          fontFamily: "arial",
                                          fontSize: "18px",
                                          cursor: "pointer",
                                          margin: "5px",
                                        }}
                                        htmlFor="add"
                                      >
                                        Add more
                                      </label>
                                    </button>
                                  )}
                                </Container>

                                {preview.length > 20 ? (
                                  <Container style={{ marginTop: "10px" }}>
                                    <p
                                      style={{
                                        color: "red",
                                        fontFamily: "arial",
                                        margin: "15px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Note*: Upload only 20 photos
                                    </p>
                                  </Container>
                                ) : (
                                  ""
                                )}
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  style={{
                                    backgroundColor: "green",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    fontFamily: "Arial",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setShowModal(false);
                                    setPreview([]);
                                    setImageSelected([]);
                                    setImages1([]);
                                  }}
                                >
                                  Close
                                </Button>

                                {preview.length <= 20 && preview.length >= 1 && (
                                  <Button
                                    type="submit"
                                    disabled={!butto}
                                    className="button btn-primary btn"
                                    onClick={uploadImage}
                                    style={{
                                      backgroundColor: "green",
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      fontFamily: "Arial",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Upload
                                  </Button>
                                )}
                              </Modal.Footer>
                            </Modal>
                          </div>
                        )}
                      </Row>
                    </form>
                  </Container>
                </>
              )}
              {isUploaded && (
                <>
                  <div
                    style={{
                      height: "50vh",
                      verticalAlign: "center",
                      marginTop: "100px",
                      backgroundColor:"#fff",padding:"55px",width:"800px",boxShadow: "0px 0px 7px -1px #000000",
                      borderRadius:"10px"
                    }}
                  >
                 
                    <lord-icon
                      src="https://cdn.lordicon.com/hrqqslfe.json"
                      trigger="hover"
                      colors="primary:#109121,secondary:#ebe6ef"
                      style={{ width: "100px", height: "100px",marginTop:"35px" }}
                    ></lord-icon>
                    <br></br>

                    <h2
                      style={{
                        color: "green",
                        fontFamily: "arial",
                        textDecorationLine: "none",
                      }}
                    >
                      {fileRes}
                    </h2>
                    <h2 style={{ color: "green" }}>{showError}</h2>
                    <br />
                    <h4>
                      <a href="/upload2" style={{ fontFamily: "arial" }}>
                        <u>Click Here to Addmore</u>
                      </a>
                    </h4>
                    <br />
                    <h4>
                      <a
                        href="/home"
                        style={{ color: "brown", fontFamily: "arial" }}
                      >
                        <u> Go to Home</u>
                      </a>
                    </h4>
                  </div>
                </>
              )}

              {!isUploaded && (
                <div>
                  <>{showError}</>
                </div>
              )}
            </div>
          </div>
          <div >
          {isUploaded && showToastSucc && (
                      <Toast
                        onClose={() => {
                          setShowToastSucc(false);
                        }}
                        style={{marginTop:"200px"}}
                        show={showToastSucc}
                        className="d-block"
                        bg="success"
                        position="top-left"
                        delay={5000}
                        autohide
                      >
                        <Toast.Header>
                          <strong className="me-auto">Images upload</strong>
                          <small>just now</small>
                        </Toast.Header>
                        <Toast.Body>Images uploaded successfully</Toast.Body>
                      </Toast>
                    )}
          </div>
        </>
      )}
    </>
    
  );
}

export default Upload2;
