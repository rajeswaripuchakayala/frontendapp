import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Col, Container, Modal, Row, Stack, Toast } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import { Box } from "@mui/material";
import LoginForm from "../images/Login_3.jpg";
import TextField from "@mui/material/TextField";
import ProgressBar from "react-bootstrap/ProgressBar";


function Upload1() {
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
  const [showToastSucc,setShowToastSucc] = useState(false);
  const [addMore,setAddMore]=useState([]);
   const [images1,setImages1] =useState([]);

  const onChange1=(e)=>{
      setAddMore(e.target.files);
      const images=[];
      for (let i = 0; i < e.target.files.length; i++) {
          var obj={};
          obj["url"]=URL.createObjectURL(e.target.files[i]);
          obj["name"]=e.target.files[i].name;
         images.push(obj);
         setAddMore(images1);
      }
      setImageSelected(...imageSelected,...e.target.files);
      setImages1(images);
      console.log("first",images)

      setAddMore(images1);
      console.log("addmore images",e.target.files);
          console.log("images1 data of addmore",addMore);


  }


  const onChange = (h) => {
    setImageSelected(h.target.files);
     const images =[];
    for (let i = 0; i < h.target.files.length; i++) {
        var obj={};
        obj["url"]=URL.createObjectURL(h.target.files[i]);
        obj["name"]=h.target.files[i].name;
       images.push(obj);
       setPreview(images);
    }
    setPreview(images);
    console.log("images data",images);
    console.log("input fields ",imageSelected);
    //console.log("preview data",preview)
    setButto(true);
  };

  const modalUp = (e) => {
    e.preventDefault();
    setShowModal(true);
   
  };

  const uploadImage = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("previewData",preview)
   const imagions=[];


   //Deleting unwanted pics by comparing preview and selectedImage arrays
    for(let i = 0; i < imageSelected.length; i++){
    for(let j=0;j<preview.length;j++){
            if(imageSelected[i].name === preview[j].name){
                imagions.push(imageSelected[i]);
            }
    }
    }
console.log("imagions",imagions);
setImageSelected(imagions);
    //console.log("imagions data1-=-",imageSelected)
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

    Array.from(imagions).forEach((item) => {
      formData.append("Image", item);
    });
    const url = "https://highwayproject.herokuapp.com/upload";
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
          console.log(err.result)
          
        } else if (err.request) {
          setShowError(err.request);
          console.log(err.request)
          setLoading(false);
          
        }
      });

    setIsSelected(false);
  };


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
          <div className="container" style={{position:"absolute",display:"flex",left:"50%", justifyContent:"center", fontFamily:"Arial",transform:"translate(-50%,20%)"}}>
           
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                borderRadius: "7px",
                backgroundColor: "#fff",
              }}
            >
              {isSelected && (
                <>
                  <Container>
                    <form
                      style={{ padding: "0px", height: "auto",margin:"50px" }}
                    >
                      <div
                        style={{
                          padding: "15px",
                          margin:"5px",
                          backgroundColor: "#f1f1f1",
                          width:"400px",
                          height:"500px",
                        }}
                      >
                        <Row lg={12} style={{marginTop:"35px"}}>
                          <Col lg={12}>
                          <Stack
                              style={{
                                marginBottom: "20px",
                                
                              }}
                            >
                              <label
                                htmlFor="dates"
                                style={{
                                  color: "#1e3796",
                                  fontFamily: "Arial",
                                  alignItems: "center",
                                  fontSize: "20px",
                                  padding:"10px"
                                }}
                              >
                                <b
                                  style={{
                                    fontStyle: "arial",
                                    textAlign:"center"
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
                        </Row>
                       
                        <Row lg={12}>
                         
                          <Col
                            lg={12}
                            style={{ marginTop: "95px",display:"inline-block" }}
                          >
                            <Stack>
                              <button
                                style={{
                                  fontWeight: "bold",
                                  fontFamily: "Arial",
                                  cursor: "pointer",
                                  alignItems: "center",
                                  padding: "5px",
                                  justifyContent:"center",
                                  width:"220px",
                                  fontSize: "18px",
                                  border:"1px solid #1e3796",
                                  backgroundColor:"#1e3796",
                                  color:"whitesmoke",
                                  borderRadius:"5px"
                                }}
                                onClick={modalUp}
                              >
                               Click Here to Upload
                              </button>
                            </Stack>
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
                              <Modal.Header  style={{height:"50px"}} closeButton>
                                <Modal.Title id="contained-modal-title-vcenter" >
                                  <h4 style={{ textAlign: "center",fontFamily:"arial"}}>
                                    upload Images
                                  </h4>
                                
                                </Modal.Title>
                               
                              </Modal.Header>
                              <Modal.Body >
                          {preview.length<1 && <Container style={{border:"3px dotted gray",borderRadius:"55%",width:"300px",height:"300px",backgroundColor:"#eaeae1"}}>                                                                                      
                            {preview.length<1 &&
                                <Row >
                                <div>
                                    <div style={{position:"absolute",top:"40%",left:"50%", transform: "translate(-50%, -50%)",textAlign:"center"}}>
                                    <center>
                              <img
                                src={require("../images/uploadicon.png")}
                                style={{ width: "70px", padding: "10px 0px", }}
                                alt="..."
                              ></img>
                               <label htmlFor="imageUpload"><h5 style={{textAlign:"center", color: "#1e3796",
                                    fontWeight: "bold",
                                    fontFamily: "Arial",
                                    cursor: "pointer",
                                    padding: "5px",width:"200px"}}>Choose Upto 20 Images to upload</h5></label>
                            </center>
                          </div>
                          
                                </div>
                              </Row>
                            }

                              <Row style={{justifyContent:"center"}}>

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
                                      cursor: "pointer"
                                    }}
                                  ></input>                                                                  
                                  </Row>
                                 </Container>
                        }
                                  <Container style={{height:"auto",marginTop:"20px"}}>
                                    <Row>
                                    {preview.length > 0 ? (
                                      preview.map((itms, index) => {
                                        return (
                                        
                                           <>
                                              <Col md={3}>
                                                <div className="container">
                                                <img
                                                    style={{
                                                      width: "150px",
                                                      height: "100px",margin:"10px"
                                                    }}
                                                    src={itms.url}
                                                    alt={"image-" + index}
                                                    key={index}
                                                  />
                                               
                                                <div style={{position:"absolute",top:"-1%",right:"5%",backgroundColor:"white",zIndex:"1",cursor:"pointer",transform:"translate(-50%,50%)"}}>
                                                      <div>
                                                        <i onClick={(e) => {
                                                          e.preventDefault();
                                                          console.log(
                                                            "deleted file num",
                                                            index
                                                          );
                                                          const se = preview.filter(
                                                            (itm, ind) =>
                                                              ind !== index
                                                          );
                                                          setPreview(se);
                                                          console.log(se);
                                                        }}className="fa-solid fa-xmark" style={{color:"red",border:"1px solid red",padding:"1.8px",borderRadius:"1.5px"}}></i>
                                                     </div>
                                                </div>                                                                                               
                                                </div>                                  
                                              </Col>
                                              </>
                                        );
                                      })                                     
                                    ) : (
                                      <Col lg={12} style={{textAlign:"center",float:"right"}}>
                                       <h4 style={{fontFamily:"arial"}}>No Images selected</h4>
                                      </Col>
                                     
                                    )}
                                    </Row>
                                   


                                  </Container>
                                <Container>
                                    
                                {preview.length < 20 && preview.length>=1 && 
                                  <button style={{                                                                                                                                                 
                                  backgroundColor:"#1e3796",
                                  color:"whitesmoke",
                                  verticalAlign:"middle",
                                  borderRadius:"5px",
                                  marginLeft:"25px"}} >
                                    <input  id="add" onChange={onChange1} type="file" name="image" accept="image/jpeg,image/png" multiple hidden />
                                    <label style={{fontFamily:"arial",fontSize: "18px",cursor:"pointer", margin:"5px",}} htmlFor="add"  >Add more</label>
                                  </button>}
                                </Container>
                                               
                                 {preview.length>20 ?<Container style={{marginTop:"10px"}}><p style={{color:"red",fontFamily:"arial",margin:"15px",fontWeight:"bold"}}>Note*: Upload only 20 photos</p></Container>:''}
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
                                  }}
                                >
                                  Close
                                </Button>

                               {preview.length<=20 && preview.length>=1 &&<Button
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
                              }
                              </Modal.Footer>
                            </Modal>
                          </div>
                        )}
                      </Row>
                    </form>
                  </Container>
                </>
              )}


