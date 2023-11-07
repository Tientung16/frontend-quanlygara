import React from "react";
import Header from "../component/header";
import SideBar from "./sideBar";
import "./defaultLayout.css"
interface Props {
  children:any
}
const Defaultlayout = ({children}:Props) => {
  return(
    <div className="wrappers">
      <Header/>
      <div className="containers">
        <SideBar/>
        <div className="contents">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Defaultlayout;