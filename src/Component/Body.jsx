import React, { useState } from "react";
import PatternImg from '../images/pattern.jpg'
import './Carousel.css';
import carouselImage from "../images/CarouselImage.jpg"

import {
  Container,
  Image,
  Row,
  Col,
  Stack,
} from "react-bootstrap";

function Body(props) {
  // // const [photos, setPhotos] = useState("");
   const [showcontent, setShowContent] = useState(true);
 
  //  useEffect(() => {
  //    axios.get("https://actions-to-drive.herokuapp.com").then((res) => {
  //    setTimeout(() => {
  //     setPhotos(res.data);
  //     console.log(res);
  //    }, 1500);
    
  //   });
  // }, []);



  //styles for fonts

  const lineStyle1 = {
    fontSize: "16px",
    textAlign:"justify",
    fontFamily: "Arial",
    paddingRight:"20px"
  };
  return (
    <div>
      <style>
        {`
      .card-show:hover{
        color:red;
        background-color:gray;
      
      },
      body{
        font-family: Arial;
      }
      `}
      </style>

      {showcontent && (
        <>
        <div
          className="container"
          style={{
            marginBottom: "70px",
            marginTop: "70px",
            textAlign: "left",padding:"0"
          }}
        >
          <div>
            <Row style={{justifyContent:"center",}}>
              <Col lg={5}>
                <Image
                  className="d-block w-100"
                  style={{ marginTop: "0px" }}
                  src={require("../images/Carousel3.jpg")}
                  height="400"
                />
              </Col>
              <Col
                xlg={{ span: 3, offset: 1 }}
                style={{ marginLeft: "-5px"}}
              >
                <Stack style={{ paddingLeft: "5px" }}>
                  <div style={{ marginTop: "50px" }}>
                    <h2
                      style={{
                        color: "#1e3796",
                        paddingBottom: "5px",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                      }}
                    >
                      Project Name
                    </h2>
                    <hr style={{width:"300px",border:"1px solid #ccc"}}/>
                    <p style={lineStyle1}>
                      Construction of 4 lane Access Controlled New Greenfield
                      Highway Section of NH-365BG (Khammam-Devarapalle) of
                      length 42.119 km from Chintagudem village to Recherla
                      village (Design Chainage 63+117 to 105+236) under Inter
                      Corridor Route under Bharatmala Pariyojana on Hybrid
                      Annuity mode in the states of Telangana and Andhra
                      Pradesh. (Package-III)
                    </p>
                  </div>
                  <div style={{ marginTop: "45px" }}>
                    <h2
                      style={{
                        color: "#1e3796",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                      }}
                    >
                      Scope of Work
                    </h2>
                   <hr style={{width:"300px",border:"1px solid #ccc"}}></hr> 
                    <p style={lineStyle1}>
                      Construction of 4 lane Access controlled Green Filed
                      highway with depressed median which includes Culverts,
                      Bridges, Underpasses, Drains &amp; Other Misc. Works.
                    </p>
                  </div>
                </Stack>
              </Col>
            </Row>
          </div>
</div>
          <div style={{background:"white repeat fixed",
          
                      backgroundImage: `url(${carouselImage})`,
                      width:"100%",
                      height:"500px",
                      fontSize:"18px"}}>

                      </div>
<div className="container">


          {/* <Container
            style={{
              fontFamily: "Arial",
              textAlign: "center",
              backgroundColor: "#fff",
              padding: "20px 0px 20px 20px",
              marginBottom:"20px"
            }}
          >
            <Row style={{ display: "flex", marginBottom: "40px" }}>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <div>
                    <h3 style={{ fontWeight: "bold", padding: "5px 5px" }}>
                      Pavement Classification
                    </h3>
                  </div>
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/ippkhukl.json"
                      trigger="hover"
                      colors="primary:#01acf0,secondary:#1e3796"
                      style={{ width: "105px", height: "105px" }}
                    ></lord-icon>
                  </div>
                  <div>
                    <p style={{ fontSize: "20px", paddingTop: "20px 0px" }}>
                    Main Carriage way is Flexible and Toll Plaza is with Rigid Pavement
                    </p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <h3
                    style={{ fontWeight: "bold", padding: "5px 0px 0px 0px" }}
                  >
                    Concession Agreement
                  </h3>
                  <div></div>
                  <lord-icon
                    src="https://cdn.lordicon.com/qjuahhae.json"
                    trigger="hover"
                    colors="primary:#01acf0,secondary:#1e3796"
                    style={{ width: "110px", height: "110px" }}
                  ></lord-icon>
                  <div>
                    <p style={{ fontSize: "20px" }}>24-Feb-2022</p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <h3
                    style={{ fontWeight: "bold", padding: "5px 40px 0px 40px" }}
                  >
                    Construction Period
                  </h3>
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/kbtmbyzy.json"
                      trigger="hover"
                      colors="primary:#01acf0,secondary:#1e3796"
                      style={{ width: "110px", height: "110px" }}
                    ></lord-icon>
                  </div>
                  <div>
                    <p style={{ fontSize: "20px" }}>730 Days / 2 Years</p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <h3
                    style={{ fontWeight: "bold", padding: "5px 60px 0px 60px" }}
                  >
                    Appointed Date
                  </h3>
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/qjuahhae.json"
                      trigger="hover"
                      colors="primary:#01acf0,secondary:#1e3796"
                      style={{ width: "110px", height: "110px" }}
                    ></lord-icon>
                  </div>
                  <div>
                    <p style={{ fontSize: "20px" }}>27-Sep-2022</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row style={{ display: "flex",marginBottom: "40px" }}>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <div>
                    <h3 style={{ fontWeight: "bold", padding: "5px 5px" }}>Authority</h3>
                  </div>
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/dxjqoygy.json"
                      trigger="hover"
                      colors="primary:#01acf0,secondary:#1e3796"
                      style={{ width: "110px", height: "110px" }}
                    ></lord-icon>
                  </div>
                  <div>
                    <p
                      style={{ fontSize: "20px" }}
                    >
                      National Highways Authority of India (NHAI)
                    </p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <div>
                    <h3 style={{ fontWeight: "bold", padding: "5px 5px 0px 5px" }}>Concessionaire</h3>
                  </div>
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/eszyyflr.json"
                      trigger="hover"
                      colors="primary:#01acf0,secondary:#1e3796"
                      style={{ width: "110px", height: "110px" }}
                    ></lord-icon>
                  </div>
                  <div>
                    <p
                      style={{ fontSize: "20px" }}
                    >
                      KMVPL Khammam Devarapalli Highway Private Limited
                    </p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div style={{margin:"0px 60px"}}>
                  <div>
                    <h3 style={{ fontWeight: "bold",padding: "5px 0px 0px 0px" }}>Length in KM</h3>
                  </div>
                  <div style={{ verticalAlign: "center" }}>
                    <lord-icon
                      src="https://cdn.lordicon.com/cvpqeffe.json"
                      trigger="hover"
                      colors="primary:#01acf0,secondary:#1e3796"
                      style={{ width: "110px", height: "110px" }}
                    ></lord-icon>
                  </div>
                  <div>
                    <p style={{ fontSize: "20px" }}>42.119 Km's</p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <div>
                    <h3 style={{ fontWeight: "bold",padding: "5px 30px 0px 30px" }}>O&M Period</h3>
                  </div>
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/kbtmbyzy.json"
                      trigger="hover"
                      colors="primary:#01acf0,secondary:#1e3796"
                      style={{ width: "100px", height: "100px" }}
                    ></lord-icon>
                  </div>
                  <div>
                    <p style={{ fontSize: "20px" }}>15 years</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container><br></br><br></br><br></br><br></br> */}



          <Container
            style={{
              fontFamily: "Arial",
              textAlign: "center",
              backgroundColor: "#fff",
              padding: "20px 0px 20px 20px",
              marginBottom:"30px",
              marginTop: "60px"
            }}
          >
            <Row style={{ display: "flex", marginBottom: "40px" }}>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <div>
                    <h4 style={{ fontWeight: "bold", padding: "5px 5px" }}>
                      Pavement Classification
                    </h4>
                  </div>
                  <center>
                  <img src={require("../images/walking.png")}
                  style={{width:"80px", padding: "5px 0px"}}
                   alt="..." ></img></center>
                  <div>
                    <p style={{ fontSize: "18px", padding: "20px 0px" }}>
                    Main Carriage way is Flexible and Toll Plaza is with Rigid Pavement
                    </p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <h4
                    style={{ fontWeight: "bold", padding: "5px 40px 0px 0px" }}
                  >
                    Concession Agreement
                  </h4>
                 
                  <center>
                  <img src={require("../images/calender.png")}
                  style={{width:"70px", padding: "10px 0px"}} alt="..."
                  ></img></center>
                  <div>
                    <p style={{ fontSize: "18px", padding: "25px 0px" }}>24-Feb-2022</p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <h4
                    style={{ fontWeight: "bold", padding: "5px 40px 0px 40px" }}
                  >
                    Construction Period
                  </h4>
                  <center>
                  <img src={require("../images/time.png")}
                  style={{width:"70px", padding: "10px 0px"}} alt="..."
                  ></img></center>
                  <div>
                    <p style={{ fontSize: "18px", padding: "25px 0px" }}>730 Days / 2 Years</p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%", marginRight: "10px" }}>
                <div>
                  <h4
                    style={{ fontWeight: "bold", padding: "5px 60px 0px 60px" }}
                  >
                    Appointed Date
                  </h4>
                  <center>
                  <img src={require("../images/calender.png")}
                  style={{width:"70px",padding: "10px 0px"}} alt="..."
                  ></img></center>
                  <div>
                    <p style={{ fontSize: "18px", padding: "25px 0px"  }}>27-Sep-2022</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row style={{ display: "flex" }}>
              <Col style={{ flex: "2%" }}>
                <div>
                  <div>
                    <h4 style={{ fontWeight: "bold", padding: "5px 55px" }}>Authority</h4>
                  </div>
                  <center>
                  <img src={require("../images/client.png")}
                  style={{width:"75px", paddingBottom: "1px 0px"}} alt="..."
                  ></img></center>
                  <div>
                    <p
                      style={{ fontSize: "18px",padding: "6px 0px" }}
                    >
                      National Highways Authority of India (NHAI)
                    </p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%"}}>
                <div>
                  <div>
                    <h4 style={{ fontWeight: "bold", padding: "5px 55px" }}>Concessionaire</h4>
                  </div>
                  <center>
                  <img src={require("../images/person.png")}
                  style={{width:"75px", padding: "2px 0px"}} alt="..."
                  ></img></center>
                  <div>
                    <p
                      style={{ fontSize: "18px",padding: "16px 0px"  }}
                    >
                      KMVPL Khammam Devarapalli Highway Private Limited
                    </p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%" }}>
                <div >
                  <div>
                    <h4 style={{ fontWeight: "bold",padding: "5px 35px" }}>Length in KM</h4>
                  </div>
                  <center>
                  <img src={require("../images/length.png")}
                  style={{width:"75px", padding: "2px 0px"}} alt="..."
                  ></img></center>
                  <div>
                    <p style={{ fontSize: "18px", padding: "15px 80px" }}>42.119 Km's</p>
                  </div>
                </div>
              </Col>
              <Col style={{ flex: "2%", marginRight: "20px" }}>
                <div>
                  <div style={{width:"auto"}}>
                    <h4 style={{ fontWeight: "bold",padding: "5px 35px" }}>O&M Period</h4>
                  </div>
                  <center>
                  <img src={require("../images/time.png")}
                  style={{width:"75px", padding: "2px 0px"}} alt="..."
                  ></img></center>
                  <div>
                    <p style={{ fontSize: "18px",paddingTop:"10px" }}>15 years</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
         
        </div>
        </>
      )}
     
         
         <div className="container-fluid" style={{marginBottom:"20px",display:"-ms-flexbox"}}>
         <div style={{backgroundImage:`url(${PatternImg})`, height: "400px", marginTop: "50px"}}>
           <a href="/Gallery" style={{padding:"0",margin:"0"}}> <button className="btn primary" style={{position: "relative",top:"45%", left: "1%", alignItems: "center", justifyContent:"center", border:"none", color: "white", fontFamily:"Arial", backgroundColor: "#1e3796"}}>Project Photos</button></a>
          
           {/* <div className="container-fluid" style={{marginTop:"80px"}}>
           <div className="imgbox1"style={{width:"100%",padding:"10px"}} >
                <img style={{width: "200px",marginRight:"10px"}}
                    class="img"
                    
                    src={require("../images/footer1.png")}
                    alt="test"
                />
                <img style={{ width: "200px",marginRight:"10px"}}
                    class="img"
                    src={require("../images/footer2.png")}
                    alt="test"
                />
                <img style={{ width: "200px",marginRight:"10px"}}
                    class="img"
                    src={require("../images/footer3.png")}
                    alt="test"
                />
            </div>
           </div> */}
           
        </div>
         </div>
       
        <br/>  <br/>  
    </div>
  );
}

export default Body;
