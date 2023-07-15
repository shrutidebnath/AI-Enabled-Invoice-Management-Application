import { memo } from "react";
import abcLogo from "../assets/abclogo.svg";
import hrcLogo from "../assets/hrclogo.svg";
import "../styles/Header.css";

function Header() {
  return (
    <div className="headerClass">
      <div className="imgContainer">
        <div className="firstImg">
          <img src={abcLogo} alt="" />
        </div>
        <div className="secondImg">
          <img src={hrcLogo} alt="" />
        </div>
        <div className="thirdHead"></div>
      </div>
      <h3>Invoice List</h3>
    </div>
  );
}

export default memo(Header);
