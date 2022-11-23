import React from "react";
import Body from "./Body";
import Carousels from "./Carousels";
import Footer from "./Footer";
import Header from "./Header";

function Main() {
  return (
    <div>
      <div>
        <Header />
        <Carousels/>
        <Body />
        <Footer />
      </div>
    </div>
  );
}

export default Main;