{isSelected &&   isUploaded && (
                <>
                  <Container>
                  {isUploaded && showToastSucc && (
                          <Toast onClose={()=>{setShowToastSucc(false)}} show={showToastSucc} className="d-block" bg="success" position="top-center" delay={4000} autohide>
                            <Toast.Header>
                              <strong className="me-auto">Images upload</strong>
                              <small>just now</small>
                            </Toast.Header>
                            <Toast.Body>Images uploaded successfully</Toast.Body>
                          </Toast>
                        )}
                    <form
                      style={{ padding: "0px", height: "auto",margin:"50px" }}
                    >
                      <div
                        style={{
                          padding: "15px",
                          margin:"5px",
                          backgroundColor: "#f1f1f1",
                          width:"400px",
                          height:"500px",
                        }}
                      >
                        <Row lg={12} style={{marginTop:"35px"}}>
                          <Col lg={12}>
                          <Stack
                              style={{
                                marginBottom: "20px",
                                
                              }}
                            >
                              <label
                                htmlFor="dates"
                                style={{
                                  color: "#1e3796",
                                  fontFamily: "Arial",
                                  alignItems: "center",
                                  fontSize: "20px",
                                  padding:"10px"
                                }}
                              >
                                <b
                                  style={{
                                    fontStyle: "arial",
                                    textAlign:"center"
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
                        </Row>
                       
                        <Row lg={12}>
                         
                          <Col
                            lg={12}
                            style={{ marginTop: "95px",display:"inline-block" }}
                          >
                            <Stack>
                              <button
                                style={{
                                  fontWeight: "bold",
                                  fontFamily: "Arial",
                                  cursor: "pointer",
                                  alignItems: "center",
                                  padding: "5px",
                                  justifyContent:"center",
                                  width:"220px",
                                  fontSize: "18px",
                                  border:"1px solid #1e3796",
                                  backgroundColor:"#1e3796",
                                  color:"whitesmoke",
                                  borderRadius:"5px"
                                }}
                                onClick={modalUp}
                              >
                               Click Here to Upload
                              </button>
                            </Stack>
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
                              <Modal.Header  style={{height:"50px"}} closeButton>
                                <Modal.Title id="contained-modal-title-vcenter" >
                                  <h4 style={{ textAlign: "center",fontFamily:"arial"}}>
                                    upload Images
                                  </h4>
                                
                                </Modal.Title>
                               
                              </Modal.Header>
                              <Modal.Body >
                          {preview.length<1 && <Container style={{border:"3px dotted gray",borderRadius:"55%",width:"300px",height:"300px",backgroundColor:"#eaeae1"}}>                                                                                      
                            {preview.length<1 &&
                                <Row >
                                <div>
                                    <div style={{position:"absolute",top:"40%",left:"50%", transform: "translate(-50%, -50%)",textAlign:"center"}}>
                                    <center>
                              <img
                                src={require("../images/uploadicon.png")}
                                style={{ width: "70px", padding: "10px 0px", }}
                                alt="..."
                              ></img>
                               <label htmlFor="imageUpload"><h5 style={{textAlign:"center", color: "#1e3796",
                                    fontWeight: "bold",
                                    fontFamily: "Arial",
                                    cursor: "pointer",
                                    padding: "5px",width:"200px"}}>Choose Upto 20 Images to upload</h5></label>
                            </center>
                          </div>
                          
                                </div>
                              </Row>
                            }

                              <Row style={{justifyContent:"center"}}>

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
                                      cursor: "pointer"
                                    }}
                                  ></input>                                                                  
                                  </Row>
                                 </Container>
                        }
                                  <Container style={{height:"auto",marginTop:"20px"}}>
                                    <Row>
                                    {preview.length > 0 ? (
                                      preview.map((itms, index) => {
                                        return (
                                        
                                           <>
                                              <Col md={3}>
                                                <div className="container">
                                                <img
                                                    style={{
                                                      width: "150px",
                                                      height: "100px",margin:"10px"
                                                    }}
                                                    src={itms.url}
                                                    alt={"image-" + index}
                                                    key={index}
                                                  />
                                               
                                                <div style={{position:"absolute",top:"-1%",right:"5%",backgroundColor:"white",zIndex:"1",cursor:"pointer",transform:"translate(-50%,50%)"}}>
                                                      <div>
                                                        <i onClick={(e) => {
                                                          e.preventDefault();
                                                          console.log(
                                                            "deleted file num",
                                                            index
                                                          );
                                                          const se = preview.filter(
                                                            (itm, ind) =>
                                                              ind !== index
                                                          );
                                                          setPreview(se);
                                                          console.log(se);
                                                        }}className="fa-solid fa-xmark" style={{color:"red",border:"1px solid red",padding:"1.8px",borderRadius:"1.5px"}}></i>
                                                     </div>
                                                </div>                                                                                               
                                                </div>                                  
                                              </Col>
                                              </>
                                        );
                                      })                                     
                                    ) : (
                                      <Col lg={12} style={{textAlign:"center",float:"right"}}>
                                       <h4 style={{fontFamily:"arial"}}>No Images selected</h4>
                                      </Col>
                                     
                                    )}
                                    </Row>
                                    <Row>
                                    {images1.length > 0 ? (
                                      images1.map((itms1, index1) => {
                                        return (
                                        
                                           <>
                                              <Col md={3}>
                                                <div className="container">
                                                <img
                                                    style={{
                                                      width: "150px",
                                                      height: "100px",margin:"10px"
                                                    }}
                                                    src={itms1.url}
                                                    alt={"image-" + index1}
                                                    key={index1}
                                                  />
                                               
                                                <div style={{position:"absolute",top:"-1%",right:"5%",backgroundColor:"white",zIndex:"1",cursor:"pointer",transform:"translate(-50%,50%)"}}>
                                                      <div>
                                                        <i onClick={(e) => {
                                                          e.preventDefault();
                                                          console.log(
                                                            "deleted file num",
                                                            index1
                                                          );
                                                          const se = preview.filter(
                                                            (itm, inds) =>
                                                              inds !== index1
                                                          );
                                                          images1(se);
                                                          console.log(se);
                                                        }}className="fa-solid fa-xmark" style={{color:"red",border:"1px solid red",padding:"1.8px",borderRadius:"1.5px"}}></i>
                                                     </div>
                                                </div>                                                                                               
                                                </div>                                  
                                              </Col>
                                              </>
                                        );
                                      })                                     
                                    ) : (
                                      <Col lg={12} style={{textAlign:"center",float:"right"}}>
                                       <h4 style={{fontFamily:"arial"}}>No Images selected</h4>
                                      </Col>
                                     
                                    )}
                                    </Row>


                                  </Container>
                                <Container>
                                    
                                {preview.length < 20 && preview.length>=1 && 
                                  <button style={{                                                                                                                                                 
                                  backgroundColor:"#1e3796",
                                  color:"whitesmoke",
                                  verticalAlign:"middle",
                                  borderRadius:"5px"}} >
                                    <input  id="add" onChange={onChange1} type="file" multiple hidden />
                                    <label style={{fontFamily:"arial",fontSize: "18px",cursor:"pointer", margin:"5px",}} htmlFor="add"  >Add more</label>
                                  </button>}
                                </Container>
                                               
                                 {preview.length>20 ?<Container style={{marginTop:"10px"}}><p style={{color:"red",fontFamily:"arial",margin:"15px",fontWeight:"bold"}}>Note*: Upload only 20 photos</p></Container>:''}
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
                                  }}
                                >
                                  Close
                                </Button>

                               {preview.length<=20 && preview.length>=1 &&<Button
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
                              }
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
       
                  <div style={{height:"50vh",verticalAlign:"center",marginTop:"50px"}} >
                 
                      {isUploaded && showToastSucc && (
                          <Toast onClose={()=>{setShowToastSucc(false)}} show={showToastSucc} className="d-block" bg="success" position="top-center" delay={4000} autohide>
                            <Toast.Header>
                              <strong className="me-auto">Images upload</strong>
                              <small>just now</small>
                            </Toast.Header>
                            <Toast.Body>Images uploaded successfully</Toast.Body>
                          </Toast>
                        )}
        
                    <lord-icon
                      src="https://cdn.lordicon.com/hrqqslfe.json"
                      trigger="hover"
                      colors="primary:#109121,secondary:#ebe6ef"
                      style={{ width: "100px", height: "100px" }}
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
                      <a href="/upload1" style={{ fontFamily: "arial" }}>
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

export default Upload1;
