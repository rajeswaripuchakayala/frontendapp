import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import { Box } from "@mui/material";
import LoginForm from "../images/Login_3.jpg";
import TextField from "@mui/material/TextField";
import ProgressBar from "react-bootstrap/ProgressBar";

function Upload() {
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
  const [imageselected, setImageSelected] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [butto, setButto] = useState(false);
  const [showError, setShowError] = useState("");
  const [fileRes, setFileRes] = useState("");
  const [loading, setLoading] = useState(false);
  const [dummy, setDummy] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const onChange = (e) => {
    setImageSelected(e.target.files);
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
      console.log(images);
      
    }
    console.log(imageselected);
    setButto(true);
  };

  const uploadImage = (e) => {
    e.preventDefault();
    setLoading(true);
    //setShowSpinner(true);

    const formData = new FormData();
    formData.append("Image", imageselected);
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

    Array.from(imageselected).forEach((item) => {
      formData.append("Image", item);
    });

    const url = "https://highwayproject.herokuapp.com/upload";
    axios
      .post(url, formData)
      .then((result) => {
        setFileRes(result.data);
        setIsUploaded(true);

        setLoading(false);
      })
      .catch((err) => {
        if (err.result) {
          setLoading(false);
        } else if (err.request) {
          setShowError(err.request);
          setLoading(false);
        }
      });

    setIsSelected(false);
  };
  console.log(imageselected);

  return (
    <>
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

      {/* uploadFile Starts */}

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

          <div className="container" style={{ marginTop: "150px" }}>
            <center>
              <h3
                style={{
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  color: "#1e3796",
                  paddingBottom: "15px",
                  textAlign: "left",
                }}
              >
                Upload Images
              </h3>
              {isSelected && loading && (
                <div>
                  <ProgressBar animated now={85} />
                </div>
              )}
            </center>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                borderRadius: "7px",
                backgroundColor: "#f1f1f1",
              }}
            >
              {isSelected && (
                <>
                  <Container>
                    <form style={{ padding: "0px", margin: "0px" }}>
                      <div
                        style={{
                          padding: "5px",
                        }}
                      >
                        <Row lg={12}>
                          <Col
                            sm={2}
                            lg={5}
                            style={{ marginTop: "60px", marginRight: "70px" }}
                          >
                            <Stack
                              style={{
                                marginBottom: "50px",
                                textAlign: "left",
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
                                <b
                                  style={{
                                    fontStyle: "arial",
                                  }}
                                >
                                  Select the month to upload
                                </b>
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
                          <center
                            style={{ borderRight: "1px solid gray" }}
                          ></center>
                          <Col
                            sm={2}
                            lg={5}
                            style={{ marginTop: "35px", paddingLeft: "50px" }}
                          >
                            <Stack style={{ marginBottom: "20px" }}>
                              <center>
                                <img
                                  src={require("../images/uploadicon.png")}
                                  style={{ width: "70px", padding: "10px 0px" }}
                                  alt="..."
                                ></img>
                              </center>
                            </Stack>
                            <Stack>
                              <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                name="image"
                                onChange={onChange}
                                multiple
                                style={{
                                  color: "#1e3796",
                                  fontWeight: "bold",
                                  fontFamily: "Arial",
                                  cursor: "pointer",
                                  alignItems: "center",
                                  padding: "35px",
                                  float: "left",
                                }}
                              ></input>
                            </Stack>
                          </Col>
                        </Row>
                      </div>
                     
                      <Row className="justify-content-md-center" style={{ textAlign: "center" }}>
                      <center>
                        <Col>
                       
                          {isSelected && (
                            <div
                              style={{
                                alignItems: "center",
                              }}
                            >
                              <button
                                type="submit"
                                disabled={!butto}
                                className="button btn-primary btn"
                                onClick={uploadImage}
                                style={{
                                  backgroundColor: "green",
                                  fontSize: "23px",
                                  fontWeight: "bold",
                                  padding: "10px",
                                  marginTop: "55px",
                                  alignItems:"center",
                                  width: "200px",
                                  fontFamily: "Arial",
                                  cursor: "pointer",
                                }}
                              >
                                Upload
                              </button>
                            </div>
                          )}
                     
                        </Col>
                        </center>
                      </Row>
                     
                    </form>
                  </Container>
                </>
              )}

              {!isUploaded && loading && (
                <div>
                  <ProgressBar animated="true" now={55} />
                </div>
              )}
              {isUploaded && (
                <>
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/hrqqslfe.json"
                      trigger="hover"
                      colors="primary:#109121,secondary:#ebe6ef"
                      style={{ width: "100px", height: "100px" }}
                    ></lord-icon>
                    <br></br>
                  </div>
                  <div>
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
                      <a href="/upload" style={{ fontFamily: "arial" }}>
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
        </>
      )}
    </>
  );
}

export default Upload;
