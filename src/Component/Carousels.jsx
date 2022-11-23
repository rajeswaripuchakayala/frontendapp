import React from "react";


function Carousels() {
  return (
    <div>
      <div style={{position:"relative"}}>
      <img
            className="d-block w-100"
            src={require("../images/MainBanner.jpg")}
            alt="First slide"
          />
          <a href="/Gallery"  className="d-block w-100" style={{padding:"0px",margin:"0px"}}> <button  className="btn primary btn-inlineblock" style={{position: "absolute", top: "50%",left:"50%", alignItems: "center", justifyContent:"center", cursor: "pointer", border:"none", color: "white", fontFamily:"Arial", backgroundColor: "#1e3796",transform:"translate(-50%,50%)"}}>Project Photos</button></a>
      </div>
    </div>
    
  );
}

export default Carousels;
